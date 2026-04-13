package com.prescripto.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "appointments")
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String doctorName;

    @NotBlank
    private String patientName;

    @NotBlank
    private String patientEmail;

    private String gender;
    
    private String address;

    @NotBlank
    private String appointmentDate;

    @NotBlank
    private String appointmentTime;
}

