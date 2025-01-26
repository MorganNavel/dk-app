// Imports and initial configurations
import { Lesson } from "@/models/LessonModel";
import { User } from "@/models/UserModel";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { BookingServices } from "@/feat/booking/BookingServices";
import { STATUS_CODES } from "./statusCodes";
import { Transporter } from "./Transporter";

dotenv.config();

export function ArrayToString(array: string[]): string | null {
  if (!array || array.length === 0 || (array.length === 1 && array[0] === ""))
    return null;
  return array.join(";");
}

export function StringToArray(string: string): string[] | null {
  if (!string) return null;
  const array = string.split(";");
  return array.length === 1 && array[0] === "" ? null : array;
}

export function generateVisioLink(lesson: Lesson): string {
  const roomName = `meeting-${uuidv4()}-${lesson.idLesson}`;
  return `https://meet.jit.si/${roomName}`;
}

export async function sendEmailTemplate(
  url: string,
  user: any,
  isTeacher: boolean
) {
  const subject = isTeacher
    ? "Your class is starting soon!"
    : "Your reserved class is starting soon!";

  const body = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="" alt="Danbee Korean" style="max-width: 150px;">
      </div>
      <div style="margin-bottom: 20px;">
        <p>Dear ${user.name},</p>
        <p>${
          isTeacher
            ? "Your class is about to begin"
            : "The class you reserved is about to begin"
        }. Click the link below to join:</p>
        <p style="text-align: center;">
          <a href="${url}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">Join Class</a>
        </p>
      </div>
      <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #777;">
        <p>Best regards,</p>
        <p>Danbee Korean Team</p>
        <div style="text-align: center; margin-top: 30px;">
          <img src="" alt="Danbee Korean" style="max-width: 100px;">
        </div>
        <p style="text-align: center; margin-top: 10px;">© 2024 Danbee Korean. All rights reserved.</p>
      </div>
    </div>
  `;
  const email: Email = {
    email: user.email,
    subject,
    body,
  };

  await sendEmail(email);
}

export async function approachingLessons() {
  try {
    const response = await BookingServices.getAllApproachingLessons();
    if (response.code !== STATUS_CODES.OK) return;

    const lessons = response.data as Record<
      string,
      { lesson: Lesson; users: Array<User> }
    >;
    for (const key of Object.keys(lessons)) {
      const { lesson, users } = lessons[key];
      const { teacher } = lesson;
      const url = generateVisioLink(lesson);

      await Promise.all(
        users.map((user) => sendEmailTemplate(url, user, false))
      );

      if (teacher) {
        await sendEmailTemplate(url, lesson.teacher, true);
      }
    }
  } catch (error) {
    console.error("Error processing approaching lessons:", error);
  }
}

export async function sendEmail(email: Email) {
  const transporter = Transporter.getTransporter();

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email.email,
    subject: email.subject,
    html: email.body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    console.log("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export interface Email {
  email: string;
  body: string;
  subject?: string;
}
