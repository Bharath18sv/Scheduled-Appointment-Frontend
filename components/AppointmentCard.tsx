/**
 * AppointmentCard Component
 *
 * Displays a single appointment with appropriate styling and color coding.
 */

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
        className="text-xs p-1 rounded mb-1 truncate"
        style={{ backgroundColor: typeConfig.color, color: "white" }}
        title={`${patient.name} - ${typeConfig.label} (${duration} min)`}
      >
        <div className="font-medium truncate">{patient.name}</div>
        <div className="opacity-90 truncate">{typeConfig.label}</div>
      </div>
    );
  }

  return (
    <div
      className="p-3 rounded-lg shadow-sm border-l-4 mb-2"
      style={{
        borderLeftColor: typeConfig.color,
        backgroundColor: `${typeConfig.color}10`,
      }}
    >
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-semibold text-gray-900 text-sm">{patient.name}</h4>
        <span
          className="text-xs px-2 py-1 rounded-full text-white"
          style={{ backgroundColor: typeConfig.color }}
        >
          {typeConfig.label}
        </span>
      </div>

      <div className="text-xs text-gray-600 space-y-1">
        <div>
          {format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
        </div>
        <div>{duration} minutes</div>
        {appointment.notes && (
          <div className="mt-2 text-gray-500 italic">{appointment.notes}</div>
        )}
      </div>
    </div>
  );
}
