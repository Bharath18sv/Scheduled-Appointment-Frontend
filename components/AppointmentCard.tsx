import type { Appointment, Patient } from "@/types";
import { getPatientById } from "@/data/mockData";

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);

  const patient = getPatientById(appointment.patientId);
  if (!patient) {
    return (
      <div className="border-l-4 bg-red-50 border-red-400 p-2 mb-2 rounded-md text-sm">
        <p className="text-red-600 font-semibold">Patient not found</p>
      </div>
    );
  }

  const duration = (end.getTime() - start.getTime()) / (1000 * 60); // in minutes

  // Simple color-coding based on type
  const typeColors: Record<string, string> = {
    checkup: "bg-blue-100 border-blue-400",
    consultation: "bg-green-100 border-green-400",
    surgery: "bg-red-100 border-red-400",
    default: "bg-gray-100 border-gray-400",
  };

  const colorClass = typeColors[appointment.type] || typeColors.default;

  return (
    <div
      className={`border-l-4 ${colorClass} rounded-md p-2 mb-2 shadow-sm text-sm`}
    >
      <p className="font-semibold">{patient.name}</p>
      <p className="text-gray-600 capitalize">{appointment.type}</p>
      <p className="text-xs text-gray-500">
        {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
        {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} (
        {duration} mins)
      </p>
    </div>
  );
}
