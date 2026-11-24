const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.SMTP_USER,
    clientId: process.env.SMTP_CLIENT_ID,
    clientSecret: process.env.SMTP_CLIENT_SECRET,
    refreshToken: process.env.SMTP_REFRESH_TOKEN,
  },
});

async function enviarEmail(destinatario, codigo) {
  
  try {
    console.log('Testando conexão...');

    await transporter.verify();

    console.log('Conexão SMTP funcionando!');
    
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: destinatario,
      subject: 'Verificação de e-mail',
      text: `Seu código de verificação é: ${codigo}`
    })
    console.log('ENVIOU O E-MAIL')
  } catch (error) {
    console.log('Mensagem:', error.message);
    console.log('Código:', error.code);
    console.log('Comando:', error.command);
    console.log('Resposta:', error.response);
    console.log('Código SMTP:', error.responseCode);

    throw error
  }

}

module.exports = {
    enviarEmail
}