package com.prescripto.backend.repository;

import com.prescripto.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // This is a custom method that Spring Data JPA will
    // automatically implement for us. We need it for logging in.
    Optional<User> findByEmail(String email);
    
    // We also need this to check if an email is already taken.
    Boolean existsByEmail(String email);
}
