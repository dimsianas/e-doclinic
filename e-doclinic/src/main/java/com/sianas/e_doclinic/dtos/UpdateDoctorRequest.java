package com.sianas.e_doclinic.dtos;

import lombok.Data;

@Data
public class UpdateDoctorRequest {
    private String fullName;
    private String phoneNumber;
    private String bio;
    private Double consultationFee;

}
