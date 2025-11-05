package com.sianas.e_doclinic.mappers;

import com.sianas.e_doclinic.dtos.DoctorScheduleDto;
import com.sianas.e_doclinic.dtos.RegisterDoctorScheduleRequest;
import com.sianas.e_doclinic.dtos.UpdateDoctorScheduleRequest;
import com.sianas.e_doclinic.entities.DoctorSchedule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {DoctorMapper.class})
public interface DoctorScheduleMapper {

    @Mapping(target="doctor",source="doctor")
    DoctorScheduleDto toDto(DoctorSchedule doctorSchedule);

    DoctorSchedule toEntity(RegisterDoctorScheduleRequest request);

    @Mapping(target = "id", ignore = true)
    void update(UpdateDoctorScheduleRequest request, @MappingTarget DoctorSchedule doctorSchedule);
}
