-- CreateTable
CREATE TABLE "DogProfile" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "userId" STRING NOT NULL,
    "profilePic" STRING,
    "name" STRING NOT NULL,
    "sex" STRING NOT NULL,
    "age" INT4 NOT NULL,
    "bio" STRING(255) NOT NULL,
    "traitsId" STRING,
    "locationId" INT8 NOT NULL,

    CONSTRAINT "DogProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DogPreference" (
    "id" STRING NOT NULL,
    "lowerAgeLimit" INT4 NOT NULL,
    "upperAgeLimit" INT4 NOT NULL,
    "gender" STRING NOT NULL,
    "locationRadius" INT4 NOT NULL,
    "dogProfileId" INT8 NOT NULL,

    CONSTRAINT "DogPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follows" (
    "followedById" INT8 NOT NULL,
    "followingId" INT8 NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followingId","followedById")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "latitude" FLOAT8 NOT NULL,
    "longitude" FLOAT8 NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
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
    "dogProfileId" INT8,

    CONSTRAINT "Traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "promptId" INT8 NOT NULL,
    "image" STRING,
    "answer" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dogProfileId" INT8,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "prompt" STRING NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DogProfile_userId_key" ON "DogProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DogProfile_traitsId_key" ON "DogProfile"("traitsId");

-- CreateIndex
CREATE UNIQUE INDEX "DogProfile_locationId_key" ON "DogProfile"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "DogPreference_dogProfileId_key" ON "DogPreference"("dogProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Traits_dogProfileId_key" ON "Traits"("dogProfileId");

-- CreateIndex
CREATE INDEX "Post_dogProfileId_idx" ON "Post"("dogProfileId");

-- CreateIndex
CREATE INDEX "Post_promptId_idx" ON "Post"("promptId");
