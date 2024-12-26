import sgMail from '@sendgrid/mail';

export async function sendVerificationEmail(
  email: string,
  token: string,
  userName: string = ''
) {
  const link = `${process.env.DOMAIN}/verify-email?token=${token}`;
  const emailFrom = process.env.EMAIL_FROM as string;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  await sgMail
    .send({
      to: email,
      from: emailFrom,
      subject: 'Account verification',
      text: `You have requested to account verification. Use the following link to verify your account: ${link}`,
      html: `
            <div style="width:600px;margin:auto;text-align:center">
              <h1 style="color:black;text-decoration:none;text-decoration-line:none;">${userName.length > 0 ? `Hi ${userName}. ` : ''}<br />Verify your email address</h1>
              <p style="font-size:16px;">
                Click the link below to verify your email address
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
                href="${link}"
                >
                Verify email
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
