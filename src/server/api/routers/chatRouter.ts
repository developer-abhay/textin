import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { creatChatInput } from "@/schemas/chatSchema";

export const chatRouter = createTRPCRouter({
  // Get all active chats of the user by UserId
  getActiveChatsbyUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input

      // Get all active chats of the user
      const userActiveChats = await ctx.db.chat.findMany({
        where: { participants: { some: { id: userId } } },
        select: {
          id: true,
          participants: true,
          isGroup: true,
          groupName: true,
          groupAvatar: true,
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });



      return userActiveChats.map((chat) => {
        // if group return group details
        if (chat.isGroup) {
          return {
            chatId: chat.id,
            name: chat.groupName,
            avatar: chat.groupAvatar,
            lastMessage: chat.messages[0]?.content,
          };
        }
        // else return other user details
        const otherUser = chat.participants.find(
          (participant) => participant.id !== userId,
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
      const { chatId } = input;

      return await ctx.db.message.findMany({
        where: { chatId },
        orderBy: { createdAt: "desc" },
        take: 100,
        select: {
          senderId: true,
          content: true,
          createdAt: true,
        },
      });
    }),

  // Create A Chat
  createChat: protectedProcedure
    .input(creatChatInput).mutation(async ({ ctx, input }) => {
      const { participants, isGroup, adminId, groupAvatar, groupName } = input

      // Checking if all Users exist
      const users = await ctx.db.user.findMany({
        where: {
          id: { in: participants },
        },
      });

      if (users.length !== participants.length) {
        throw new Error("Some participants do not exist.");
      }

      let chat;
      // if Group 
      if (isGroup) {
        chat = await ctx.db.chat.create({
          data: {
            participants: { connect: participants.map((id) => ({ id })) },
            isGroup,
            adminId,
            groupName,
            groupAvatar,
          }
        })
      } else {
        // if One on One Chat
        chat = await ctx.db.chat.create({
          data: {
            participants: { connect: input.participants.map((id) => ({ id })) },
          }
        })
      }
      return { message: 'Chat Created Successfully', chatId: chat.id }
    }),

  // Add user to group
  addToGroup: protectedProcedure.input(z.object({ groupId: z.string(), memberId: z.string() })).mutation(async ({ ctx, input }) => {
    const { memberId, groupId } = input
    const userId = ctx.session.user.id;

    const chat = await ctx.db.chat.findUnique({
      where: {
        id: groupId
      },
      include: { participants: true },
    })

    // Checking if chat exists
    if (!chat) {
      throw new Error("Chat not found.");
    }

    // Check if chat type is a group
    if (!chat.isGroup) {
      throw new Error("Invalid Request. This is not a group");
    }

    // verifying the admin
    if (chat.adminId !== userId) {
      throw new Error("You must be the admin to modify the add.");
    }

    // Checking if group is full
    if (chat.participants.length >= 100) {
      throw new Error("This group already has the maximum number of participants (100).");
    }

    // Checking if user already a member of the group
    if (chat.participants.some((participant) => participant.id === memberId)) {
      throw new Error("User is already a member of this group.");
    }

    // Adding member to the group
    await ctx.db.chat.update({
      where: {
        id: groupId
      },
      data: {
        participants: {
          connect: { id: memberId }
        }
      }
    })

    return { message: "User added successfully" }

  }),

  // Remove user from group
  removeFromGroup: protectedProcedure.input(z.object({ groupId: z.string(), memberId: z.string() })).mutation(async ({ ctx, input }) => {
    const { memberId, groupId } = input
    const userId = ctx.session.user.id;


    const chat = await ctx.db.chat.findUnique({
      where: {
        id: groupId
      },
      include: { participants: true },
    })

    // Checking if chat exists
    if (!chat) {
      throw new Error("Chat not found.");
    }

    // Check if chat type is a group
    if (!chat.isGroup) {
      throw new Error("Invalid Request. This is not a group");
    }

    // verifying the admin
    if (chat.adminId !== userId) {
      throw new Error("You must be the admin to modify the add.");
    }

    // Checking if user not a member of the group
    const isMember = chat.participants.some((participant) => participant.id === memberId)
    if (!isMember) {
      throw new Error("User is not a member of this group.");
    }

    // Remving member from the group
    await ctx.db.chat.update({
      where: {
        id: groupId
      },
      data: {
        participants: {
          disconnect: { id: memberId }
        }
      }
    })
    return { message: "User Removed successfully" }

  }),

  // Leave user from group
  leaveGroup: protectedProcedure.input(z.object({ groupId: z.string(), memberId: z.string() })).mutation(async ({ ctx, input }) => {
    const { memberId, groupId } = input
    const userId = ctx.session.user.id;


    const chat = await ctx.db.chat.findUnique({
      where: {
        id: groupId
      },
      include: { participants: true },
    })

    // Checking if chat exists
    if (!chat) {
      throw new Error("Chat not found.");
    }

    // Check if chat type is a group
    if (!chat.isGroup) {
      throw new Error("Invalid Request. This is not a group");
    }

    // verifying the admin
    if (chat.adminId == userId) {
      throw new Error("Admin can't leave the group.");
    }

    // Checking if user not a member of the group
    const isMember = chat.participants.some((participant) => participant.id === memberId)
    if (!isMember) {
      throw new Error("User is not a member of this group.");
    }

    // Leave group
    await ctx.db.chat.update({
      where: {
        id: groupId
      },
      data: {
        participants: {
          disconnect: { id: memberId }
        }
      }
    })
    return { message: "Group left successfully" }

  })
});
