package com.sianas.e_doclinic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@Getter
@Data
public class AppointmentDto {
    private Long id;
    private LocalDate scheduledDate;
    private LocalTime scheduledTime;
    private DoctorDto doctor;
    private PatientDto patient;
}
