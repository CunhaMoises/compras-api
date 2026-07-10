-- DropForeignKey
ALTER TABLE "itens_carrinho" DROP CONSTRAINT "itens_carrinho_carrinho_id_fkey";

-- AddForeignKey
ALTER TABLE "itens_carrinho" ADD CONSTRAINT "itens_carrinho_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "carrinho"("id") ON DELETE CASCADE ON UPDATE CASCADE;
