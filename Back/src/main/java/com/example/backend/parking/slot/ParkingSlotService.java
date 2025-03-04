package com.example.backend.parking.slot;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParkingSlotService {
    private final ParkingSlotRepository parkingSlotRepository;

    public boolean createNewSlot() {
        ParkingSlot newSlot = new ParkingSlot();
        newSlot.setEmpty(true);
        try {
            parkingSlotRepository.save(newSlot);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //tu osak zmienial
    @Transactional
    public ParkingSlot occupySlot(Integer slotId, String reservedBy) {
        parkingSlotRepository.findOccupiedSlotByLogin(reservedBy).ifPresent(slot -> {
            throw new IllegalStateException("User already has a reserved parking slot");
        });
        ParkingSlot slot = parkingSlotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("Parking slot not found"));

        if (!slot.isEmpty()) {
            throw new IllegalStateException("Parking slot is already occupied");
        }
        slot.setEmpty(false);
        slot.setReservedBy(reservedBy);
        return parkingSlotRepository.save(slot);
    }

    //tu osak zmienial
    @Transactional
    public ParkingSlot occupyFirstAvailableSlot(String login) {
        parkingSlotRepository.findOccupiedSlotByLogin(login).ifPresent(slot -> {
            throw new IllegalStateException("User already has a reserved parking slot");
        });
        ParkingSlot slot = parkingSlotRepository.findFirstByIsEmptyTrue()
                .orElseThrow(() -> new IllegalStateException("No available parking slots"));
        slot.setEmpty(false);
        slot.setReservedBy(login);
        return parkingSlotRepository.save(slot);
    }

    @Transactional
    public ParkingSlot releaseSlot(String login) {
        ParkingSlot slot = parkingSlotRepository.findOccupiedSlotByLogin(login)
                .orElseThrow(() -> new IllegalArgumentException("Parking slot is not occupied or does not exist"));

        slot.setEmpty(true);
        slot.setReservedBy(null);
        return parkingSlotRepository.save(slot);
    }

    //od tąd osak robil
    public List<ParkingSlot> getFreeSlots(String login) {
        return parkingSlotRepository.findEmptySlots();
    }

    public List<ParkingSlot> getBusySlots(String login) {
        return parkingSlotRepository.findBusySlots();
    }

    public ParkingSlot getUserSlot(String login) {
        return parkingSlotRepository.findOccupiedSlotByLogin(login)
                .orElseThrow(() -> new IllegalArgumentException("Parking slot is not occupied or does not exist"));
    }

    public int countFreeSlots() {
        return parkingSlotRepository.countFreeSlots();
    }

    public int countBusySlots() {
        return parkingSlotRepository.countBusySlots();
    }
}

