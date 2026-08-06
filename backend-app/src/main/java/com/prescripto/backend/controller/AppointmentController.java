package com.prescripto.backend.controller;

import com.prescripto.backend.model.Appointment;
import com.prescripto.backend.repository.AppointmentRepository;
import com.prescripto.backend.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173") 
public class AppointmentController {

    private static final Logger logger = LoggerFactory.getLogger(AppointmentController.class);

    @Autowired
    private AppointmentRepository appointmentRepository;

    // NEW: Inject the EmailService
    @Autowired
    private EmailService emailService;

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        logger.info("BOOKING: Received booking request for patient: {}, email: {}", appointment.getPatientName(), appointment.getPatientEmail());
        
        // Save the appointment to the database
        Appointment savedAppointment = appointmentRepository.save(appointment);
        logger.info("BOOKING: Appointment saved with ID: {}", savedAppointment.getId());
        
        // --- Send Emails ---
        try {
            // Email 1: To the patient
            logger.info("BOOKING: Sending confirmation email to patient: {}", savedAppointment.getPatientEmail());
            String patientSubject = "Your Appointment is Pending";
            String patientBody = "Hello " + savedAppointment.getPatientName() + ",\n\n"
                    + "Your appointment with " + savedAppointment.getDoctorName() + " on "
                    + savedAppointment.getAppointmentDate() + " at " + savedAppointment.getAppointmentTime()
                    + " has been booked and is now PENDING approval.\n\n"
                    + "Thank you for using VitalSync!";
            emailService.sendEmail(savedAppointment.getPatientEmail(), patientSubject, patientBody);

            // Email 2: To the Admin
            String adminSubject = "New Appointment Booked!";
            String adminBody = "A new appointment has been booked:\n\n"
                    + "Patient: " + savedAppointment.getPatientName() + "\n"
                    + "Doctor: " + savedAppointment.getDoctorName() + "\n"
                    + "Date: " + savedAppointment.getAppointmentDate() + "\n"
                    + "Time: " + savedAppointment.getAppointmentTime() + "\n\n"
                    + "Please log in to the admin dashboard to approve or reject it.";
            emailService.sendEmail("admin@app.com", adminSubject, adminBody); // Use your admin email

        } catch (Exception e) {
            logger.error("BOOKING: Error triggering email send: {}", e.getMessage(), e);
        }
        // -------------------------

        return ResponseEntity.ok("Appointment booked successfully!");
    }
}