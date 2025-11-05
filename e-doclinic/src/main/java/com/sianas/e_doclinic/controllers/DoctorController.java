package com.sianas.e_doclinic.controllers;

import com.sianas.e_doclinic.dtos.*;
import com.sianas.e_doclinic.entities.Appointment;
import com.sianas.e_doclinic.entities.Doctor;
import com.sianas.e_doclinic.entities.DoctorSchedule;
import com.sianas.e_doclinic.mappers.AppointmentMapper;
import com.sianas.e_doclinic.mappers.DoctorMapper;
import com.sianas.e_doclinic.mappers.DoctorScheduleMapper;
import com.sianas.e_doclinic.repositories.AppointmentRepository;
import com.sianas.e_doclinic.repositories.DoctorRepository;
import com.sianas.e_doclinic.repositories.DoctorScheduleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/doctors")
public class DoctorController {

    private DoctorRepository doctorRepository;
    private DoctorMapper doctorMapper;
    private DoctorScheduleRepository doctorScheduleRepository;
    private DoctorScheduleMapper doctorScheduleMapper;
    private AppointmentRepository appointmentRepository;
    private AppointmentMapper appointmentMapper;

    @GetMapping
    public List<DoctorDto> getAllDoctors(
            @RequestParam(name = "specialty",required = false) String specialty){
        List<Doctor> doctors;
        doctors = (specialty != null)
                ? doctorRepository.findBySpecialty(specialty)
                : doctorRepository.findAll();

        return doctors.stream()
                .map(doctorMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDto> getDoctor(
            @PathVariable Long id){
        var doctor = doctorRepository.findById(id).orElse(null);
        if (doctor == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(doctorMapper.toDto((doctor)));
    }

    @GetMapping("/{id}/doctor-schedules")
    public ResponseEntity<List<DoctorScheduleDto>> getDoctorSchedulesOfDoctor(
            @PathVariable Long id,
            @RequestParam(name = "day",required = false) String day){
        var doctor = doctorRepository.findById(id).orElse(null);
        if (doctor == null){
            return ResponseEntity.notFound().build();
        }
        var schedules = (day != null)
                ? doctorScheduleRepository.findDoctorSchedulesByDoctorIdAndDay(id,day)
                : doctorScheduleRepository.findDoctorSchedulesByDoctorId(id);

        return ResponseEntity.ok(schedules.stream()
                .map(doctorScheduleMapper::toDto).toList());
    }

    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsOfDoctor(
            @PathVariable Long id,
            @RequestParam(name = "date",required = false) LocalDate date){
        var doctor = doctorRepository.findById(id).orElse(null);
        if (doctor == null){
            return ResponseEntity.notFound().build();
        }
        var appointments = (date!=null)
                ? appointmentRepository.findAppointmentsByDoctorIdAndDate(id,date)
                : appointmentRepository.findAppointmentsByDoctorId(id);
        return ResponseEntity.ok(appointments.stream()
                .map(appointmentMapper::toDto).toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorDto> updateDoctor(
            @PathVariable Long id,
            @RequestBody UpdateDoctorRequest request){

        var doctor = doctorRepository.findById(id).orElse(null);
        if (doctor == null){
            return ResponseEntity.badRequest().build();
        }
        doctorMapper.update(request,doctor);
        doctorRepository.save(doctor);
        return ResponseEntity.ok(doctorMapper.toDto(doctor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(
            @PathVariable Long id){
        var doctor = doctorRepository.findById(id).orElse(null);;
        if (doctor == null){
            return ResponseEntity.notFound().build();
        }
        List<DoctorSchedule> doctorSchedules = doctorScheduleRepository.findDoctorSchedulesByDoctorId(id);
        doctorScheduleRepository.deleteAll(doctorSchedules);

        List<Appointment> appointments = appointmentRepository.findAppointmentsByDoctorId(id);
        appointmentRepository.deleteAll(appointments);

        doctorRepository.delete(doctor);
        return ResponseEntity.noContent().build();
    }

}