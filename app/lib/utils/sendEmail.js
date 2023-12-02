import emailjs from "emailjs-com";

const {
  NEXT_PUBLIC_EMAIL_JS_USER_ID,
  NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
  NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
  NEXT_PUBLIC_TOEMAIL,
} = process.env;

emailjs.init(NEXT_PUBLIC_EMAIL_JS_USER_ID);

const sendEmail = async (data) => {
  const { name, email, phone } = data;
  const emailData = {
    to_email: NEXT_PUBLIC_TOEMAIL,
    subject: `${name}`,
    from_name: `${name}`,
    message: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
    `,
  };

  try {
    await emailjs.send(
      NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
      NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
      emailData
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
