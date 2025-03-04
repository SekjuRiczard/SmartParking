package com.example.backend.parking.slot;

import com.example.backend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parking-slots")
@RequiredArgsConstructor
public class ParkingSlotController {
    private final ParkingSlotService parkingSlotService;
    private final JwtService jwtService;

    @PostMapping("/create")
    public ResponseEntity<String> createSlot() {
        boolean result =  parkingSlotService.createNewSlot();
        return result ? ResponseEntity.ok("Created successfully") : ResponseEntity.status(500).body("Creating failed");
    }

    @PutMapping("/{id}/occupy")
    public ResponseEntity<ParkingSlot> occupySlot(@PathVariable Integer id, @RequestParam String reservedBy) {
        ParkingSlot slot = parkingSlotService.occupySlot(id, reservedBy);
        return ResponseEntity.ok(slot);
    }

    @PutMapping("/occupy")
    public ResponseEntity<ParkingSlot> occupyFirstAvailableSlot(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwt = token.replace("Bearer ", "");
        ParkingSlot slot = parkingSlotService.occupyFirstAvailableSlot(jwtService.extractLogin(jwt));
        return ResponseEntity.ok(slot);
    }

    @PutMapping("/release")
    public ResponseEntity<ParkingSlot> releaseSlot(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwt = token.replace("Bearer ", "");
        ParkingSlot slot = parkingSlotService.releaseSlot(jwtService.extractLogin(jwt));
        return ResponseEntity.ok(slot);
    }
    //tu osak robil
    //zwraca wszystkie wolne miejsca
    @GetMapping("/free-slots")
    public ResponseEntity<List<ParkingSlot>> getAllFreeSlots(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwt = token.replace("Bearer ", "");
        List<ParkingSlot> freeSlots = parkingSlotService.getFreeSlots(jwtService.extractLogin(jwt));
        return ResponseEntity.ok(freeSlots);
    }
    @GetMapping("/busy-slots")
    public ResponseEntity<List<ParkingSlot>> getAllBusySlots(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwt = token.replace("Bearer ", "");
        List<ParkingSlot> busySlots = parkingSlotService.getBusySlots(jwtService.extractLogin(jwt));
        return ResponseEntity.ok(busySlots);
    }

    @GetMapping("/user-slot/{login}")
    public ResponseEntity<ParkingSlot> getUserSlot(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
            String jwt = token.replace("Bearer ", "");
            ParkingSlot slot = parkingSlotService.getUserSlot(jwtService.extractLogin(jwt));
            return ResponseEntity.ok(slot);

    }

    @GetMapping("/state")
    public ResponseEntity<ParkingSlotsStatusResponse> parkingSlotStatus(){
        ParkingSlotsStatusResponse parkingSlotsStatusResponse = new ParkingSlotsStatusResponse();
        parkingSlotsStatusResponse.setFreeSlots(parkingSlotService.countFreeSlots());
        parkingSlotsStatusResponse.setBusySlots(parkingSlotService.countBusySlots());
        return ResponseEntity.ok(parkingSlotsStatusResponse);
    }
}


