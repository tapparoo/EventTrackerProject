package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.User;
import com.skilldistillery.eventtracker.Usergroup;

public interface UsergroupService {

	Usergroup findUsergroupById(int id);
	List<Usergroup> findAllUsergroups();
	Usergroup addUsergroup(Usergroup usergroup);
	Usergroup modifyUsergroup(Usergroup usergroup);
	boolean deleteUsergroup(Usergroup usergroup);
	List<Comment> findCommentsByGroupId(int id);
	List<Event> findEventsByGroupId(int id);
	List<User> findUsersByGroupId(int id);

}
