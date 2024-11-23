import { z } from "zod";
// Zod validation for creating a chat
export const creatChatInput = z
  .object({
    participants: z.array(z.string()),
    isGroup: z.boolean(),
    groupName: z.string().optional(),
    groupAvatar: z.string().optional(),
    adminId: z.string(),
  })
  .superRefine((data, ctx) => {
    const { participants, isGroup, groupName, groupAvatar, adminId } = data;

    // If One on One Chat , only 2 members
    if (!isGroup && participants.length !== 2) {
      ctx.addIssue({
        path: ["participants"],
        code: "custom",
        message: "A non-group chat must have exactly 2 participants.",
      });
      return false;
    }

    // If One on One Chat, No Custom avatar allowed
    if (!isGroup && (groupAvatar || groupName || adminId)) {
      ctx.addIssue({
        path: ["groupAvatar", "groupName", "adminId"],
        code: "custom",
        message: "A non-group chat cannot have an Admin, Avatar or Name.",
      });
      return false;
    }

    // If Group chat , Group name required
    if (isGroup && (!groupName || !adminId)) {
      ctx.addIssue({
        path: ["groupAvatar", "groupName", "adminId"],
        code: "custom",
        message: "A group chat requires have an Admin and a Name.",
      });
      return false;
    }

    // If Group chat , Max participants are 100
    if (isGroup && participants.length > 100) {
      ctx.addIssue({
        path: ["participants"],
        code: "custom",
        message: "A group chat can have a maximum of 100 participants.",
      });
      return false;
    }
    return true;
  });
