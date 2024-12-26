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
      text: `You have requested to reset your password. Use the following link to reset your password: ${link}`,
      html: `
            <div style="width:600px;margin:auto;text-align:center">
              <h1>
                You have requested to reset your password
              </h1>
              <p style="font-size:16px;">
                Click the link below to reset password
              </p>
              <a style="
                  display: inline-block;
                  background-color: #000000;
                  font-weight: 500;
                  font-size: 16px;
                  text-align: center;
                  color: #fff;
                  text-decoration: none;
                  text-decoration-line: none;
                  border-style: solid;
                  border-color: #000000;
                  border-width: 12px 24px;
                  border-radius: 100px;
                "
                href="${link}">
                Reset password
              </a>
            </div>
          `,
    })
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}
