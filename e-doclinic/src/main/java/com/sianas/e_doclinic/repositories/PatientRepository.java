package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.Appointment;
import com.sianas.e_doclinic.entities.Patient;
import com.sianas.e_doclinic.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient,Long> {

    Patient findByUser(User user);

    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId")
    List<Appointment> findAppointmentsByPatientId(@Param("patientId") Long patientId);

    @Query("SELECT a FROM Appointment a WHERE a.patient.id = :patientId AND a.scheduledDate = :scheduledDate")
    List<Appointment> findAppointmentsByPatientIdAndDate(@Param("patientId") Long patientId,
                                                        @Param("scheduledDate") LocalDate date);
}
