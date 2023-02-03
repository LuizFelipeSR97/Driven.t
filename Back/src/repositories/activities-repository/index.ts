import { prisma } from "@/config";

async function findAllLocations() {
  const locations = await prisma.activityLocation.findMany();
  return locations;
}

async function getActivities() {
  const locations = await prisma.activity.findMany();
  return locations;
}

async function getActivityById(activityId: number) {
  const activity = await prisma.activity.findFirst({
    where: {
      id: activityId
    }
  });
  return activity;
}

async function getUserSubscriptions(userId: number) {
  const subscriptions = await prisma.activitySubscription.findMany({
    where: {
      userId: userId
    }
  });
  return subscriptions;
}

async function getUserSubscriptionsWithActivities(userId: number) {
  const subscriptionsActivities = await prisma.activitySubscription.findMany({
    where: {
      userId: userId,
      isSubscribed: true
    },
    include: {
      Activity: true
    }
  });
  return subscriptionsActivities;
}

async function getUserSubscriptionById(userId: number, activityId: number) {
  const subscriptions = await prisma.activitySubscription.findFirst({
    where: {
      userId: userId,
      activityId: activityId
    }
  });
  return subscriptions;
}

async function createNewActivity(name: string, capacity: number, activityLocationId: number, startTime: Date, endTime: Date) {
  const activity = await prisma.activity.create({
    data: {
      name,
      capacity,
      startTime,
      endTime,
      activityLocationId,
      remainingVacancies: capacity
    }
  });
  return activity;
}

async function updateActivityAfterSub(activityId: number) {
  const activity = await prisma.activity.update({
    where: {
      id: activityId
    },
    data: {
      remainingVacancies: {
        decrement: 1
      }
    }
  });

  return activity;
}

async function createSubUpdateActivity(userId: number, activityId: number) {
  const transaction = await prisma.$transaction([
    prisma.activitySubscription.create({
      data: {
        userId,
        activityId,
        isSubscribed: true
      }
    }),
    prisma.activity.update({
      where: {
        id: activityId
      },
      data: {
        remainingVacancies: {
          decrement: 1
        }
      }
    })
  ]);

  return transaction;
}

async function updateSubUpdateActivity(subscriptionId: number, activityId: number, status: boolean) {
  if(status !== false) {
    const transaction = await prisma.$transaction([
      prisma.activitySubscription.update({
        where: {
          id: subscriptionId
        },
        data: {
          isSubscribed: status
        }
      }),
      prisma.activity.update({
        where: {
          id: activityId
        },
        data: {
          remainingVacancies: {
            decrement: 1
          }
        }
      })
    ]);
    return transaction;
  }
  const transaction = await prisma.$transaction([
    prisma.activitySubscription.update({
      where: {
        id: subscriptionId
      },
      data: {
        isSubscribed: status
      }
    }),
    prisma.activity.update({
      where: {
        id: activityId
      },
      data: {
        remainingVacancies: {
          increment: 1
        }
      }
    })
  ]);

  return transaction;
}

async function getActivityByTimeAndLocation(startTime: Date, endTime: Date, activityLocationId: number) {
  const activity = await prisma.activity.findFirst({
    where: {
      activityLocationId,
      OR: [
        {
          startTime: { gt: startTime, lt: endTime },
          endTime: { gte: startTime }
        },
        {
          startTime: { lte: startTime },
          endTime: { gte: endTime }
        },
        {
          startTime: { lt: endTime },
          endTime: { gt: startTime, lt: endTime }
        },
        {
          startTime: { gt: startTime },
          endTime: { lt: endTime }
        }
      ]
    }
  });

  return activity;
}

async function deleteActivity(id: number) {
  console.log(id);

  const activity = await prisma.activity.delete({
    where: {
      id
    }
  });
  return activity;
}

const activitiesRepository = {
  findAllLocations,
  getActivities,
  getActivityById,
  updateActivityAfterSub,
  getUserSubscriptionsWithActivities,
  createSubUpdateActivity,
  updateSubUpdateActivity,
  getUserSubscriptions,
  getUserSubscriptionById,
  createNewActivity,
  getActivityByTimeAndLocation,
  deleteActivity
};

export default activitiesRepository;
