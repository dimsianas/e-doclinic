package com.sianas.e_doclinic.mappers;

import com.sianas.e_doclinic.dtos.UserDto;
import com.sianas.e_doclinic.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toDto(User user);
}
