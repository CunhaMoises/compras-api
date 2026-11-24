-- DropForeignKey
ALTER TABLE "verificacao_email" DROP CONSTRAINT "verificacao_email_usuario_id_fkey";

-- AddForeignKey
ALTER TABLE "verificacao_email" ADD CONSTRAINT "verificacao_email_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
