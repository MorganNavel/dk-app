import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/User";

// Horaires standards en UTC (qui seront ajustés selon le fuseau horaire de l'utilisateur)
const scheduleHours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
interface EventDetails {
  startTime: Date;
  duration: number;
  title: string;
  description: string | null;
  groupSize: number;
  currentParticipants: number;
  teacher: {
    idUser: number;
    name: string;
    firstname: string;
    email: string;
    languages?: string;
  };
}
interface SchedulerProps {
  lessons: EventDetails[] | null;
}
export default function Scheduler() {
  const [events, setEvents] = useState<{ [key: string]: EventDetails }>({});
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);
  const [localHours, setLocalHours] = useState<string[]>([]);

  useEffect(() => {
    const userTimeZoneOffset = new Date().getTimezoneOffset() / 60;
    const adjustedHours = scheduleHours.map((hour) => {
      const [h, m] = hour.split(":").map(Number);
      const adjustedHour = (h - userTimeZoneOffset + 24) % 24;
      return `${String(adjustedHour).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )}`;
    });
    setLocalHours(adjustedHours);
  }, []);

  const handleAddEvent = (day: string, hour: string) => {
    const eventDetails: EventDetails = {
      startTime: new Date(`${day} ${hour}`),
      duration: 1, // Assuming default duration is 1 hour
      title: prompt("Sujet du cours") || "",
      description: null,
      groupSize: Number(prompt("Nombre maximum de participants")),
      currentParticipants: Number(prompt("Nombre de participants actuels")),
      teacher: {
        idUser: 0, // Assuming default teacher id
        name: "Default", // Assuming default teacher name
        firstname: "Teacher", // Assuming default teacher firstname
        email: "teacher@example.com", // Assuming default teacher email
      },
    };
    setEvents((prevEvents) => ({
      ...prevEvents,
      [`${day}-${hour}`]: eventDetails,
    }));
  };

  const handleBlockSlot = (day: string, hour: string) => {
    setBlockedSlots((prevSlots) => [...prevSlots, `${day}-${hour}`]);
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b border-gray-200'></th>
            {days.map((day) => (
              <th
                key={day}
                className='py-2 px-4 border-b border-gray-200 text-center'
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {localHours.map((hour, hourIndex) => (
            <tr key={hour} className='text-center'>
              <td className='py-2 px-4 border-b border-gray-200 text-right'>
                {hour}
              </td>
              {days.map((day) => (
                <td
                  key={`${day}-${hour}`}
                  className={`py-2 px-4 border-b border-gray-200 ${
                    blockedSlots.includes(`${day}-${hour}`)
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {blockedSlots.includes(`${day}-${hour}`) ? (
                    <span className='text-gray-500'>Bloqué</span>
                  ) : events[`${day}-${hour}`] ? (
                    <div className='p-2 bg-blue-100 rounded-lg'>
                      <p>
                        <strong>{events[`${day}-${hour}`].title}</strong>
                      </p>
                      <p>
                        {events[`${day}-${hour}`].startTime.toLocaleString()} -
                        {events[
                          `${day}-${hour}`
                        ].startTime.toLocaleTimeString()}{" "}
                        -{" "}
                        {new Date(
                          events[`${day}-${hour}`].startTime.getTime() +
                            events[`${day}-${hour}`].duration * 60 * 60 * 1000
                        ).toLocaleTimeString()}
                      </p>
                      <p>
                        Participants :
                        {events[`${day}-${hour}`].currentParticipants} /{" "}
                        {events[`${day}-${hour}`].groupSize}
                      </p>
                    </div>
                  ) : (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          onClick={() => handleAddEvent(day, hour)}
                          className='w-full h-full'
                        >
                          +
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <p>
                          Ajouter un cours pour {day} à {hour}
                        </p>
                        <Button
                          variant='secondary'
                          onClick={() => handleBlockSlot(day, hour)}
                        >
                          Bloquer
                        </Button>
                      </PopoverContent>
                    </Popover>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
