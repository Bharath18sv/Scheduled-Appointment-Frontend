"use client";

import type { CalendarView } from "@/types";
import { useAppointments } from "@/hooks/useAppointments";
import { DoctorSelector } from "./DoctorSelector";
import { DayView } from "./DayView";
import { WeekView } from "./WeekView";
import { addDays, startOfWeek } from "date-fns";

interface ScheduleViewProps {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}

export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
}: ScheduleViewProps) {
  const weekStartDate = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Monday
  const weekEndDate = addDays(weekStartDate, 6); // Sunday

  const { appointments, doctor, loading, error } = useAppointments({
    doctorId: selectedDoctorId,
    date: selectedDate,
    startDate: view === "week" ? weekStartDate : undefined,
    endDate: view === "week" ? weekEndDate : undefined,
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
        Loading appointments...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 border border-red-200 rounded-lg">
        Error loading data. Please try again later.
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header Section */}
      <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              🩺 Doctor Schedule
            </h2>
            {doctor ? (
              <p className="text-sm text-gray-600 mt-1">
                Dr. {doctor.name} — <span>{doctor.specialty}</span>
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-1">Select a doctor</p>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Doctor Selector */}
            <DoctorSelector
              selectedDoctorId={selectedDoctorId}
              onDoctorChange={onDoctorChange}
            />

            {/* Date Picker */}
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => onDateChange(new Date(e.target.value))}
            />

            {/* View Switch */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewChange("day")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  view === "day"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => onViewChange("week")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                  view === "week"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="p-6 bg-gray-50 rounded-b-xl">
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
            weekStartDate={weekStartDate}
          />
        )}
      </div>
    </div>
  );
}
