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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Hospital Appointment Scheduler
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View and manage doctor appointments with our intuitive scheduling
            system
          </p>
        </header>

        {/* Content Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
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
