package com.sianas.e_doclinic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import java.time.LocalDate;

@AllArgsConstructor
@Getter
@Data
public class PatientDto {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private UserDto user;
}
