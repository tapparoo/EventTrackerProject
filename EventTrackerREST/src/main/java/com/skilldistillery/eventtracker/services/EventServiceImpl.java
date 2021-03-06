package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.Usergroup;
import com.skilldistillery.eventtracker.repositories.EventRepository;

@Service
public class EventServiceImpl implements EventService {
	@Autowired
	private EventRepository repo;
	
	@Override
	public Event findEventById(int id) {
		Optional<Event> event = repo.findById(id);
		return event.isPresent() ? event.get() : null;
	}
	
	@Override
	public List<Event> findAllEvents() {
		return repo.findAll();
	}
	
	@Override
	public Event addEvent(Event event) {
		return repo.saveAndFlush(event);
	}
	
	@Override
	public Event modifyEvent(Event event) {
		return repo.saveAndFlush(event);
	}
	
	@Override
	public boolean deleteEvent(Event event) {
		Optional<Event> eventOpt = repo.findById(event.getId());
		if(eventOpt.isPresent()) {
			repo.delete(eventOpt.get());
			return true;
		}
		return false;
	}
	
	@Override
	public List<Comment> findCommentsByEventId(int id){
		return repo.findCommentByEventId(id);
	}
	
	@Override
	public List<Usergroup> findUsergroupsByEventId(int id){
		return repo.findUsergroupByEventId(id);
	}
}
