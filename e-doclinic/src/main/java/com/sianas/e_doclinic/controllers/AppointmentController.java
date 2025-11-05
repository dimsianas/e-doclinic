package com.sianas.e_doclinic.controllers;

import com.sianas.e_doclinic.dtos.AppointmentDto;
import com.sianas.e_doclinic.dtos.RegisterAppointmentRequest;
import com.sianas.e_doclinic.dtos.UpdateAppointmentRequest;
import com.sianas.e_doclinic.entities.Appointment;
import com.sianas.e_doclinic.mappers.AppointmentMapper;
import com.sianas.e_doclinic.repositories.AppointmentRepository;
import com.sianas.e_doclinic.repositories.DoctorRepository;
import com.sianas.e_doclinic.repositories.PatientRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/appointments")
public class AppointmentController {

    private AppointmentRepository appointmentRepository;
    private AppointmentMapper appointmentMapper;
    private DoctorRepository doctorRepository;
    private PatientRepository patientRepository;

    @GetMapping
    public List<AppointmentDto> getAllAppointments(
//            @RequestParam(name = "doctorId", required = false) Long doctorId,
//            @RequestParam(name = "patientId", required = false) Long patientId,
            @RequestParam(name = "date", required = false) LocalDate date){
        List<Appointment> appointments;
//        if (doctorId != null) {
//            appointments = (date != null)
//                    ? appointmentRepository.findByDoctorIdAndScheduledDate(doctorId, date)
//                    : appointmentRepository.findByDoctorId(doctorId);
//        }
//        else if (patientId != null) {
//            appointments = (date != null)
//                    ? appointmentRepository.findByPatientIdAndScheduledDate(patientId, date)
//                    : appointmentRepository.findByPatientId(patientId);
//        }

        appointments = (date != null)
                    ? appointmentRepository.findByScheduledDate(date)
                    : appointmentRepository.findAll();

        return appointments.stream()
                .map(appointmentMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointment(
            @PathVariable Long id){
        var appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(appointmentMapper.toDto(appointment));
    }

    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(
            @RequestBody RegisterAppointmentRequest request){
        var appointment = appointmentMapper.toEntity((request));
        var doctor = doctorRepository.findById(request.getDoctorId()).orElse(null);
        if (doctor == null){
            return ResponseEntity.badRequest().build();
        }
        var patient = patientRepository.findById(request.getPatientId()).orElse(null);
        if (patient == null){
            return ResponseEntity.badRequest().build();
        }
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointmentRepository.save(appointment);
        return ResponseEntity.status(201).body(appointmentMapper.toDto(appointment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDto> updateAppointment(
            @PathVariable Long id,
            @RequestBody UpdateAppointmentRequest request){
        var appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment == null){
            return ResponseEntity.notFound().build();
        }
        var doctor = doctorRepository.findById(request.getDoctorId()).orElse(null);
        if (doctor == null){
            return ResponseEntity.badRequest().build();
        }
        var patient = patientRepository.findById(request.getPatientId()).orElse(null);
        if (patient == null){
            return ResponseEntity.badRequest().build();
        }
        appointmentMapper.update(request, appointment);
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setScheduledDate(request.getScheduledDate());
        appointment.setScheduledTime(request.getScheduledTime());
        appointmentRepository.save(appointment);
        return ResponseEntity.ok(appointmentMapper.toDto(appointment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(
            @PathVariable Long id) {
        var appointment = appointmentRepository.findById(id).orElse(null);
        if (appointment == null) {
            return ResponseEntity.notFound().build();
        }
        appointmentRepository.delete(appointment);
        return ResponseEntity.noContent().build();
    }
}
