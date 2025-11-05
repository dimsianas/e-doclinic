package com.sianas.e_doclinic.mappers;

import com.sianas.e_doclinic.dtos.AppointmentDto;
import com.sianas.e_doclinic.dtos.RegisterAppointmentRequest;
import com.sianas.e_doclinic.dtos.UpdateAppointmentRequest;
import com.sianas.e_doclinic.entities.Appointment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring",uses = {DoctorMapper.class, PatientMapper.class})
public interface AppointmentMapper {

    AppointmentDto toDto(Appointment appointment);
    Appointment toEntity(RegisterAppointmentRequest request);

    @Mapping(target = "id", ignore = true)
    void update(UpdateAppointmentRequest request, @MappingTarget Appointment appointment);
}
