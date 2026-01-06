package com.eCommerce.Cartify.controller;

import com.eCommerce.Cartify.dao.CustomerRepository;
import com.eCommerce.Cartify.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Customer customer) {
        if (customerRepository.findByEmail(customer.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        String rawPassword = customer.getPassword();
        customer.setPassword(passwordEncoder.encode(rawPassword));
        customer.setRole("ROLE_USER");
        customer.setEnabled(1);
        customerRepository.save(customer);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
}