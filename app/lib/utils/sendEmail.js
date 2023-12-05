import emailjs from 'emailjs-com';

emailjs.init(process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID);

const sendEmail = async data => {
  const { name, email, phone } = data;
  const emailData = {
    // to_email: process.env.NEXT_PUBLIC_TOEMAIL,
    to_email: 'dev6012@gmail.com',
    subject: `${name}`,
    from_name: `${name}`,
    message: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
    `,
  };

  try {
    const res = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
      emailData
    );
    return res;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
