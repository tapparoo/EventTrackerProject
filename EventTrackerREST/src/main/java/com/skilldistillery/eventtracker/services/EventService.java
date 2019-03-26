package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.Usergroup;

public interface EventService {

	Event findEventById(int id);
	List<Event> findAllEvents();
	Event addEvent(Event event);
	Event modifyEvent(Event event);
	boolean deleteEvent(Event event);
	List<Comment> findCommentsByEventId(int id);
	List<Usergroup> findUsergroupsByEventId(int id);
}
