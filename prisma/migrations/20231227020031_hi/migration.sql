-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT4,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "email" STRING,
    "emailVerified" TIMESTAMP(3),
    "image" STRING,
    "hashedPassword" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" STRING NOT NULL,
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" STRING,
    "isGroup" BOOL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" STRING NOT NULL,
    "body" STRING,
    "image" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversationId" STRING NOT NULL,
    "senderId" STRING NOT NULL,
    "seenIds" STRING[],

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DogProfile" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "profilePic" STRING,
    "name" STRING NOT NULL,
    "sex" STRING NOT NULL,
    "age" INT4 NOT NULL,
    "bio" STRING(255) NOT NULL,
    "traitsId" STRING,
    "city" STRING,

    CONSTRAINT "DogProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DogPreference" (
    "id" STRING NOT NULL,
    "lowerAgeLimit" INT4 NOT NULL,
    "upperAgeLimit" INT4 NOT NULL,
    "gender" STRING NOT NULL,
    "dogProfileId" STRING NOT NULL,

    CONSTRAINT "DogPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Traits" (
    "id" STRING NOT NULL,
    "species" STRING,
    "size" STRING,
    "weight" FLOAT8,
    "children" STRING,
    "neutered" STRING,
    "energyLevel" INT4,
    "dogProfileId" STRING,

    CONSTRAINT "Traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "promptId" STRING NOT NULL,
    "image" STRING,
    "answer" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dogProfileId" STRING,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" STRING NOT NULL,
    "prompt" STRING NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserConversations" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_SeenMessages" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "DogProfile_userId_key" ON "DogProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DogProfile_traitsId_key" ON "DogProfile"("traitsId");

-- CreateIndex
CREATE UNIQUE INDEX "DogPreference_dogProfileId_key" ON "DogPreference"("dogProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Traits_dogProfileId_key" ON "Traits"("dogProfileId");

-- CreateIndex
CREATE INDEX "Post_dogProfileId_idx" ON "Post"("dogProfileId");

-- CreateIndex
CREATE INDEX "Post_promptId_idx" ON "Post"("promptId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserConversations_AB_unique" ON "_UserConversations"("A", "B");

-- CreateIndex
CREATE INDEX "_UserConversations_B_index" ON "_UserConversations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SeenMessages_AB_unique" ON "_SeenMessages"("A", "B");

-- CreateIndex
CREATE INDEX "_SeenMessages_B_index" ON "_SeenMessages"("B");
