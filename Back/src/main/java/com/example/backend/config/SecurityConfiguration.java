package com.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Dodaj CORS
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/parking-slots/state").permitAll()
                        .requestMatchers("/api/v1/auth/**").permitAll() // Logowanie i rejestracja - publiczne
                        .requestMatchers("/api/v1/user/{login}/toggleActive").hasRole("ADMIN") // Wymagany ADMIN
                        .anyRequest().authenticated() // Wszystkie inne endpointy wymagają autoryzacji
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Dozwolony tylko frontend na localhost:5173
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Dozwolone metody HTTP
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept")); // Dozwolone nagłówki
        configuration.setExposedHeaders(List.of("Authorization")); // Nagłówki widoczne w odpowiedzi
        configuration.setAllowCredentials(true); // Zezwól na przesyłanie ciasteczek/uwierzytelnianie

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Konfiguracja dla wszystkich endpointów
        return source;
    }
}
