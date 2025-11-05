package com.sianas.e_doclinic.dtos;

import lombok.Data;

@Data
public class RegisterDoctorRequest {
    private String fullName;
    private String email;
    private String password;
    private String phoneNumber;
    private String bio;
    private String licenseNumber;
    private Double consultationFee;
    private Long specialtyId;
}
