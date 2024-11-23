import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const chatRouter = createTRPCRouter({
  // Get all active chats of the user by UserId
  getActiveChatsbyUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userActiveChats = await ctx.db.chat.findMany({
        where: { participants: { some: { id: input.userId } } },
        select: {
          id: true,
          participants: true,
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });
      return userActiveChats.map((chat) => {
        const otherUser = chat.participants.find(
          (participant) => participant.id !== input.userId,
        );
        return {
          chatId: chat.id,
          name: otherUser?.name,
          avatar: otherUser?.avatar,
          lastMessage: chat.messages[0]?.content,
        };
      });
    }),
  // Get All chat messages by chatId
  getChatMessagesByChatId: protectedProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.message.findMany({
        where: { chatId: input.chatId },
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
          senderId: true,
          content: true,
          createdAt: true,
        },
      });
    }),
});
