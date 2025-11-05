package com.sianas.e_doclinic.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthorizationResponse {
    private String email;
    private Long userId;
    private String role;
    private Long profileId;
    private String token;
}
