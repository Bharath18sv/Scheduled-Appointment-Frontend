"use client";

import { useState, useEffect, useRef } from "react";
import type { Doctor } from "@/types";
import { appointmentService } from "@/services/appointmentService";

interface DoctorSelectorProps {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

export function DoctorSelector({
  selectedDoctorId,
  onDoctorChange,
}: DoctorSelectorProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch all doctors from the service
  useEffect(() => {
    const allDoctors = appointmentService.getAllDoctors();
    setDoctors(allDoctors);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <div className="relative w-64" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-2 text-sm border rounded-lg flex justify-between items-center transition-colors ${
          isOpen
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 bg-white hover:border-gray-400"
        }`}
      >
        <span className="truncate text-gray-700">
          {selectedDoctor
            ? `Dr. ${selectedDoctor.name} — ${selectedDoctor.specialty}`
            : "Select a doctor..."}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden animate-fadeIn">
          {doctors.map((doctor) => {
            const isSelected = doctor.id === selectedDoctorId;
            return (
              <button
                key={doctor.id}
                onClick={() => {
                  onDoctorChange(doctor.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  isSelected
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                Dr. {doctor.name} —{" "}
                <span className="text-gray-500">{doctor.specialty}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
