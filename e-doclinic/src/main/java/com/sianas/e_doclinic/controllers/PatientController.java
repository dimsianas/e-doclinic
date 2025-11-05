package com.sianas.e_doclinic.controllers;

import com.sianas.e_doclinic.dtos.AppointmentDto;
import com.sianas.e_doclinic.dtos.PatientDto;
import com.sianas.e_doclinic.dtos.UpdatePatientRequest;
import com.sianas.e_doclinic.entities.Appointment;
import com.sianas.e_doclinic.mappers.AppointmentMapper;
import com.sianas.e_doclinic.mappers.PatientMapper;
import com.sianas.e_doclinic.repositories.AppointmentRepository;
import com.sianas.e_doclinic.repositories.PatientRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/patients")
public class PatientController {

    private PatientRepository patientRepository;
    private PatientMapper patientMapper;
    private AppointmentMapper appointmentMapper;
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<PatientDto> getAllPatients(){
        return patientRepository.findAll()
                .stream()
                .map(patientMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDto> getPatient(
            @PathVariable Long id){
        var patient = patientRepository.findById(id).orElse(null);
        if (patient == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(patientMapper.toDto(patient));
    }

    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<AppointmentDto>> getPatientAppointments(
            @PathVariable Long id,
            @RequestParam (name = "date", required = false) LocalDate date){
        var patient = patientRepository.findById((id)).orElse(null);
        if (patient == null){
            return ResponseEntity.notFound().build();
        }
        var appointments = (date != null)
                ? patientRepository.findAppointmentsByPatientIdAndDate(id,date)
                : patientRepository.findAppointmentsByPatientId(id);
        return ResponseEntity.ok(appointments.stream()
                .map(appointmentMapper::toDto).toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDto> updatePatient(
            @PathVariable Long id,
            @RequestBody UpdatePatientRequest request){
        var patient = patientRepository.findById(id).orElse(null);
        if (patient == null){
            return ResponseEntity.notFound().build();
        }
        patientMapper.update(request,patient);
        patientRepository.save(patient);
        return ResponseEntity.ok().body(patientMapper.toDto(patient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(
            @PathVariable Long id){
        var patient = patientRepository.findById(id).orElse(null);
        if (patient == null){
            return ResponseEntity.notFound().build();
        }
        List<Appointment> appointments = patientRepository.findAppointmentsByPatientId(id);
        appointmentRepository.deleteAll(appointments);

        patientRepository.delete(patient);
        return ResponseEntity.noContent().build();
    }
}