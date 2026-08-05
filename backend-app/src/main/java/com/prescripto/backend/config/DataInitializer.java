package com.prescripto.backend.config;

import com.prescripto.backend.model.ERole;
import com.prescripto.backend.model.Role;
import com.prescripto.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if ROLE_USER exists, if not, create it.
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            Role userRole = new Role(ERole.ROLE_USER);
            roleRepository.save(userRole);
            System.out.println("Added ROLE_USER to database.");
        }

        // Check if ROLE_ADMIN exists, if not, create it.
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            Role adminRole = new Role(ERole.ROLE_ADMIN);
            roleRepository.save(adminRole);
            System.out.println("Added ROLE_ADMIN to database.");
        }
    }
}
