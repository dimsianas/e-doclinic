package com.sianas.e_doclinic.repositories;

import com.sianas.e_doclinic.entities.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void UserRepository_SaveUser(){

        User newUser = User.builder()
                .email("dsianas@gmail.com")
                .password("1998")
                .role("PATIENT").build();

        User savedUser = userRepository.save(newUser);
        Assertions.assertThat(savedUser.getEmail()).isEqualTo("dsianas@gmail.com");
        Assertions.assertThat(savedUser.getRole()).isEqualTo("PATIENT");

    }

    @Test
    public void UserRepository_GetAllUsers(){

        User newUser1 = User.builder()
                .email("dsianas@gmail.com")
                .password("1998")
                .role("PATIENT").build();

        User newUser2 = User.builder()
                .email("npanos@gmail.com")
                .password("1234")
                .role("DOCTOR").build();

        userRepository.save(newUser1);
        userRepository.save(newUser2);

        List<User> usersList = userRepository.findAll();

        Assertions.assertThat(usersList.size()).isEqualTo(2);

    }

    @Test
    public void UserRepository_FindUserById(){

        User newUser = User.builder()
                .email("dsianas@gmail.com")
                .password("1998")
                .role("PATIENT").build();

        userRepository.save(newUser);
        User savedUser = userRepository.findById(newUser.getId()).get();
        Assertions.assertThat(savedUser).isNotNull();

    }
}
