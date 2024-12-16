import { createTransport } from "nodemailer";

// GMAIL APP PASSWORD: bnrx hqua utec atcz
const sendEmail = async (options) => {
  // 1. Create transporter
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //   Activat in Gmail,"Less Secure App" option
  });

  // 2. Define Email Options
  const mailOptions = {
    from: "MarkVista <jesarkamran58786@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //   html:
  };

  // 3. Actually Send the Email
  console.log("Sending Email");
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

export default sendEmail;
