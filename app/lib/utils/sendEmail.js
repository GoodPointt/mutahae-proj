import emailjs from 'emailjs-com';

emailjs.init(process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID);

const sendEmail = async data => {
  const { name, email, phone, uid = '', title = '' } = data;

  const productId = uid ? `🆔 id: ${uid}` : '';
  const productName = title ? `🪵 Product: ${title}` : '';

  const emailData = {
    subject: `${name}`,
    from_name: `${name}`,
    message: `
    ${productId}
    ${productName}
    ✉️ Email: ${email}
    🙂 Name: ${name}
    📞 Phone: ${phone}
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
