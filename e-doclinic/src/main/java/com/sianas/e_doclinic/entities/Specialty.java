package com.sianas.e_doclinic.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "specialties")
public class Specialty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "name", unique = true)
    private String name;

}
