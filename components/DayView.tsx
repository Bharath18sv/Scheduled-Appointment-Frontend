"use client";

import type { Appointment, Doctor, TimeSlot } from "@/types";
import { AppointmentCard } from "./AppointmentCard";
import { format } from "date-fns";

interface DayViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  date: Date;
}

export function DayView({ appointments, doctor, date }: DayViewProps) {
  // Generate 30-min time slots (8 AM - 6 PM)
  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);

        const label = format(start, "h:mm a");
        slots.push({ start, end, label });
      }
    }
    return slots;
  }

  // Find overlapping appointments for each slot
  function getAppointmentsForSlot(slot: TimeSlot): Appointment[] {
    return appointments.filter((app) => {
      const start = new Date(app.startTime);
      const end = new Date(app.endTime);
      return start < slot.end && end > slot.start;
    });
  }

  const timeSlots = generateTimeSlots();

  return (
    <div className="day-view">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {format(date, "EEEE, MMMM d, yyyy")}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600 mt-1">
            Dr. {doctor.name} — {doctor.specialty}
          </p>
        )}
      </div>

      {/* Timeline container */}
      <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-y-auto max-h-[70vh]">
        <div className="divide-y divide-gray-100">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className="flex hover:bg-gray-50 transition-colors"
            >
              {/* Time Label */}
              <div className="w-28 p-3 text-sm text-gray-500 bg-gray-50 border-r flex items-start justify-end pr-4 font-medium">
                {slot.label}
              </div>

              {/* Appointment Area */}
              <div className="flex-1 relative p-3 min-h-[70px]">
                {getAppointmentsForSlot(slot).length > 0 ? (
                  <div className="space-y-2">
                    {getAppointmentsForSlot(slot).map((appointment) => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        compact
                      />
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center text-xs text-gray-300 italic">
                    —
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-8 text-center text-gray-500 text-sm italic">
          No appointments scheduled for this day.
        </div>
      )}
    </div>
  );
}
