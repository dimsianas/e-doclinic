package com.sianas.e_doclinic.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class RegisterAppointmentRequest {
    private LocalDate scheduledDate;
    private LocalTime scheduledTime;
    private Long doctorId;
    private Long patientId;
}
