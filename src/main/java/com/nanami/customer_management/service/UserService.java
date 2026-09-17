package com.nanami.customer_management.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nanami.customer_management.entity.User;
import com.nanami.customer_management.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(
            String name,
            String email,
            String password) {

        User user = new User();

        user.setName(name);
        user.setEmail(email);

        String encodedPassword =
                passwordEncoder.encode(password);

        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public User findUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElse(null);
    }

    public boolean matches(
            String rawPassword,
            String encodedPassword) {

        return passwordEncoder.matches(
                rawPassword,
                encodedPassword
        );
    }
}