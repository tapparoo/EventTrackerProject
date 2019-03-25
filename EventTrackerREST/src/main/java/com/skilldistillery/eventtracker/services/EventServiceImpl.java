package com.skilldistillery.eventtracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.repositories.EventRepository;

@Service
public class EventServiceImpl implements EventService {
	@Autowired
	private EventRepository repo;
}
