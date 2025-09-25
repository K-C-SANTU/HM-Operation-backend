import type { UserWithSubscription } from "@HM/users/interface/user.types";

declare global {
    namespace Express {
        interface Request {
            user?: UserWithSubscription;
        }
    }
}
