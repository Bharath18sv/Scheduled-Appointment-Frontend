"use client";

import { useState } from "react";
import { MOCK_DOCTORS } from "@/data/mockData";
import type { CalendarView } from "@/types";
import { ScheduleView } from "@/components/ScheduleView";
import { startOfWeek } from "date-fns";

export default function SchedulePage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    MOCK_DOCTORS[0].id
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [view, setView] = useState<CalendarView>("day");

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Appointment Schedule
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Manage and view doctor appointments
            </p>
          </div>
        </header>

        {/* Content Section */}
        <section className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6 sm:p-8">
          <ScheduleView
            selectedDoctorId={selectedDoctorId}
            selectedDate={selectedDate}
            view={view}
            onDoctorChange={setSelectedDoctorId}
            onDateChange={setSelectedDate}
            onViewChange={setView}
          />
        </section>
      </div>
    </main>
  );
}
