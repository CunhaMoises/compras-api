/*
  Warnings:

  - A unique constraint covering the columns `[usuario_id]` on the table `verificacao_email` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verificacao_email_usuario_id_key" ON "verificacao_email"("usuario_id");
