/*
  Warnings:

  - You are about to drop the column `idUser` on the `carrinho` table. All the data in the column will be lost.
  - Added the required column `usuario_id` to the `carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carrinho" DROP COLUMN "idUser",
ADD COLUMN     "usuario_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "carrinho" ADD CONSTRAINT "carrinho_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
