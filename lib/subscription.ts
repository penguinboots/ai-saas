import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();
  
  // check for id
  if (!userId) {
    return false;
  }

  // check for sub
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });
  if (!userSubscription) {
    return false;
  }

  // check for unexpired, with one day grace period
  const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
