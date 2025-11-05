package com.sianas.e_doclinic.controllers;

import com.sianas.e_doclinic.dtos.AuthorizationResponse;
import com.sianas.e_doclinic.dtos.LoginRequest;
import com.sianas.e_doclinic.entities.Doctor;
import com.sianas.e_doclinic.entities.Patient;
import com.sianas.e_doclinic.entities.User;
import com.sianas.e_doclinic.repositories.DoctorRepository;
import com.sianas.e_doclinic.repositories.PatientRepository;
import com.sianas.e_doclinic.repositories.UserRepository;
import com.sianas.e_doclinic.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthorizationController {

    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    private DoctorRepository doctorRepository;
    private PatientRepository patientRepository;
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthorizationResponse> login(@RequestBody LoginRequest loginRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            User user = (User) authentication.getPrincipal();
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole(), user.getId());
            Long profileId = null;

            if (user.getRole().equals("DOCTOR")) {
                Doctor doctor = doctorRepository.findByUser(user);
                if (doctor != null) {
                    profileId = doctor.getId();
                }
            } else if (user.getRole().equals("PATIENT")) {
                Patient patient = patientRepository.findByUser(user);
                if (patient != null) {
                    profileId = patient.getId();
                }
            }

            AuthorizationResponse response = new AuthorizationResponse(
                    user.getEmail(),
                    user.getId(),
                    user.getRole(),
                    profileId,
                    token
            );

            return ResponseEntity.ok(response);
        }
        catch (AuthenticationException e) {
                return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/me")
    public ResponseEntity<AuthorizationResponse> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(404).build();
        }

        Long profileId = null;
        if (user.getRole().equals("DOCTOR")) {
            Doctor doctor = doctorRepository.findByUser(user);
            if (doctor != null) {
                profileId = doctor.getId();
            }
        } else if (user.getRole().equals("PATIENT")) {
            Patient patient = patientRepository.findByUser(user);
            if (patient != null) {
                profileId = patient.getId();
            }
        }

        AuthorizationResponse response = new AuthorizationResponse(
                user.getEmail(),
                user.getId(),
                user.getRole(),
                profileId,
                null
        );

        return ResponseEntity.ok(response);
    }
}
