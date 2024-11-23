import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const requestRouter = createTRPCRouter({
  // Get all received requests of a user
  getAllRequestsByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const allRequests = await ctx.db.requests.findMany({
        where: {
          receiverId: input.userId,
          status: "PENDING",
        },
        select: {
          id: true,
          status: true,
          receiver: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      });
      return allRequests;
    }),

  // Send request
  sendRequest: protectedProcedure
    .input(z.object({ senderId: z.string(), receiverId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const request = await ctx.db.requests.create({
        data: {
          senderId: input.senderId,
          receiverId: input.receiverId,
        },
      });

      return { message: "Request Sent Successfully", requestId: request.id };
    }),

  // Cancel sent request
  cancelRequest: protectedProcedure
    .input(z.object({ requestId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.requests.delete({
        where: {
          id: input.requestId,
        },
      });

      return { message: "Request Cancelled Successfully" };
    }),

  // Accept or Reject a received Request
  updateRequest: protectedProcedure
    .input(z.object({ requestId: z.string(), accepted: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const status = input.accepted ? "ACCEPTED" : "REJECTED";
      const request = await ctx.db.requests.update({
        where: {
          id: input.requestId,
        },
        data: {
          status,
        },
      });
      const response = {
        message: `Request ${status} Successfully`,
        requestId: request.id,
      };

      return response;
    }),
});
