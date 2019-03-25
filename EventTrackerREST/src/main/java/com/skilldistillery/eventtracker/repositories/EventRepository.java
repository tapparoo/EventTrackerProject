package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.Event;


public interface EventRepository extends JpaRepository<Event, Integer> {

}
