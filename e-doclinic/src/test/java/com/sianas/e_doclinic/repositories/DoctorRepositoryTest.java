package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.Doctor;
import com.sianas.e_doclinic.entities.Specialty;
import com.sianas.e_doclinic.entities.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class DoctorRepositoryTest {

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Test
    public void DoctorRepository_DoctorLinksUserAndSpecialty(){

        Specialty newSpecialty1 = Specialty.builder()
                .code("ORT")
                .name("Orthopedics").build();


        Specialty newSpecialty2 = Specialty.builder()
                .code("U")
                .name("Urology").build();

        specialtyRepository.save(newSpecialty1);
        specialtyRepository.save(newSpecialty2);

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
                .specialty(newSpecialty1).build();

        doctorRepository.save(newDoctor);

        Doctor savedDoctor = doctorRepository.findById(newDoctor.getId()).get();
        Assertions.assertThat(savedDoctor.getUser().getId()).isEqualTo(newUser.getId());
        Assertions.assertThat(savedDoctor.getSpecialty().getId()).isEqualTo(newSpecialty1.getId());
    }

    @Test
    public void DoctorRepository_UpdateDoctor(){

        Specialty newSpecialty = Specialty.builder()
                .code("ORT")
                .name("Orthopedics").build();

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
        newDoctor.setFullName("Giorgos Panos");
        doctorRepository.save(newDoctor);

        Doctor savedDoctor = doctorRepository.findById(newDoctor.getId()).get();
        Assertions.assertThat(savedDoctor.getFullName()).isEqualTo(newDoctor.getFullName());
        //Assertions.assertThat(savedDoctor.getFullName()).isEqualTo("Nikolaos Panos");

    }
}
