package com.nanami.customer_management.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanami.customer_management.dto.UserRegistrationRequest;
import com.nanami.customer_management.entity.User;
import com.nanami.customer_management.service.JwtService;
import com.nanami.customer_management.service.UserService;

@RestController
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(
            UserService userService,
            JwtService jwtService) {

        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody LoginRequest loginData) {

        String email = loginData.email() == null
                ? ""
                : loginData.email().trim();

        String password = loginData.password() == null
                ? ""
                : loginData.password();

        User user = userService.findUserByEmail(email);

        if (user == null
                || !userService.matches(
                        password,
                        user.getPassword())) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("メールアドレスまたはパスワードが正しくありません。");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getName()
        );

        return ResponseEntity.ok(token);
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserRegistrationRequest request) {

        String email = request.email().trim();

        if (userService.findUserByEmail(email) != null) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(java.util.Map.of(
                            "message",
                            "このメールアドレスはすでに登録されています。"
                    ));
        }

        userService.createUser(
                request.name().trim(),
                email,
                request.password()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(java.util.Map.of(
                        "message",
                        "ユーザーを登録しました。"
                ));
    }

    public record LoginRequest(
            String email,
            String password) {
    }
}