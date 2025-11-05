package com.sianas.e_doclinic.controllers;

import com.sianas.e_doclinic.dtos.DoctorDto;
import com.sianas.e_doclinic.dtos.PatientDto;
import com.sianas.e_doclinic.dtos.RegisterDoctorRequest;
import com.sianas.e_doclinic.dtos.RegisterPatientRequest;
import com.sianas.e_doclinic.entities.User;
import com.sianas.e_doclinic.mappers.DoctorMapper;
import com.sianas.e_doclinic.mappers.PatientMapper;
import com.sianas.e_doclinic.repositories.DoctorRepository;
import com.sianas.e_doclinic.repositories.PatientRepository;
import com.sianas.e_doclinic.repositories.SpecialtyRepository;
import com.sianas.e_doclinic.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    private UserRepository userRepository;
    private SpecialtyRepository specialtyRepository;
    private DoctorRepository doctorRepository;
    private DoctorMapper doctorMapper;
    private PatientRepository patientRepository;
    private PatientMapper patientMapper;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register/doctor")
    public ResponseEntity<DoctorDto> createDoctor(
            @RequestBody RegisterDoctorRequest request){
        var specialty = specialtyRepository.findById(request.getSpecialtyId()).orElse(null);
        if (specialty == null){
            return ResponseEntity.badRequest().build();
        }

        if(userRepository.findByEmail(request.getEmail()) != null){
            ResponseEntity.badRequest().build();
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        user.setRole("DOCTOR");
        userRepository.save(user);

        var doctor = doctorMapper.toEntity(request,user);
        doctor.setSpecialty(specialty);
        doctor.setUser(user);
        doctorRepository.save(doctor);
        return ResponseEntity.status(201).body(doctorMapper.toDto(doctor));
    }

    @PostMapping("/register/patient")
    public ResponseEntity<PatientDto> createPatient(
            @RequestBody RegisterPatientRequest request){

        if(userRepository.findByEmail(request.getEmail()) != null){
            ResponseEntity.badRequest().build();
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        user.setRole("PATIENT");
        userRepository.save(user);

        var patient = patientMapper.toEntity(request,user);
        patient.setUser(user);
        patientRepository.save(patient);
        return ResponseEntity.status(201).body(patientMapper.toDto(patient));
    }
}