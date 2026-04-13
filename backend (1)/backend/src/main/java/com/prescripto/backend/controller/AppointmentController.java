package com.prescripto.backend.controller;

import com.prescripto.backend.model.Appointment;
import com.prescripto.backend.repository.AppointmentRepository;
import com.prescripto.backend.service.EmailService; // NEW: Import EmailService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173") 
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // NEW: Inject the EmailService
    @Autowired
    private EmailService emailService;

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        
        // Save the appointment to the database
        Appointment savedAppointment = appointmentRepository.save(appointment);
        
        // --- NEW: Send Emails ---
        try {
            // Email 1: To the patient
            String patientSubject = "Your Appointment is Pending";
            String patientBody = "Hello " + savedAppointment.getPatientName() + ",\n\n"
                    + "Your appointment with " + savedAppointment.getDoctorName() + " on "
                    + savedAppointment.getAppointmentDate() + " at " + savedAppointment.getAppointmentTime()
                    + " has been booked and is now PENDING approval.\n\n"
                    + "Thank you for using Prescripto!";
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
            // Log the email error but don't fail the API call
            System.out.println("Error sending appointment emails: " + e.getMessage());
        }
        // -------------------------

        return ResponseEntity.ok("Appointment booked successfully!");
    }
}