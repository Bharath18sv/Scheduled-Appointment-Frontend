/**
 * WeekView Component
 *
 * Displays appointments for a week (Monday - Sunday) in a grid format.
 *
 * TODO for candidates:
 * 1. Generate a 7-day grid (Monday through Sunday)
 * 2. Generate time slots for each day
 * 3. Position appointments in the correct day and time
 * 4. Make it responsive (may need horizontal scroll on mobile)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments
 */

"use client";

import type { Appointment, Doctor } from "@/types";

interface WeekViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  weekStartDate: Date; // Should be a Monday
}

/**
 * WeekView Component
 *
 * Renders a weekly calendar grid with appointments.
 *
 * TODO: Implement this component
 *
 * Architecture suggestions:
 * 1. Generate an array of 7 dates (Mon-Sun) from weekStartDate
 * 2. Generate time slots (same as DayView: 8 AM - 6 PM)
 * 3. Create a grid: rows = time slots, columns = days
 * 4. Position appointments in the correct cell (day + time)
 *
 * Consider:
 * - How to make the grid scrollable horizontally on mobile?
 * - How to show day names and dates in headers?
 * - How to handle appointments that span multiple hours?
 * - Should you reuse logic from DayView?
 */
export function WeekView({
  appointments,
  doctor,
  weekStartDate,
}: WeekViewProps) {
  /**
   * TODO: Generate array of 7 dates (Monday through Sunday)
   *
   * Starting from weekStartDate, create an array of the next 7 days
   */
  function getWeekDays(): Date[] {
    // TODO: Implement week days generation
    // Example:
    // return [
    //   new Date(weekStartDate), // Monday
    //   addDays(weekStartDate, 1), // Tuesday
    //   ...
    //   addDays(weekStartDate, 6), // Sunday
    // ];
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStartDate);
      day.setDate(weekStartDate.getDate() + i);
      days.push(day);
    }
    return days;
  }

  /**
   * TODO: Generate time slots (same as DayView)
   */
  function generateTimeSlots() {
    // TODO: Implement (can be same as DayView)
    const slots = [];
    const startHour = 8;
    const endHour = 18; // 6 PM

    for (let hour = startHour; hour < endHour; hour++) {
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

  /**
   * TODO: Get appointments for a specific day
   */
  function getAppointmentsForDay(date: Date): Appointment[] {
    // TODO: Filter appointments that fall on this specific day
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      return (
        aptDate.getFullYear() === date.getFullYear() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getDate() === date.getDate()
      );
    });
  }

  /**
   * TODO: Get appointments for a specific day and time slot
   */
  function getAppointmentsForDayAndSlot(
    date: Date,
    slotStart: Date
  ): Appointment[] {
    // TODO: Filter appointments for this day and time
    const slotEnd = new Date(slotStart);
    slotEnd.setHours(slotEnd.getHours() + 1);

    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);

      // Match same day
      const sameDay =
        aptStart.getFullYear() === date.getFullYear() &&
        aptStart.getMonth() === date.getMonth() &&
        aptStart.getDate() === date.getDate();

      // Check overlap with slot
      const overlaps = aptStart < slotEnd && aptEnd > slotStart;

      return sameDay && overlaps;
    });
  }

  const weekDays = getWeekDays();
  const timeSlots = generateTimeSlots();
  const typeColors: Record<string, string> = {
    checkup: "bg-blue-100 border-blue-400",
    consultation: "bg-green-100 border-green-400",
    surgery: "bg-red-100 border-red-400",
    default: "bg-gray-100 border-gray-400",
  };

  return (
    <div className="week-view">
      {/* Week header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {/* TODO: Format week range (e.g., "Oct 14 - Oct 20, 2024") */}
          Week View
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Week grid - may need horizontal scroll on mobile */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        {/* TODO: Implement the week grid */}
        <div className="text-center text-gray-500 py-12">
          <p>Week View Grid Goes Here</p>
          <p className="text-sm mt-2">
            Implement 7-day grid (Mon-Sun) with time slots
          </p>

          {/* Placeholder to show appointments exist */}
          {appointments.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium">
                {appointments.length} appointment(s) for this week
              </p>
            </div>
          )}
        </div>

        {/* TODO: Replace above with actual grid implementation */}
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="w-20 p-2 text-xs bg-gray-50">Time</th>
                {weekDays.map((day, index) => (
                  <th key={index} className="p-2 text-xs bg-gray-50 border-l">
                    <div className="font-semibold">
                      {day.toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-gray-600 text-xs">
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
              {timeSlots.map((slot, slotIndex) => (
                <tr key={slotIndex} className="border-t">
                  <td className="p-2 text-xs text-gray-600">{slot.label}</td>

                  {weekDays.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className="p-1 border-l align-top min-h-[60px]"
                    >
                      {getAppointmentsForDayAndSlot(day, slot.start).map(
                        (apt) => {
                          const colorClass =
                            typeColors[apt.type] || typeColors.default;
                          return (
                            <div
                              key={apt.id}
                              className={`border-l-4 ${colorClass} p-1 rounded-sm text-xs mb-1`}
                            >
                              {apt.type} (
                              {new Date(apt.startTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              )
                            </div>
                          );
                        }
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this week
        </div>
      )}
    </div>
  );
}

/**
 * TODO: Consider reusing the AppointmentCard component from DayView
 *
 * You might want to add a "compact" prop to make it smaller for week view
 */
