/**
 * ScheduleView Component
 *
 * Main component that orchestrates the schedule display.
 * This component should compose smaller components together.
 *
 * TODO for candidates:
 * 1. Create the component structure (header, controls, calendar)
 * 2. Compose DoctorSelector, DayView, WeekView together
 * 3. Handle view switching (day vs week)
 * 4. Manage state or use the useAppointments hook
 * 5. Think about component composition and reusability
 */

"use client";

import { useState } from "react";
import type { CalendarView } from "@/types";
import { useAppointments } from "@/hooks/useAppointments";
import { DoctorSelector } from "./DoctorSelector";
import { DayView } from "./DayView";
import { WeekView } from "./WeekView";

// TODO: Import your components
// import { DoctorSelector } from './DoctorSelector';
// import { DayView } from './DayView';
// import { WeekView } from './WeekView';

interface ScheduleViewProps {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}

/**
 * ScheduleView Component
 *
 * This is the main container component for the schedule interface.
 *
 * TODO: Implement this component
 *
 * Consider:
 * - How to structure the layout (header, controls, calendar)
 * - How to compose smaller components
 * - How to pass data down to child components
 * - How to handle user interactions (view switching, date changes)
 */
export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
}: ScheduleViewProps) {
  // TODO: Use the useAppointments hook to fetch data
  // const { appointments, doctor, loading, error } = useAppointments({
  //   doctorId: selectedDoctorId,
  //   date: selectedDate,
  // });
  const { appointments, doctor, loading, error } = useAppointments({
    doctorId: selectedDoctorId,
    date: selectedDate,
  });
  function getWeekStart(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  if (loading)
    return <p className="p-6 text-gray-500">Loading appointments...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading data</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Doctor Schedule
            </h2>
            {doctor ? (
              <p className="text-sm text-gray-600 mt-1">
                Dr. {doctor.name} – {doctor.specialty}
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-1">Select a doctor</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4 items-center">
            <DoctorSelector
              selectedDoctorId={selectedDoctorId}
              onDoctorChange={onDoctorChange}
            />

            {/* Simple date picker */}
            <input
              type="date"
              className="border rounded p-2 text-sm"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => onDateChange(new Date(e.target.value))}
            />

            {/* View toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => onViewChange("day")}
                className={`px-4 py-2 text-sm rounded ${
                  view === "day"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => onViewChange("week")}
                className={`px-4 py-2 text-sm rounded ${
                  view === "week"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-6">
        {view === "day" ? (
          <DayView
            appointments={appointments}
            doctor={doctor}
            date={selectedDate}
          />
        ) : (
          <WeekView
            appointments={appointments}
            doctor={doctor}
            weekStartDate={getWeekStart(selectedDate)}
          />
        )}
      </div>
    </div>
  );
}
