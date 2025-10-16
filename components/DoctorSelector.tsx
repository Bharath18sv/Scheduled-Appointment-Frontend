/**
 * DoctorSelector Component
 *
 * Dropdown to select which doctor's schedule to view.
 * For front desk staff (can see all doctors).
 *
 * TODO for candidates:
 * 1. Fetch list of all doctors
 * 2. Display in a dropdown/select
 * 3. Show doctor name and specialty
 * 4. Handle selection change
 * 5. Consider using a custom dropdown or native select
 */

"use client";

import { useState, useEffect, useRef } from "react";
import type { Doctor } from "@/types";
import { MOCK_DOCTORS } from "@/data/mockData";
import { appointmentService } from "@/services/appointmentService";

interface DoctorSelectorProps {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

/**
 * DoctorSelector Component
 *
 * A dropdown to select a doctor from the list of available doctors.
 *
 * TODO: Implement this component
 *
 * Consider:
 * - Should you fetch doctors here or accept them as props?
 * - Native <select> or custom dropdown component?
 * - How to display doctor info (name + specialty)?
 * - Should this be a reusable component?
 */

export function DoctorSelector({
  selectedDoctorId,
  onDoctorChange,
}: DoctorSelectorProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);

  // TODO: Fetch doctors
  useEffect(() => {
    const allDoctors = appointmentService.getAllDoctors();
    setDoctors(allDoctors);

    console.log("TODO: Fetch doctors");
  }, []);

  // use effect to handle click outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Find currently selected doctor for display
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <div className="doctor-selector">
      {/* drop down */}
      <button
        type="button"
        className="w-full px-4 py-2 text-sm text-left border rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedDoctor
          ? `Dr. ${selectedDoctor.name} - ${selectedDoctor.specialty}`
          : "Select a doctor..."}
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg">
          {doctors.map((doctor) => (
            <button
              key={doctor.id}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                onDoctorChange(doctor.id);
                setIsOpen(false);
              }}
            >
              Dr. {doctor.name} - {doctor.specialty}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
