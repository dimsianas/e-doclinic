package com.sianas.e_doclinic.mappers;

import com.sianas.e_doclinic.dtos.RegisterSpecialtyRequest;
import com.sianas.e_doclinic.dtos.SpecialtyDto;
import com.sianas.e_doclinic.dtos.UpdateSpecialtyRequest;
import com.sianas.e_doclinic.entities.Specialty;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SpecialtyMapper {

    SpecialtyDto toDto(Specialty specialty);
    Specialty toEntity(RegisterSpecialtyRequest request);

    @Mapping(target = "id", ignore = true)
    void update(UpdateSpecialtyRequest request, @MappingTarget Specialty specialty);
}
