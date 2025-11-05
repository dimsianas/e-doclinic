package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalTime;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class AppointmentRepositoryTest {

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    public PatientRepository patientRepository;

    @Test
    public void AppointmentRepository_SaveAppointment(){

        Specialty newSpecialty = Specialty.builder()
                .code("U")
                .name("Urology").build();

        specialtyRepository.save(newSpecialty);

        User newUser1 = User.builder()
                .email("npanos@gmail.com")
                .password("1234")
                .role("DOCTOR").build();

        userRepository.save(newUser1);

        User newUser2 = User.builder()
                .email("npappas@gmail.com")
                .password("1234")
                .role("PATIENT").build();

        userRepository.save(newUser2);

        Doctor newDoctor = Doctor.builder()
                .fullName("Nikolaos Panos")
                .phoneNumber("6978980989")
                .bio("Born in Ioannina")
                .licenseNumber("432784732")
                .consultationFee(30.0)
                .user(newUser1)
                .specialty(newSpecialty).build();

        doctorRepository.save(newDoctor);

        Patient newPatient = Patient.builder()
                .fullName("Nikos Pappas")
                .phoneNumber("6978654323")
                .address("Makrugianni 10")
                .dateOfBirth(LocalDate.of(1995, 3, 18))
                .user(newUser2).build();

        patientRepository.save(newPatient);

        Appointment newAppointment = Appointment.builder()
                .doctor(newDoctor)
                .patient(newPatient)
                .scheduledDate(LocalDate.of(2025, 12, 18))
                .scheduledTime(LocalTime.of(10,30)).build();

        appointmentRepository.save(newAppointment);

        Appointment savedDoctorAppointment = appointmentRepository.findById(newAppointment.getId()).get();
        Assertions.assertThat(savedDoctorAppointment.getId()).isNotNull();
        //Assertions.assertThat(savedDoctorAppointment.getDoctor().getFullName()).isEqualTo("Nikolaos Pappas");

    }
}
