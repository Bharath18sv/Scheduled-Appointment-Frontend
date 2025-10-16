/**
 * Appointment Service
 *
 * This service provides an abstraction layer for accessing appointment data.
 * It's your data access layer - implement the methods to fetch and filter appointments.
 *
 * TODO for candidates:
 * 1. Implement getAppointmentsByDoctor
 * 2. Implement getAppointmentsByDoctorAndDate
 * 3. Implement getAppointmentsByDoctorAndDateRange (for week view)
 * 4. Consider adding helper methods for filtering, sorting, etc.
 * 5. Think about how to structure this for testability
 */

import type {
  Appointment,
  Doctor,
  Patient,
  PopulatedAppointment,
} from "@/types";
import {
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  getDoctorById,
  getPatientById,
} from "@/data/mockData";

/**
 * AppointmentService class
 *
 * Provides methods to access and manipulate appointment data.
 * This is where you abstract data access from your components.
 */

// helper function:
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
export class AppointmentService {
  /**
   * Get all appointments for a specific doctor
   *
   * TODO: Implement this method
   */
  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    // TODO: Implement - filter MOCK_APPOINTMENTS by doctorId
    const AllDoctorAppoinments = MOCK_APPOINTMENTS.filter(
      (app) => app.doctorId === doctorId
    );
    // if (!AllDoctorAppoinments) {
    //   return null;
    // }
    return AllDoctorAppoinments;
  }

  // function to calculate whether the date passed and the appointment date are same day

  /**
   * Get appointments for a specific doctor on a specific date
   *
   * TODO: Implement this method
   * @param doctorId - The doctor's ID
   * @param date - The date to filter by
   * @returns Array of appointments for that doctor on that date
   */

  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    // TODO: Implement - filter by doctor AND date
    // Hint: You'll need to compare dates properly (same day, ignoring time)
    const targetDate = new Date(date);
    const doctorAndDateAppointments = MOCK_APPOINTMENTS.filter(
      (app) =>
        app.doctorId === doctorId &&
        isSameDay(new Date(app.startTime), targetDate)
    );

    return doctorAndDateAppointments;
  }

  /**
   * Get appointments for a specific doctor within a date range (for week view)
   *
   * TODO: Implement this method
   * @param doctorId - The doctor's ID
   * @param startDate - Start of the date range
   * @param endDate - End of the date range
   * @returns Array of appointments within the date range
   */
  getAppointmentsByDoctorAndDateRange(
    doctorId: string,
    startDate: Date,
    endDate: Date
  ): Appointment[] {
    // TODO: Implement - filter by doctor AND date range
    const doctorAndDateRangeAppointments = MOCK_APPOINTMENTS.filter((app) => {
      const start = new Date(app.startTime);
      const end = new Date(app.endTime);

      return app.doctorId === doctorId && start >= startDate && end <= endDate;
    });

    return doctorAndDateRangeAppointments;
  }

  /**
   * Get a populated appointment (with patient and doctor objects)
   *
   * This is useful for display purposes where you need patient/doctor details
   *
   * TODO: Implement this helper method
   */
  getPopulatedAppointment(
    appointment: Appointment
  ): PopulatedAppointment | null {
    // TODO: Implement - merge appointment with patient and doctor data
    // Hint: Use getDoctorById and getPatientById from mockData
    const doctor = getDoctorById(appointment.doctorId);
    const patient = getPatientById(appointment.patientId);

    if (!doctor || !patient) return null;

    const populatedAppointment: PopulatedAppointment = {
      ...appointment,
      patient: patient,
      doctor: doctor,
    };

    return populatedAppointment;
  }

  /**
   * Get all doctors
   *
   * TODO: Implement this method
   */
  getAllDoctors(): Doctor[] {
    // TODO: Implement - return all doctors
    return MOCK_DOCTORS;
    // throw new Error("Not implemented - getAllDoctors");
  }

  /**
   * Get doctor by ID
   *
   * TODO: Implement this method
   */
  getDoctorById(id: string): Doctor | undefined {
    // TODO: Implement - find doctor by ID
    return MOCK_DOCTORS.find((doc) => doc.id === id);
  }

  /**
   * BONUS: Add any other helper methods you think would be useful
   * Examples:
   * - Sort appointments by time
   * - Check for overlapping appointments
   * - Get appointments by type
   * - etc.
   */
}

/**
 * Singleton instance (optional pattern)
 *
 * You can either:
 * 1. Export a singleton instance: export const appointmentService = new AppointmentService();
 * 2. Or let consumers create their own instances: new AppointmentService()
 *
 * Consider which is better for your architecture and testing needs.
 */
export const appointmentService = new AppointmentService();
