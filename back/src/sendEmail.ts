import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const GMAIL_ADR = process.env.GMAIL_ADR!;
const GMAIL_APP_PWD = process.env.GMAIL_APP_PWD!;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_ADR,
    pass: GMAIL_APP_PWD,
  },
});
interface DateLesson {
  startDate: Date;
  endDate: Date;
  duration: number;
}

export async function sendEmailTeacher(
  email: string,
  name: string,
  jitsiLink: string,
  date: DateLesson
) {
  let html = loadEmailTemplate(true);
  html = buildHTML(name, date, jitsiLink, html);
  await sendEmail(email, name, html);
}

export async function sendEmailStudent(
  email: string,
  name: string,
  jitsiLink: string,
  date: DateLesson
) {
  let html = loadEmailTemplate(false);
  html = buildHTML(name, date, jitsiLink, html);
  await sendEmail(email, name, html);
}

async function sendEmail(email: string, name: string, htmlContent: string) {
  const mailOptions = {
    from: `"Danbee Korean 🇰🇷" <${GMAIL_ADR}>`,
    to: `"${name}" <${email}>`,
    subject: "Link for incoming class",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

function loadEmailTemplate(isTeacher: boolean): string {
  let filePath = path.join(__dirname, "emails", "email-template.html");
  if (isTeacher) {
    filePath = path.join(__dirname, "emails", "email-template-teacher.html");
  }
  return fs.readFileSync(filePath, "utf-8");
}
function formatUTCWithoutSeconds(date: Date) {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // mois : 01-12
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min} UTC`;
}

function buildHTML(
  name: string,
  date: DateLesson,
  jitsiLink: string,
  template: string
): string {
  let min = `${date.duration} ${date.duration > 1 ? "minutes" : "minute"}`;
  return template
    .replace(/{{NAME}}/g, name)
    .replace(/{{JITSI_LINK}}/g, jitsiLink)
    .replace(/{{DATE_START}}/g, formatUTCWithoutSeconds(date.startDate))
    .replace(/{{DATE_END}}/g, formatUTCWithoutSeconds(date.endDate))
    .replace(/{{DURATION}}/g, min);
}
