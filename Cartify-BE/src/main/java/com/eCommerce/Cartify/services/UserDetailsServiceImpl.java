package com.eCommerce.Cartify.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Minimal implementation: returns a dummy user.
        // Replace with DB lookup logic if needed.
        if (username == null || username.isEmpty()) {
            throw new UsernameNotFoundException("Username is empty");
        }

        // Here we create a dummy user with username and empty password and roles
        return new User(username, "", new ArrayList<>());
    }
}
