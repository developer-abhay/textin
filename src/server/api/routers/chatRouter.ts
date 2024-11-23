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
                        }, take: 1
                    },
                },
            });
            return userActiveChats.map((chat) => {
                const otherUser = chat.participants.find((participant) => participant.id !== input.userId)
                return {
                    chatId: chat.id,
                    name: otherUser?.name,
                    avatar: otherUser?.avatar,
                    lastMessage: chat.messages[0]?.content
                }
            })
        }),
    // Get All chat messages by chatId
    getChatById: protectedProcedure
        .input(z.object({ chatId: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.chat.findUnique({
                where: { id: input.chatId },
                select: {
                    messages: {
                        orderBy: { createdAt: 'desc' },
                        take: 100
                    }
                },
            });
        }),
});


// export const postRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: protectedProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//           createdBy: { connect: { id: ctx.session.user.id } },
//         },
//       });
//     }),

//   getLatest: protectedProcedure.query(async ({ ctx }) => {
//     const post = await ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     });

//     return post ?? null;
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
