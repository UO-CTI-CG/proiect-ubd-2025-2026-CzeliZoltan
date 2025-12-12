package com.eCommerce.Cartify.dto;

import com.eCommerce.Cartify.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private UserRole userRole;


}
