import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    })};

  let ticketTypes = await prisma.ticketType.findFirst();
  if (!ticketTypes) {
    await prisma.ticketType.create({
      data: {
        name: 'Online',
        price: 10000,
        isRemote: true,
        includesHotel: false
      },
    });
    await prisma.ticketType.create({
      data: {
        name: 'Presencial + Sem Hotel',
        price: 25000,
        isRemote: false,
        includesHotel: false
      },
    });
    await prisma.ticketType.create({
      data: {
        name: 'Presencial + Com Hotel',
        price: 60000,
        isRemote: false,
        includesHotel: true
      },
    });
  };

  let hotel = await prisma.hotel.findFirst();
   if(!hotel){
     await prisma.hotel.createMany({
      data:[
        {
         id:1,  
         name: 'Driven Resort',
         image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_871,h_581/https://blog.hotelpontaverde.com.br/wp-content/uploads/2019/09/Resort-ou-Hotel-Hotel-Ponta-Verde-France%CC%82s.png',
        },
        { 
          id:2,
          name: 'Driven Palace',
          image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_871,h_581/https://blog.hotelpontaverde.com.br/wp-content/uploads/2019/09/Resort-ou-Hotel-Hotel-Ponta-Verde-France%CC%82s.png',
         },
         { 
          id:3,
          name: 'Driven World',
          image: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_871,h_581/https://blog.hotelpontaverde.com.br/wp-content/uploads/2019/09/Resort-ou-Hotel-Hotel-Ponta-Verde-France%CC%82s.png',
         },]
    });
  }

  let roomsInHotel = await prisma.room.findFirst();
  if(!roomsInHotel){
     await prisma.room.createMany({
      data : [
        {  name: '101', capacity: 1, hotelId: 1 },
        {  name: '102', capacity: 2, hotelId: 1 },
        {  name: '103', capacity: 3, hotelId: 1 },
        {  name: '201', capacity: 1, hotelId: 1 },
        {  name: '202', capacity: 2, hotelId: 1 },
        {  name: '203', capacity: 3, hotelId: 1 },
        {  name: '101', capacity: 1, hotelId: 2 },
        {  name: '102', capacity: 2, hotelId: 2 },
        {  name: '103', capacity: 3, hotelId: 2 },
        {  name: '201', capacity: 1, hotelId: 2 },
        {  name: '202', capacity: 2, hotelId: 2 },
        {  name: '203', capacity: 3, hotelId: 2 },
        {  name: '101', capacity: 1, hotelId: 3 },
        {  name: '102', capacity: 2, hotelId: 3 },
        {  name: '103', capacity: 3, hotelId: 3 },
        {  name: '201', capacity: 1, hotelId: 3 },
        {  name: '202', capacity: 2, hotelId: 3 },
        {  name: '203', capacity: 3, hotelId: 3 },
        {  name: '301', capacity: 1, hotelId: 3 },
        {  name: '302', capacity: 2, hotelId: 3 },
        {  name: '303', capacity: 3, hotelId: 3 },
      ]
    });
  }

  let activityLocation = await prisma.activityLocation.findFirst();
  if (!activityLocation) {
    await prisma.activityLocation.createMany({
      data: [{
        name: 'Auditório Principal'
      },{
        name: 'Auditório Lateral'
      },{
        name: 'Sala de Workshop'
      }]
    })};

  let activity = await prisma.activity.findFirst();
  if (!activity) {
    await prisma.activity.createMany({
      data: [{
        name: 'Minecraft: montando o PC ideal',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 1,
        startTime: dayjs('2022-10-22 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-22 10:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'LoL: montando o PC ideal',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 1,
        startTime: dayjs('2022-10-22 10:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-22 11:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra x',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 2,
        startTime: dayjs('2022-10-22 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-22 11:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra y',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 3,
        startTime: dayjs('2022-10-22 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-22 10:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra z',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 3,
        startTime: dayjs('2022-10-22 10:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-22 11:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Minecraft: montando o PC ideal',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 1,
        startTime: dayjs('2022-10-23 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-23 10:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'LoL: montando o PC ideal',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 1,
        startTime: dayjs('2022-10-23 10:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-23 11:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra x',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 2,
        startTime: dayjs('2022-10-23 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-23 11:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra y',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 3,
        startTime: dayjs('2022-10-23 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-23 10:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra z',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 3,
        startTime: dayjs('2022-10-23 10:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-23 11:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Minecraft: montando o PC ideal',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 1,
        startTime: dayjs('2022-10-24 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-24 10:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'LoL: montando o PC ideal',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 1,
        startTime: dayjs('2022-10-24 10:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-24 11:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra x',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 2,
        startTime: dayjs('2022-10-24 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-24 11:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra y',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 3,
        startTime: dayjs('2022-10-24 09:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-24 10:00:00.000').add(-3, 'h').toDate()
      },{
        name: 'Palestra z',
        capacity: 30,
        remainingVacancies: 30,
        activityLocationId: 3,
        startTime: dayjs('2022-10-24 10:00:00.000').add(-3, 'h').toDate(),
        endTime: dayjs('2022-10-24 11:00:00.000').add(-3, 'h').toDate()
      }]
    })};
    
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });