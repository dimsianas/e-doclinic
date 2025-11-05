package com.sianas.e_doclinic.controllers;

import com.sianas.e_doclinic.dtos.DoctorDto;
import com.sianas.e_doclinic.entities.Appointment;
import com.sianas.e_doclinic.entities.Doctor;
import com.sianas.e_doclinic.dtos.RegisterSpecialtyRequest;
import com.sianas.e_doclinic.dtos.SpecialtyDto;
import com.sianas.e_doclinic.dtos.UpdateSpecialtyRequest;
import com.sianas.e_doclinic.entities.DoctorSchedule;
import com.sianas.e_doclinic.mappers.DoctorMapper;
import com.sianas.e_doclinic.mappers.SpecialtyMapper;
import com.sianas.e_doclinic.repositories.AppointmentRepository;
import com.sianas.e_doclinic.repositories.DoctorRepository;
import com.sianas.e_doclinic.repositories.DoctorScheduleRepository;
import com.sianas.e_doclinic.repositories.SpecialtyRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/specialties")
public class SpecialtyController {

    private SpecialtyRepository specialtyRepository;
    private SpecialtyMapper specialtyMapper;
    private DoctorRepository doctorRepository;
    private DoctorMapper doctorMapper;
    private DoctorScheduleRepository doctorScheduleRepository;
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<SpecialtyDto> getAllSpecialties() {
        return specialtyRepository.findAll()
                .stream()
                .map(specialtyMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpecialtyDto> getSpecialty(
            @PathVariable Long id) {
        var specialty = specialtyRepository.findById(id).orElse(null);
        if (specialty == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(specialtyMapper.toDto(specialty));
    }

    @GetMapping("/{id}/doctors")
    public ResponseEntity<List<DoctorDto>> getDoctorsWithSpecialty(
            @PathVariable Long id) {
        var specialty = specialtyRepository.findById(id).orElse(null);

        List<Doctor> doctors;
        if (specialty == null) {
            return ResponseEntity.notFound().build();
        }
        var specialtyName = specialty.getName();
        doctors = doctorRepository.findBySpecialty(specialtyName);
        return ResponseEntity.ok().body(doctors.stream()
                .map(doctorMapper::toDto)
                .toList());
    }

    @PostMapping
    public ResponseEntity<SpecialtyDto> createSpecialty(
            @RequestBody RegisterSpecialtyRequest request){
        var specialty = specialtyMapper.toEntity((request));
        specialtyRepository.save(specialty);
        return ResponseEntity.status(201).body(specialtyMapper.toDto(specialty));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpecialtyDto> updateSpecialty(
            @PathVariable Long id,
            @RequestBody UpdateSpecialtyRequest request) {
        var specialty = specialtyRepository.findById(id).orElse(null);
        if (specialty == null) {
            return ResponseEntity.notFound().build();
        }
        specialtyMapper.update(request, specialty);
        specialtyRepository.save(specialty);
        return ResponseEntity.ok(specialtyMapper.toDto(specialty));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpecialty(@PathVariable Long id){
        var specialty = specialtyRepository.findById(id).orElse(null);
        if (specialty == null) {
            return ResponseEntity.notFound().build();
        }

        List<Doctor> doctors = doctorRepository.findBySpecialty(specialty.getName());
        for(Doctor doctor:doctors){
            var doctorId = doctor.getId();
            List<DoctorSchedule> doctorSchedules = doctorScheduleRepository.findDoctorSchedulesByDoctorId(doctorId);
            doctorScheduleRepository.deleteAll(doctorSchedules);
            List<Appointment> appointments = appointmentRepository.findAppointmentsByDoctorId(doctorId);
            appointmentRepository.deleteAll(appointments);

        }
        doctorRepository.deleteAll(doctors);
        specialtyRepository.delete(specialty);
        return ResponseEntity.noContent().build();
    }
}
