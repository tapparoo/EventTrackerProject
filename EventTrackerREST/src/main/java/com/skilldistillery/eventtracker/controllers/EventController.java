package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.services.EventService;

@RestController
@RequestMapping("api/events")
public class EventController {
	@Autowired
	private EventService serv;
	
	@GetMapping("{id}")
	public Event getEvent(@PathVariable("id") Integer uid, HttpServletResponse resp) {
		Event event = serv.findEventById(uid);
		if(event != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return event;
	}
	
	@GetMapping
	public List<Event> getAllEvents(HttpServletResponse resp) {
		List<Event> events = serv.findAllEvents();
		if(events.size() > 0) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return events;
	}
	
	@PutMapping("{id}")
	public Event modifiyEvent(@PathVariable("id") Integer id, @RequestBody Event modifiedEvent, HttpServletResponse resp) {
		modifiedEvent.setId(id);
		Event updatedEvent = serv.modifyEvent(modifiedEvent);
		if(updatedEvent != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return updatedEvent;
	}

	@PostMapping
	public Event addEvent(@RequestBody Event newEvent, HttpServletResponse resp) {
		Event event = serv.addEvent(newEvent);
		if(event != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(400);
		}
		return event;
	}
	
	@DeleteMapping("{id}")
	public boolean deleteEvent(@PathVariable("id") Integer id, HttpServletResponse resp) {
		boolean deleted = serv.deleteEvent(serv.findEventById(id));
		if (!deleted) {
			resp.setStatus(404);
		}else {
			resp.setStatus(204);
		}
		return deleted;
	}
}
