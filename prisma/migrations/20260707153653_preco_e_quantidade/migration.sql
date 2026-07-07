/*
  Warnings:

  - Made the column `preco` on table `itens_carrinho` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantidade` on table `itens_carrinho` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "itens_carrinho" ALTER COLUMN "preco" SET NOT NULL,
ALTER COLUMN "quantidade" SET NOT NULL;
