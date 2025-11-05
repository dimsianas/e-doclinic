package com.sianas.e_doclinic.dtos;

import lombok.*;

import java.time.LocalTime;

@AllArgsConstructor
@Getter
@Data
public class DoctorScheduleDto {
    private Long id;
    private String dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
    private DoctorDto doctor;
}
