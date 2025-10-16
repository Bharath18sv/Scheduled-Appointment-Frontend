"use client";

import type { Appointment, Doctor } from "@/types";
import { format, addDays } from "date-fns";
import { AppointmentCard } from "./AppointmentCard";

interface WeekViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  weekStartDate: Date;
}

export function WeekView({
  appointments,
  doctor,
  weekStartDate,
}: WeekViewProps) {
  // Generate 7 days (Mon–Sun)
  function getWeekDays(): Date[] {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStartDate);
      day.setDate(weekStartDate.getDate() + i);
      days.push(day);
    }
    return days;
  }

  // Generate hourly time slots (8 AM – 6 PM)
  function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      const start = new Date();
      start.setHours(hour, 0, 0, 0);
      const end = new Date();
      end.setHours(hour + 1, 0, 0, 0);
      slots.push({
        start,
        end,
        label: `${hour.toString().padStart(2, "0")}:00 - ${(hour + 1)
          .toString()
          .padStart(2, "0")}:00`,
      });
    }
    return slots;
  }

  // Appointments for a specific day and time slot
  function getAppointmentsForDayAndSlot(date: Date, slotStart: Date) {
    const slotEnd = new Date(slotStart);
    slotEnd.setHours(slotEnd.getHours() + 1);

    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      const sameDay =
        aptStart.getFullYear() === date.getFullYear() &&
        aptStart.getMonth() === date.getMonth() &&
        aptStart.getDate() === date.getDate();

      const overlaps = aptStart < slotEnd && aptEnd > slotStart;
      return sameDay && overlaps;
    });
  }

  const weekDays = getWeekDays();
  const timeSlots = generateTimeSlots();

  return (
    <div className="week-view">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(weekStartDate, "MMM d")} –{" "}
          {format(addDays(weekStartDate, 6), "MMM d, yyyy")}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} — {doctor.specialty}
          </p>
        )}
      </div>

      {/* Grid Wrapper (scrollable) */}
      <div className="border border-gray-200 rounded-xl overflow-x-auto bg-white shadow-sm">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700">
              <th className="w-24 p-3 text-left font-semibold sticky left-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                Time
              </th>
              {weekDays.map((day, index) => (
                <th
                  key={index}
                  className="p-3 text-center font-semibold border-l border-gray-200"
                >
                  <div className="text-sm font-medium">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {day.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timeSlots.map((slot, i) => (
              <tr
                key={i}
                className={`border-t border-gray-100 hover:bg-gray-50 transition`}
              >
                {/* Time label column */}
                <td className="p-3 text-xs text-gray-500 font-medium sticky left-0 bg-white border-r border-gray-100">
                  {slot.label}
                </td>

                {/* Appointment cells */}
                {weekDays.map((day, j) => (
                  <td
                    key={j}
                    className="p-1 border-l border-gray-100 align-top min-h-[60px]"
                  >
                    {getAppointmentsForDayAndSlot(day, slot.start).length >
                    0 ? (
                      <div className="space-y-1">
                        {getAppointmentsForDayAndSlot(day, slot.start).map(
                          (apt) => (
                            <AppointmentCard
                              key={apt.id}
                              appointment={apt}
                              // @ts-ignore — optional compact prop
                              compact
                            />
                          )
                        )}
                      </div>
                    ) : (
                      <div className="h-6"></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {appointments.length === 0 && (
        <div className="mt-6 text-center text-gray-500 text-sm">
          No appointments scheduled for this week 🗓️
        </div>
      )}
    </div>
  );
}
