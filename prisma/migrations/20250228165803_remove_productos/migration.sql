/*
  Warnings:

  - The primary key for the `Pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productos` on the `Pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_pkey",
DROP COLUMN "productos",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "estado" DROP DEFAULT,
ADD CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pedido_id_seq";
