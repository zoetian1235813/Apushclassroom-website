import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM,
} = process.env;

let transporter = null;

if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number.parseInt(SMTP_PORT, 10),
    secure: SMTP_SECURE === "true" || SMTP_PORT === "465",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} else {
  console.warn(
    "[Email] SMTP configuration is incomplete. Email-based login will not function until configured."
  );
}

export const sendVerificationCode = async (recipientEmail, code) => {
  if (!transporter) {
    console.info(
      `[Email] SMTP not configured. Verification code for ${recipientEmail}: ${code}`
    );
    return;
  }

  const from = EMAIL_FROM || SMTP_USER;
  const subject = "Your APUSH Learning login code";
  const text = [
    "Use the verification code below to log in to the APUSH Learning site.",
    "",
    `Code: ${code}`,
    "",
    "The code will expire in 10 minutes. If you did not request this code, you can safely ignore this email.",
  ].join("\n");

  await transporter.sendMail({
    from,
    to: recipientEmail,
    subject,
    text,
  });
};
