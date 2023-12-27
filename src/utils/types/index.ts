import type { Conversation, DogProfile, Message } from "@prisma/client";

export type FullMessageType = Message & {
  sender: DogProfile,
  seenBy: DogProfile[],
};

export type FullConversationType = Conversation & {
  users: DogProfile[],
  messages: FullMessageType[],
};

