import { Client } from "pg";
import cron from "node-cron";
import { sendEmailStudent, sendEmailTeacher } from "./sendEmail";
import { generateJitsiJWT } from "./jwt";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.DATABASE_URL!;
const client = new Client({ connectionString });

async function main() {
  await client.connect();
  console.log("Connecté à la base");

  cron.schedule("* * * * * *", async () => {
    console.log("Tâche cron déclenchée", new Date().toISOString());
    try {
      const lessons = await getUpCommingLessons();
      for (const l of lessons.values()) {
        const room = `meeting-${l.idLesson}`;
        let link = `https://meet.danbee-korean.com/${room}`;
        const date = {
          startDate: l.startDate,
          endDate: l.endDate,
          duration: l.duration,
        };
        const jwt = generateJitsiJWT({
          room,
          role: "participant",
          email: l.teacher.email,
          name: l.teacher.name,
        });
        const jitsiLink = `${link}?jwt=${jwt}`;

        await sendEmailTeacher(
          l.teacher.email,
          l.teacher.name,
          jitsiLink,
          date
        );

        for (const s of l.students) {
          const jwt = generateJitsiJWT({
            room,
            role: "participant",
            email: s.email,
            name: s.name,
          });
          const jitsiLink = `${link}?jwt=${jwt}`;
          await sendEmailStudent(s.email, s.name, jitsiLink, date);
        }
      }
    } catch (err) {
      console.error("Erreur lors de la tâche cron :", err);
    }
  });
}
interface LessonResultQuery {
  idLesson: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  studentName: string;
  studentEmail: string;
  teacherName: string;
  teacherEmail: string;
}
interface LessonInfo {
  idLesson: number;
  startDate: Date;
  endDate: Date;
  duration: number;
  students: { name: string; email: string }[];
  teacher: { name: string; email: string };
}
async function getUpCommingLessons(interval: number = 20) {
  const query = `
        SELECT 
        	l."startDate",
          l."endDate",
          l.duration,
          l."idLesson", 
          us.name AS "studentName", 
          us.email AS "studentEmail",
          ut.name AS "teacherName", 
          ut.email AS "teacherEmail"
        FROM "Lesson" AS l
        JOIN "Booking" AS b ON l."idLesson" = b."idLesson"
        JOIN public.user AS ut ON ut.id = l."idTeacher"
        JOIN public."user" AS us ON us.id = b."idUser"
        WHERE l."startDate" BETWEEN NOW()::timestamp AND NOW()::timestamp + ($1 || ' minutes')::interval
        AND l.status = 'planned';
  `;
  const lessonsMap = new Map<number, LessonInfo>();
  const result = await client.query<LessonResultQuery>(query, [interval]);
  for (const row of result.rows) {
    const idLesson = row.idLesson;
    if (!lessonsMap.has(idLesson)) {
      lessonsMap.set(idLesson, {
        idLesson: idLesson,
        startDate: row.startDate,
        endDate: row.endDate,
        duration: row.duration,
        teacher: { name: row.teacherName, email: row.teacherEmail },
        students: [],
      });
    }
    const lesson = lessonsMap.get(idLesson)!;
    lesson.students.push({
      name: row.studentName,
      email: row.studentEmail,
    });
  }
  return lessonsMap;
}
main().catch(console.error);
