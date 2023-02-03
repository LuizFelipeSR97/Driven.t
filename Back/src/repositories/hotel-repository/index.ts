import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany({
    include: {
      Rooms: {
        include: {
          Booking: true
        }
      }
    }

  });
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: {
        include: {
          Booking: true
        }
      },
    }
  });
}

async function quantityRooms() {
  return await prisma.room.groupBy({
    by: ["hotelId", "name"],
    _sum: {
      capacity: true,
    },
  });
}

async function searchRooms(hotelId: number) {
  return await prisma.room.findMany({
    where: {
      hotelId,
    },
    include: {
      Hotel: true,
      Booking: true
    }
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  quantityRooms,
  searchRooms
};

export default hotelRepository;
