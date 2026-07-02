-- CreateTable
CREATE TABLE "carrinho" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_carrinho" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION,
    "quantidade" INTEGER,
    "carrinho_id" TEXT NOT NULL,

    CONSTRAINT "itens_carrinho_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itens_carrinho" ADD CONSTRAINT "itens_carrinho_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "carrinho"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
