package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.Doctor;
import com.sianas.e_doclinic.entities.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @EntityGraph(attributePaths = "specialty")
    @Query("SELECT d FROM Doctor d WHERE (:specialty IS NULL OR d.specialty.name = :specialty)")
    List<Doctor> findBySpecialty(@Param("specialty") String specialty);

    Doctor findByUser(User user);

//    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId")
//    List<DoctorSchedule> findDoctorSchedulesByDoctorId(@Param("doctorId") Long doctorId);
//
//    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId AND ds.dayOfWeek = :dayOfWeek")
//    List<DoctorSchedule> findDoctorSchedulesByDoctorIdAndDay(@Param("doctorId") Long doctorId,
//                                                             @Param("dayOfWeek") String day);

//    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId")
//    List<Appointment> findAppointmentsByDoctorId(@Param("doctorId") Long doctorId);
//
//    @Query("SELECT a FROM Appointment a WHERE a.doctor.id = :doctorId AND a.scheduledDate = :scheduledDate")
//    List<Appointment> findAppointmentsByDoctorIdAndDate(@Param("doctorId") Long doctorId,
//                                                          @Param("scheduledDate") LocalDate date);
}
