package com.prescripto.backend.controller;

import com.prescripto.backend.model.Appointment;
import com.prescripto.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/appointments")
// This is VERY important. It allows your React frontend (on port 5173)
// to call your backend (on port 8080).
@CrossOrigin(origins = "http://localhost:5173") 
public class AppointmentController {

    // 1. We ask Spring to give us the repository we made
    @Autowired
    private AppointmentRepository appointmentRepository;

    // 2. We create the API endpoint that your BookingForm.jsx will call
    // It's a POST request to /api/appointments/book
    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        
        // 3. We take the appointment data from the React form
        //    (Spring automatically converts the JSON to our Java object)
        //    and we save it to the database.
        appointmentRepository.save(appointment);
        
        // 4. We send back a simple "OK" message to the frontend.
        return ResponseEntity.ok("Appointment booked successfully!");
    }
}
