import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const friendRouter = createTRPCRouter({
  // Get All friends of a User
  getAllFriends: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const friends = await ctx.db.friends.findMany({
        where: {
          OR: [{ userId1: input.userId }, { userId2: input.userId }],
        },
        include: {
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

      const allFriendsOfUser = friends.map((users) =>
        users.user1.id == input.userId ? users.user2 : users.user1,
      );

      return allFriendsOfUser;
    }),
  // Get All Non friend Users (This approach is bad as the friends are being fetched twice,
  // once in getAllFriends and once in getNonFriends , have to make it better)
  getNonFriends: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Getting friends
      const friendships = await ctx.db.friends.findMany({
        where: {
          OR: [{ userId1: input.userId }, { userId2: input.userId }],
        },
        select: {
          userId1: true,
          userId2: true,
        },
      });

      //   Extracting friends Ids
      const friendIds = friendships.map((friendship) => {
        return friendship.userId1 === input.userId
          ? friendship.userId2
          : friendship.userId1;
      });

      // Getting Non Friends
      const nonFriends = await ctx.db.user.findMany({
        where: {
          id: { notIn: friendIds },
        },
        take: 50,
      });

      return nonFriends;
    }),
});
