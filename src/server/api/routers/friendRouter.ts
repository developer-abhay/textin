import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    // Get All friends of a User
    getAllFriends: protectedProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            const friends = await ctx.db.friends.findMany({
                where: {
                    OR: [
                        { userId1: input.userId },
                        { userId2: input.userId },
                    ]
                },
                select: {
                    user1: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                        },
                    },
                    user2: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                        },
                    },
                },
            });

            const allFriendsOfUser = friends.map((users) => users.user1.id == input.userId ? users.user2 : users.user1)

            return allFriendsOfUser;
        }),
});
