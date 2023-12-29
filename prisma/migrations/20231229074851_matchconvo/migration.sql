-- DropIndex
DROP INDEX "Account_userId_idx";

-- CreateTable
CREATE TABLE "Match" (
    "id" STRING NOT NULL,
    "dog1Id" STRING NOT NULL,
    "dog2Id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchConversation" (
    "id" STRING NOT NULL,
    "matchId" STRING NOT NULL,
    "conversationId" STRING NOT NULL,

    CONSTRAINT "MatchConversation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_dog1Id_dog2Id_key" ON "Match"("dog1Id", "dog2Id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchConversation_matchId_key" ON "MatchConversation"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchConversation_conversationId_key" ON "MatchConversation"("conversationId");
