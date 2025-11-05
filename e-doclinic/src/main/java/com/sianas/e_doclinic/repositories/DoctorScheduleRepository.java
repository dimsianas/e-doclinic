package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.DoctorSchedule;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule,Long> {

    @EntityGraph(attributePaths = "dayOfWeek")
    List<DoctorSchedule> findByDayOfWeek(String day);

    @EntityGraph(attributePaths = "doctor")
    List<DoctorSchedule> findByDoctorId(Long doctorId);

    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId")
    List<DoctorSchedule> findDoctorSchedulesByDoctorId(@Param("doctorId") Long doctorId);

    @Query("SELECT ds FROM DoctorSchedule ds WHERE ds.doctor.id = :doctorId AND ds.dayOfWeek = :dayOfWeek")
    List<DoctorSchedule> findDoctorSchedulesByDoctorIdAndDay(@Param("doctorId") Long doctorId,
                                                             @Param("dayOfWeek") String day);
}
