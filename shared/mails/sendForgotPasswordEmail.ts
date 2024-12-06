import sgMail from '@sendgrid/mail';

export async function sendForgotPasswordEmail(email: string, token: string) {
  const link = `${process.env.DOMAIN}/reset-password?token=${token}`;
  const emailFrom = process.env.EMAIL_FROM as string;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  await sgMail
    .send({
      to: email,
      from: emailFrom,
      subject: 'Reset your password',
      text: 'This is a sample email.',
      html: `
            <h1>You have requested to reset your password</h1>
            <p>Click the link below to reset password</p>
            <a href="${link}">Reset password</a>
        `,
    })
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}
