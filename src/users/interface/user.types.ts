import type { HMUserSubscription, User } from "@prisma/client";

export type UserWithSubscription = User & {
    hmUsersSubscription?: HMUserSubscription | null;
};
