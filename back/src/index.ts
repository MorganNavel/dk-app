import { Client } from "pg";
import cron from "node-cron";
import { sendEmailStudent, sendEmailTeacher } from "./email/sendEmail";
import { generateJitsiJWT } from "./jwt";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
export const client = new Client({ connectionString });

export interface LessonResultQuery {
  idLesson: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  studentName: string;
  studentEmail: string;
  teacherName: string;
  teacherEmail: string;
}

export interface LessonInfo {
  idLesson: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  students: { name: string; email: string }[];
  teacher: { name: string; email: string };
}

export async function getUpCommingLessons(
  interval: number = 30,
  offset: number = 5
) {
  const query = `
    SELECT 
      (l."startDate" AT TIME ZONE 'UTC') AS "startDate",
      (l."endDate" AT TIME ZONE 'UTC') AS "endDate",
      l.duration,
      l."idLesson", 
      us.name AS "studentName", 
      us.email AS "studentEmail",
      ut.name AS "teacherName", 
      ut.email AS "teacherEmail"
    FROM "Lesson" AS l
    JOIN "Booking" AS b ON l."idLesson" = b."idLesson"
    JOIN public."user" AS ut ON ut.id = l."idTeacher"
    JOIN public."user" AS us ON us.id = b."idUser"
    WHERE l."startDate" BETWEEN 
      NOW() + (($1::int - $2::int) || ' minutes')::interval AND 
      NOW() + (($1::int + $2::int) || ' minutes')::interval
    AND l.status = 'planned';
  `;

  const result = await client.query<LessonResultQuery>(query, [
    interval,
    offset,
  ]);
  const lessonsMap = new Map<number, LessonInfo>();

  for (const row of result.rows) {
    if (!lessonsMap.has(row.idLesson)) {
      lessonsMap.set(row.idLesson, {
        idLesson: row.idLesson,
        startDate: row.startDate,
        endDate: row.endDate,
        duration: row.duration,
        teacher: { name: row.teacherName, email: row.teacherEmail },
        students: [],
      });
    }
    lessonsMap.get(row.idLesson)!.students.push({
      name: row.studentName,
      email: row.studentEmail,
    });
  }
  return lessonsMap;
}

async function main() {
  await client.connect();
  console.log("Connecté à la base");

  cron.schedule("*/10 * * * *", async () => {
    console.log("Tâche cron déclenchée", new Date().toISOString());
    try {
      const lessons = await getUpCommingLessons();
      for (const l of lessons.values()) {
        const room = `meeting-${l.idLesson}`;
        const link = `https://meet.danbee-korean.com/${room}`;
        const date = {
          startDate: l.startDate,
          endDate: l.endDate,
          duration: l.duration,
        };

        const teacherJwt = generateJitsiJWT({
          room,
          role: "moderator",
          email: l.teacher.email,
          name: l.teacher.name,
        });
        await sendEmailTeacher(
          l.teacher.email,
          l.teacher.name,
          `${link}?jwt=${teacherJwt}`,
          date
        );

        for (const s of l.students) {
          const studentJwt = generateJitsiJWT({
            room,
            role: "participant",
            email: s.email,
            name: s.name,
          });
          await sendEmailStudent(
            s.email,
            s.name,
            `${link}?jwt=${studentJwt}`,
            date
          );
        }
      }
    } catch (err) {
      console.error("Erreur lors de la tâche cron :", err);
    }
  });
}
main();
