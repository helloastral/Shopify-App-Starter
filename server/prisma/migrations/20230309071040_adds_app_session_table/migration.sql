-- CreateTable
CREATE TABLE "AppSession" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "AppSession_pkey" PRIMARY KEY ("id")
);
