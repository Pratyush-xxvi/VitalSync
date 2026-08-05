package com.prescripto.backend.config;

import com.prescripto.backend.model.ERole;
import com.prescripto.backend.model.Role;
import com.prescripto.backend.model.User;
import com.prescripto.backend.repository.RoleRepository;
import com.prescripto.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        // Ensure ROLE_USER exists
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_USER)));

        // Ensure ROLE_ADMIN exists
        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_ADMIN)));

        // Seed default Admin user if admin@app.com doesn't exist yet
        if (!userRepository.existsByEmail("admin@app.com")) {
            User admin = new User("System Admin", "admin@app.com", encoder.encode("admin123"));
            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);
            roles.add(userRole);
            admin.setRoles(roles);
            userRepository.save(admin);
            System.out.println("Default Admin user (admin@app.com) created successfully.");
        }
    }
}
