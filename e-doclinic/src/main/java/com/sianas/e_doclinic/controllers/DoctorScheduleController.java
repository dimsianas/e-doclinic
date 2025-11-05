package com.sianas.e_doclinic.controllers;

import com.sianas.e_doclinic.dtos.DoctorScheduleDto;
import com.sianas.e_doclinic.dtos.RegisterDoctorScheduleRequest;
import com.sianas.e_doclinic.dtos.UpdateDoctorScheduleRequest;
import com.sianas.e_doclinic.entities.DoctorSchedule;
import com.sianas.e_doclinic.mappers.DoctorScheduleMapper;
import com.sianas.e_doclinic.repositories.DoctorRepository;
import com.sianas.e_doclinic.repositories.DoctorScheduleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@AllArgsConstructor
@RequestMapping("/doctor-schedules")
public class DoctorScheduleController {

    private DoctorScheduleRepository doctorScheduleRepository;
    private DoctorScheduleMapper doctorScheduleMapper;
    private DoctorRepository doctorRepository;

    @GetMapping
    public List<DoctorScheduleDto> getAllDoctorSchedules(
            @RequestParam (name = "day",required = false) String day) {
        List<DoctorSchedule> schedules;
        schedules = (day != null)
            ? doctorScheduleRepository.findByDayOfWeek(day)
            : doctorScheduleRepository.findAll();

        return schedules.stream()
                .map(doctorScheduleMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorScheduleDto> getDoctorSchedule(
            @PathVariable Long id) {
        var schedule = doctorScheduleRepository.findById(id).orElse(null);
        if (schedule == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(doctorScheduleMapper.toDto(schedule));
    }

    @PostMapping
    public ResponseEntity<DoctorScheduleDto> createDoctorSchedule(
            @RequestBody RegisterDoctorScheduleRequest request) {
        var schedule = doctorScheduleMapper.toEntity(request);
        var doctor = doctorRepository.findById(request.getDoctorId()).orElse(null);
        schedule.setDoctor(doctor);
        doctorScheduleRepository.save(schedule);
        return ResponseEntity.status(201).body(doctorScheduleMapper.toDto(schedule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorScheduleDto> updateDoctorSchedule(
            @PathVariable Long id,
            @RequestBody UpdateDoctorScheduleRequest request){
        var schedule = doctorScheduleRepository.findById(id).orElse(null);
        if (schedule == null) {
            return ResponseEntity.notFound().build();
        }
        var doctor = doctorRepository.findById(request.getDoctorId()).orElse(null);
        doctorScheduleMapper.update(request, schedule);
        schedule.setDoctor(doctor);
        doctorScheduleRepository.save(schedule);
        return ResponseEntity.ok(doctorScheduleMapper.toDto(schedule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctorSchedule(@PathVariable Long id) {
        var schedule = doctorScheduleRepository.findById(id).orElse(null);
        if (schedule == null) {
            return ResponseEntity.notFound().build();
        }
        doctorScheduleRepository.delete(schedule);
        return ResponseEntity.noContent().build();
    }

}
