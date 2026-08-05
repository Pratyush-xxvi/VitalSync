package com.prescripto.backend.repository;

import com.prescripto.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // We don't need any custom methods for now.
    // JpaRepository already gives us save(), findById(), findAll(), delete(), etc.
}
