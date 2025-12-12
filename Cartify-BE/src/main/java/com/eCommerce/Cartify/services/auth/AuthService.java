package com.eCommerce.Cartify.services.auth;

import com.eCommerce.Cartify.dto.SignupRequest;
import com.eCommerce.Cartify.dto.UserDto;

public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
