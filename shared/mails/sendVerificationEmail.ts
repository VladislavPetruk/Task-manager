import sgMail from '@sendgrid/mail';

export async function sendVerificationEmail(email: string, token: string, userName: string = '') {
  const link = `${process.env.DOMAIN}/verify-email?token=${token}`;
  const emailFrom = process.env.EMAIL_FROM as string
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  
  await sgMail
    .send({
      to: email,
      from: emailFrom,
      subject: 'Account verification',
      text: 'This is a sample email.',
      html: `
            <h1>${userName.length > 0 ? `Hi ${userName}. ` : ''}Verify your email address</h1>
            <p>Click the link below to verify your email address</p>
            <a href="${link}">Verify email</a>
        `,
    })
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}
