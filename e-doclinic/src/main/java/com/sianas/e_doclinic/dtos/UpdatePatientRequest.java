package com.sianas.e_doclinic.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdatePatientRequest {
    private String fullName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;

}
