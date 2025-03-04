package com.example.backend.parking.slot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Integer> {
    Optional<ParkingSlot> findFirstByIsEmptyTrue();

    @Query("SELECT p FROM ParkingSlot p WHERE p.reservedBy = :login AND p.isEmpty = false")
    Optional<ParkingSlot> findOccupiedSlotByLogin(String login);

    @Query("SELECT p FROM ParkingSlot p WHERE p.isEmpty = true")
    List<ParkingSlot> findEmptySlots();

    @Query("SELECT p FROM ParkingSlot p WHERE p.isEmpty = false")
    List<ParkingSlot> findBusySlots();

    @Query("SELECT count(p.id) from ParkingSlot p where p.isEmpty = true")
    int countFreeSlots();

    @Query("SELECT count(p.id) from ParkingSlot p where p.isEmpty = false")
    int countBusySlots();
}
