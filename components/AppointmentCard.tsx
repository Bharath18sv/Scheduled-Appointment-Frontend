"use client";

import type { Appointment } from "@/types";
import { APPOINTMENT_TYPE_CONFIG } from "@/types";
import { appointmentService } from "@/services/appointmentService";
import { format } from "date-fns";

interface AppointmentCardProps {
  appointment: Appointment;
  compact?: boolean;
}

export function AppointmentCard({
  appointment,
  compact = false,
}: AppointmentCardProps) {
  const populatedAppointment =
    appointmentService.getPopulatedAppointment(appointment);

  if (!populatedAppointment) return null;

  const { patient, type } = populatedAppointment;
  const typeConfig = APPOINTMENT_TYPE_CONFIG[type];

  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);
  const duration = Math.round(
    (endTime.getTime() - startTime.getTime()) / (1000 * 60)
  );

  if (compact) {
    return (
      <div
        className="text-xs px-2 py-1 rounded-md mb-1 truncate font-medium"
        style={{
          backgroundColor: `${typeConfig.color}20`,
          color: typeConfig.color,
        }}
        title={`${patient.name} - ${typeConfig.label} (${duration} min)`}
      >
        <div className="truncate">{patient.name}</div>
        <div className="opacity-75 text-[11px] truncate">
          {typeConfig.label} · {duration}m
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white mb-3">
      {/* Header: Patient Name + Appointment Type */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-900 text-sm truncate">
          {patient.name}
        </h4>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            backgroundColor: `${typeConfig.color}20`,
            color: typeConfig.color,
          }}
        >
          {typeConfig.label}
        </span>
      </div>

      {/* Time + Duration */}
      <div className="text-xs text-gray-600">
        <p>
          {format(startTime, "h:mm a")} – {format(endTime, "h:mm a")}
        </p>
        <p className="text-gray-500">{duration} minutes</p>
      </div>

      {/* Notes */}
      {appointment.notes && (
        <div className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-2 italic">
          {appointment.notes}
        </div>
      )}
    </div>
  );
}
