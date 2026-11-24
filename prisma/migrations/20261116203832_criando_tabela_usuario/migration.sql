/*
  Warnings:

  - You are about to drop the `carrinho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itens_carrinho" DROP CONSTRAINT "itens_carrinho_carrinho_id_fkey";

-- DropTable
DROP TABLE "carrinho";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "login" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrinhos" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "carrinhos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "carrinhos" ADD CONSTRAINT "carrinhos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_carrinho" ADD CONSTRAINT "itens_carrinho_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "carrinhos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
