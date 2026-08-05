package com.prescripto.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String doctorName;
    private String patientName;
    private String patientEmail;
    private String gender;
    private String address;
    private String appointmentDate;
    private String appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EStatus status;

    // This is a constructor that runs when a new appointment is made
    public Appointment() {
        this.status = EStatus.PENDING; // Set default status to PENDING
    }
}

