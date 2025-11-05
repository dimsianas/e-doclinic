package com.sianas.e_doclinic.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterPatientRequest {
    private String fullName;
    private String email;
    private String password;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
}
