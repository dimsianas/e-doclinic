package com.sianas.e_doclinic.mappers;

import com.sianas.e_doclinic.dtos.PatientDto;
import com.sianas.e_doclinic.dtos.RegisterPatientRequest;
import com.sianas.e_doclinic.dtos.UpdatePatientRequest;
import com.sianas.e_doclinic.entities.Patient;
import com.sianas.e_doclinic.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring",uses = { UserMapper.class } )
public interface PatientMapper {

    @Mapping(target="user",source="user")
    PatientDto toDto(Patient patient);

    @Mapping(target = "id", ignore = true)
    Patient toEntity(RegisterPatientRequest request, User user);

    @Mapping(target = "id", ignore = true)
    void update(UpdatePatientRequest request, @MappingTarget Patient patient);
}
