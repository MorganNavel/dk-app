import { getHours, getMinutes, format } from "date-fns";
import { useState, useEffect, useRef } from "react";

export function CurrentTimeIndicator({
  hourHeight = 0,
  hourWidth = 0,
}: Readonly<{ hourHeight?: number; hourWidth?: number }>) {
  const [position, setPosition] = useState(() => calculatePosition());
  const [time, setTime] = useState(() => format(new Date(), "HH:mm"));
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  function calculatePosition() {
    const now = new Date();

    const hours = getHours(now);
    const minutes = getMinutes(now);

    return Math.round(hours * hourHeight + (minutes / 60) * hourHeight);
  }

  useEffect(() => {
    if (indicatorRef.current) {
      indicatorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    const interval = setInterval(() => {
      setPosition(calculatePosition());
      setTime(format(new Date(), "HH:mm"));
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [hourHeight]);

  return (
    <div
      className='absolute left-0 right-0 z-50 flex items-center animate-pulse'
      style={{
        top: `${position}px`,
        left: `${hourWidth}px`,
        transform: "translate(-6px,-8px)",
        pointerEvents: "none",
      }}
      ref={indicatorRef}
    >
      <div className='w-3 h-3 bg-red-500 rounded-full shadow-lg ' />
      <div className='w-2 h-[2px] bg-red-500'></div>
      <div className='mx-3 text-xs text-red-500 font-bold tracking-wide'>
        {time}
      </div>
      <div className='flex-1 h-[2px] bg-red-500'></div>
    </div>
  );
}
