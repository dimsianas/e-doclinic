package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.Appointment;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    @EntityGraph(attributePaths = "scheduledDate")
    List<Appointment> findByScheduledDate(LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId")
    List<Appointment> findAppointmentsByDoctorId(@Param("doctorId") Long doctorId);

    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.scheduledDate = :scheduledDate")
    List<Appointment> findAppointmentsByDoctorIdAndDate(@Param("doctorId") Long doctorId,
                                                        @Param("scheduledDate") LocalDate date);

//    @EntityGraph(attributePaths = "doctor")
//    List<Appointment> findByDoctorId(Long doctorId);
//
//    @EntityGraph(attributePaths = "patient")
//    List<Appointment> findByPatientId(Long patientId);

//    @EntityGraph(attributePaths = {"doctor","scheduledDate"})
//    List<Appointment> findByDoctorIdAndScheduledDate(Long doctorId,LocalDate date);
//
//    @EntityGraph(attributePaths = {"patient","scheduledDate"})
//    List<Appointment> findByPatientIdAndScheduledDate(Long patientId,LocalDate date);
}
