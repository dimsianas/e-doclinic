package com.sianas.e_doclinic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Data
public class DoctorDto {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String bio;
    private String licenseNumber;
    private Double consultationFee;
    private UserDto user;
    private SpecialtyDto specialty;
}
