-- CreateTable
CREATE TABLE "verificacao_email" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "expiraEM" TIMESTAMP(3) NOT NULL,
    "tentativas" INTEGER NOT NULL DEFAULT 0,
    "usadoEM" TIMESTAMP(3),
    "usuario_id" TEXT NOT NULL,

    CONSTRAINT "verificacao_email_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "verificacao_email" ADD CONSTRAINT "verificacao_email_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
