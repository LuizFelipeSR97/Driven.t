-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Activity_date_idx" ON "Activity"("date");
