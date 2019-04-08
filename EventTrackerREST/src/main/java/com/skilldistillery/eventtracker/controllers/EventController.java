package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.Usergroup;
import com.skilldistillery.eventtracker.services.CommentService;
import com.skilldistillery.eventtracker.services.EventService;
import com.skilldistillery.eventtracker.services.UserService;

@RestController
@RequestMapping("api/events")
@CrossOrigin({"*", "http://localhost:4200"})
public class EventController {
	@Autowired
	private EventService serv;
	@Autowired
	private CommentService commentServ;
	@Autowired
	private UserService userServ;
	
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
			resp.setStatus(204);
		}
		return events;
	}
	
	@GetMapping("{id}/comments")
	public List<Comment> getEventComments(@PathVariable("id") Integer id, HttpServletResponse resp){
		List<Comment> comments = serv.findCommentsByEventId(id);
		if(comments.size() > 0) {
			resp.setStatus(200);
		}else {
			resp.setStatus(204);
		}
		return comments;
	}
	
	@GetMapping("{id}/groups")
	public List<Usergroup> getEventGroups(@PathVariable("id") Integer id, HttpServletResponse resp){
		List<Usergroup> groups = serv.findUsergroupsByEventId(id);
		if(groups.size() > 0) {
			resp.setStatus(200);
		}else {
			resp.setStatus(204);
		}
		return groups;
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
	
	@PostMapping("{id}/comments")
	public Comment addEventComment(@PathVariable("id") Integer eid, @RequestBody Comment comment, HttpServletResponse resp) {
		// TODO: use session to assign userid
		int userId = 1;
		Event event = serv.findEventById(eid);
		if(event != null) {
			comment = commentServ.addComment(comment);
			comment.setUser(userServ.findUserById(userId));
			event.addComment(comment);
			serv.modifyEvent(event);
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return comment;
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
	
	
	@DeleteMapping("{id}/comments/{cid}")
	public boolean deleteEventComment(@PathVariable("id") Integer eid, @PathVariable("cid") Integer cid, HttpServletResponse resp) {
		Comment c = commentServ.findCommentById(cid);
		Event event = serv.findEventById(eid);
		boolean deleted = false;
		if (c != null) {
			commentServ.deleteComment(c);
			event.removeComment(c);
			serv.modifyEvent(event);
			resp.setStatus(204);
			deleted = true;
		}else {
			resp.setStatus(404);
		}
		return deleted;
	}
}
