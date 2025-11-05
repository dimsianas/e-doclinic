package com.sianas.e_doclinic.dtos;

import lombok.Data;

import java.time.LocalTime;

@Data
public class RegisterDoctorScheduleRequest {
    private String dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private Long doctorId;
}
