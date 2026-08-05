package com.prescripto.backend.controller;

import com.prescripto.backend.dto.RescheduleRequest;
import com.prescripto.backend.model.Appointment;
import com.prescripto.backend.model.EStatus;
import com.prescripto.backend.repository.AppointmentRepository;
import com.prescripto.backend.service.EmailService; // NEW: Import EmailService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    AppointmentRepository appointmentRepository;

    // NEW: Inject the EmailService
    @Autowired
    private EmailService emailService;

    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(appointments);
    }

    @PatchMapping("/appointments/{id}/approve")
    public ResponseEntity<?> approveAppointment(@PathVariable Long id) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        if (appointmentOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Appointment not found.");
        }

        Appointment appointment = appointmentOptional.get();
        appointment.setStatus(EStatus.APPROVED);
        appointmentRepository.save(appointment);

        // --- NEW: Send Approval Email ---
        String subject = "Your Appointment is Approved!";
        String body = "Hello " + appointment.getPatientName() + ",\n\n"
                + "Your appointment with " + appointment.getDoctorName() + " on "
                + appointment.getAppointmentDate() + " at " + appointment.getAppointmentTime()
                + " has been APPROVED.\n\nWe look forward to seeing you!";
        emailService.sendEmail(appointment.getPatientEmail(), subject, body);
        // ---------------------------------

        return ResponseEntity.ok("Appointment Approved.");
    }

    @PatchMapping("/appointments/{id}/reject")
    public ResponseEntity<?> rejectAppointment(@PathVariable Long id) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        if (appointmentOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Appointment not found.");
        }

        Appointment appointment = appointmentOptional.get();
        appointment.setStatus(EStatus.REJECTED);
        appointmentRepository.save(appointment);

        // --- NEW: Send Rejection Email ---
        String subject = "Your Appointment Status";
        String body = "Hello " + appointment.getPatientName() + ",\n\n"
                + "We regret to inform you that your appointment with " + appointment.getDoctorName() + " on "
                + appointment.getAppointmentDate() + " has been REJECTED.\n\n"
                + "Please contact us for more information or to book a new time.";
        emailService.sendEmail(appointment.getPatientEmail(), subject, body);
        // ---------------------------------

        return ResponseEntity.ok("Appointment Rejected.");
    }

    @PatchMapping("/appointments/{id}/reschedule")
    public ResponseEntity<?> rescheduleAppointment(@PathVariable Long id, @RequestBody RescheduleRequest rescheduleRequest) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(id);
        if (appointmentOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Appointment not found.");
        }

        Appointment appointment = appointmentOptional.get();
        appointment.setAppointmentDate(rescheduleRequest.getNewDate());
        appointment.setAppointmentTime(rescheduleRequest.getNewTime());
        appointment.setStatus(EStatus.APPROVED);
        appointmentRepository.save(appointment);

        // --- NEW: Send Reschedule Email ---
        String subject = "Your Appointment Has Been Rescheduled";
        String body = "Hello " + appointment.getPatientName() + ",\n\n"
                + "Your appointment with " + appointment.getDoctorName() + " has been rescheduled by the admin.\n\n"
                + "Your NEW appointment time is: " + appointment.getAppointmentDate() + " at " + appointment.getAppointmentTime() + "\n"
                + "This new appointment is confirmed.";
        emailService.sendEmail(appointment.getPatientEmail(), subject, body);
        // ---------------------------------

        return ResponseEntity.ok("Appointment Rescheduled.");
    }
}