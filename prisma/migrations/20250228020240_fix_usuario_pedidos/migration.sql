/*
  Warnings:

  - The primary key for the `Pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Pedido` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `estado` column on the `Pedido` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_pkey",
ADD COLUMN     "productos" TEXT[],
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "estado",
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
ADD CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id");
