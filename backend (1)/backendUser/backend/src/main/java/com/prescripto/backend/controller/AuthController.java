package com.prescripto.backend.controller;

import com.prescripto.backend.dto.JwtResponse;
import com.prescripto.backend.dto.LoginRequest;
import com.prescripto.backend.dto.SignUpRequest;
import com.prescripto.backend.model.User;
import com.prescripto.backend.repository.UserRepository;
import com.prescripto.backend.security.jwt.JwtUtils;
import com.prescripto.backend.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600) // Allows React to connect
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        // This line checks the user's email and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        // If successful, it sets the user in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // It generates the JWT token
        String jwt = jwtUtils.generateJwtToken(authentication);

        // It gets the user's details
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // It sends the token back to React
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getName(), // Send name
                userDetails.getEmail()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        
        // Check if the email is already taken
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())); // Always hash the password!

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
