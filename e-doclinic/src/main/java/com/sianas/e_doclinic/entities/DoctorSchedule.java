package com.sianas.e_doclinic.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "doctor_schedules")
public class DoctorSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "doctor_id",nullable = false)
    private Doctor doctor;

}
