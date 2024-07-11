-- CreateTable
CREATE TABLE "searchPlayers" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL DEFAULT 'riot',
    "riotId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "searchPlayers_pkey" PRIMARY KEY ("id")
);
