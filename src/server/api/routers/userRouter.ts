import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        select: { name: true, email: true, avatar: true, createdAt: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    }),
});
