package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.Event;

public interface EventService {

	Event findEventById(int id);
	List<Event> findAllEvents();
	Event addEvent(Event event);
	Event modifyEvent(Event event);
	boolean deleteEvent(Event event);

}
