const { Resend } = require('resend');

const resend = new Resend(process.env.CHAVE_RESEND);

// cria o dominio que vai ser usado para enviar o email
resend.domains.create({ name: 'calculacompras.com.br' });

async function enviarEmail(destinatario, codigo) {
    try {
        const resultado = await resend.emails.send({
          // o campo '<o_nome_que_você_quiser@o_dominio_que_voce_criou_com_resend.domains.create({})>' é 
            from: 'Calcula Compras <verificacao@calculacompras.com.br>',
            to: destinatario,
            subject: 'Verificação de e-mail',
            text: `Seu código de verificação é: ${codigo}`
        });

        console.log('E-mail enviado!', resultado);

    } catch (error) {
        console.log('Erro:', error);
        throw error;
    }
}

module.exports = {
  enviarEmail
}

