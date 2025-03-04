package com.example.backend.user;

import com.example.backend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @GetMapping("/{login}")
    public ResponseEntity<Optional<User>> getUserByLogin(@PathVariable String login) {
        return ResponseEntity.ok(userRepository.findByLogin(login));
    }

    @GetMapping("/role")
    public ResponseEntity<String> getRoleByLogin(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwt = token.replace("Bearer ", "");
        User user = userRepository.findByLogin(jwtService.extractLogin(jwt))
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

        return ResponseEntity.ok(user.getRole().name());
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUserByLogin() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/{login}/toggleActive")
    public ResponseEntity<String> toggleUserActive(@PathVariable String login) {
        return userRepository.findByLogin(login)
                .map(user -> {
                    user.setActive(!user.isActive());
                    userRepository.save(user);
                    return ResponseEntity.ok("User status updated successfully");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
