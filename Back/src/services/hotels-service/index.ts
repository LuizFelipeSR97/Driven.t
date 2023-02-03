import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import roomRepository from "@/repositories/room-repository";
import { Booking, Hotel, Room } from "@prisma/client";
import bookingRepository from "@/repositories/booking-repository";

async function listHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" ) {
    throw cannotListHotelsError();
  }
  if( ticket.status === "PAID" && (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)) {
    throw notFoundError();
  }
}

async function getHotels(userId: number) {
  await listHotels(userId);

  const hotels: Hotel[] = await hotelRepository.findHotels();

  const resultHotelPromises = hotels.map(
    async function(hotel: { id?: number; name?: string; image?: string; createdAt?: Date ; updatedAt?: Date }) {
      const { id, name, image, createdAt, updatedAt } = hotel;
      
      let avaliables = 0;
      const accommodation: string[] = [];
      const rooms = await roomRepository.findAllByHotelId(id);
      if (rooms) {
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i].hotelId === hotel?.id) {
            avaliables = avaliables + Number(rooms[i].capacity);
            if( rooms[i].capacity === 1 && accommodation.indexOf("Single")< 0) {
              accommodation.push("Single");
            }
            if( rooms[i].capacity === 2 && accommodation.indexOf("Double")< 0) {
              accommodation.push("Double");
            }
            if( rooms[i].capacity >= 3 && accommodation.indexOf("Triple")< 0) {
              accommodation.push("Triple");
            }
          }
        }
      }
      return { id, name, image, accommodation, avaliables, createdAt, updatedAt };
    }
  );
  const resultHotel = await Promise.all(resultHotelPromises);
  return resultHotel;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await listHotels(userId);

  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  const rooms: Room[] = await hotelRepository.searchRooms(hotelId);
  if(!rooms ) {
    throw notFoundError();
  }
  return { ... hotel, Rooms: rooms };
}

const hotelService = {
  getHotels,
  getHotelsWithRooms,
};

export default hotelService;
