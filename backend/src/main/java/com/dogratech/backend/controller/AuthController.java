package com.dogratech.backend.controller;

import com.dogratech.backend.dto.AuthRequest;
import com.dogratech.backend.dto.AuthResponse;
import com.dogratech.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        if (
                request.getUsername().equals("admin") &&
                        request.getPassword().equals("admin")
        ) {

            String token = jwtUtil.generateToken(request.getUsername());

            return ResponseEntity.ok(new AuthResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid username or password");
    }
}
