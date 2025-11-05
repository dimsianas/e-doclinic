package com.sianas.e_doclinic.mappers;

import com.sianas.e_doclinic.dtos.DoctorDto;
import com.sianas.e_doclinic.dtos.RegisterDoctorRequest;
import com.sianas.e_doclinic.dtos.UpdateDoctorRequest;
import com.sianas.e_doclinic.entities.Doctor;
import com.sianas.e_doclinic.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring",uses = { SpecialtyMapper.class, UserMapper.class })
public interface DoctorMapper {

    @Mapping(target="user",source="user")
    DoctorDto toDto(Doctor doctor);

    @Mapping(target = "id", ignore = true)
    Doctor toEntity(RegisterDoctorRequest request, User user);

    @Mapping(target = "id", ignore = true)
    void update(UpdateDoctorRequest request, @MappingTarget Doctor doctor);
}
