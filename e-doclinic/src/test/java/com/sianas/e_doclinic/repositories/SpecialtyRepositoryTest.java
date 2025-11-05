package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.Specialty;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class SpecialtyRepositoryTest {

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Test
    public void SpecialtyRepository_SaveSpecialty(){

        Specialty newSpecialty = Specialty.builder()
                .code("ORT")
                .name("Orthopedics").build();

        Specialty savedSpecialty = specialtyRepository.save(newSpecialty);

        Assertions.assertThat(savedSpecialty.getName()).isEqualTo("Orthopedics");
        Assertions.assertThat(savedSpecialty.getCode()).isEqualTo("ORT");

    }

    @Test
    public void SpecialtyRepository_GetAllSpecialties(){

        Specialty newSpecialty1 = Specialty.builder()
                .code("ORT")
                .name("Orthopedics").build();

        Specialty newSpecialty2 = Specialty.builder()
                .code("OPH")
                .name("Ophthalmology").build();

        specialtyRepository.save(newSpecialty1);
        specialtyRepository.save(newSpecialty2);

        List<Specialty> specialtiesList = specialtyRepository.findAll();
        Assertions.assertThat(specialtiesList.size()).isEqualTo(2);

    }

    @Test
    public void SpecialtyRepository_FindSpecialtyById(){

        Specialty newSpecialty = Specialty.builder()
                .code("ORT")
                .name("Orthopedics").build();

        specialtyRepository.save(newSpecialty);

        Specialty savedSpecialty = specialtyRepository.findById(newSpecialty.getId()).get();
        Assertions.assertThat(savedSpecialty).isNotNull();

    }
}
