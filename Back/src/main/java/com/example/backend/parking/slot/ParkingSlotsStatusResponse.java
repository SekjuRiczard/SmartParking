package com.example.backend.parking.slot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParkingSlotsStatusResponse {
    private int freeSlots;
    private int busySlots;
}
