-- CreateTable
CREATE TABLE "Draft" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "prompt" TEXT,

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);
