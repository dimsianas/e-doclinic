package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.Doctor;
import com.sianas.e_doclinic.entities.DoctorSchedule;
import com.sianas.e_doclinic.entities.Specialty;
import com.sianas.e_doclinic.entities.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalTime;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class DoctorScheduleRepositoryTest {

    @Autowired
    private DoctorScheduleRepository doctorScheduleRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Test
    public void DoctorScheduleRepository_SaveDoctorSchedule(){

        Specialty newSpecialty = Specialty.builder()
                .code("U")
                .name("Urology").build();

        specialtyRepository.save(newSpecialty);

        User newUser = User.builder()
                .email("npanos@gmail.com")
                .password("1234")
                .role("DOCTOR").build();

        userRepository.save(newUser);

        Doctor newDoctor = Doctor.builder()
                .fullName("Nikolaos Panos")
                .phoneNumber("6978980989")
                .bio("Born in Ioannina")
                .licenseNumber("432784732")
                .consultationFee(30.0)
                .user(newUser)
                .specialty(newSpecialty).build();

        doctorRepository.save(newDoctor);

        DoctorSchedule newSchedule = DoctorSchedule.builder()
                .doctor(newDoctor)
                .dayOfWeek("Friday")
                .startTime(LocalTime.of(10,30))
                .endTime(LocalTime.of(18,30)).build();

        doctorScheduleRepository.save(newSchedule);

        DoctorSchedule savedSchedule = doctorScheduleRepository.findById(newSchedule.getId()).get();
        Assertions.assertThat(savedSchedule.getId()).isNotNull();
        Assertions.assertThat(savedSchedule.getDayOfWeek()).isEqualTo("Friday");

    }
}
