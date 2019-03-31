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

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.User;
import com.skilldistillery.eventtracker.Usergroup;
import com.skilldistillery.eventtracker.services.CommentService;
import com.skilldistillery.eventtracker.services.EventService;
import com.skilldistillery.eventtracker.services.UserService;
import com.skilldistillery.eventtracker.services.UsergroupService;

@RestController
@RequestMapping("api/groups")
public class UsergroupController {
	@Autowired
	private UsergroupService serv;
	@Autowired
	private EventService eventServ;
	@Autowired
	private UserService userServ;
	@Autowired
	private CommentService commentServ;
	
	@GetMapping("{id}")
	public Usergroup getUsergroup(@PathVariable("id") Integer gid, HttpServletResponse resp) {
		Usergroup group = serv.findUsergroupById(gid);
		if(group != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return group;
	}
	
	@GetMapping
	public List<Usergroup> getAllUsergroups(HttpServletResponse resp) {
		List<Usergroup> users = serv.findAllUsergroups();
		if(users.size() > 0) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return users;
	}
	
	@GetMapping("{id}/users")
	public List<User> getGroupUsers(@PathVariable("id") Integer id, HttpServletResponse resp){
		List<User> users = serv.findUsersByGroupId(id);
		if(users.size() > 0) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return users;
	}
	
	@GetMapping("{id}/comments")
	public List<Comment> getGroupComments(@PathVariable("id") Integer id, HttpServletResponse resp){
		List<Comment> comments = serv.findCommentsByGroupId(id);
		if(comments.size() > 0) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return comments;
	}
	
	@GetMapping("{id}/events")
	public List<Event> getGroupEvents(@PathVariable("id") Integer id, HttpServletResponse resp){
		List<Event> groups = serv.findEventsByGroupId(id);
		if(groups.size() > 0) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return groups;
	}
	
	@PutMapping("{id}")
	public Usergroup modifiyUsergroup(@PathVariable("id") Integer id, @RequestBody Usergroup modifiedUsergroup, HttpServletResponse resp) {
		modifiedUsergroup.setId(id);
		Usergroup updatedUsergroup = serv.modifyUsergroup(modifiedUsergroup);
		if(updatedUsergroup != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return updatedUsergroup;
	}
	
	@PutMapping("{id}/events/{eid}")
	public Usergroup addGroupToEvent(@PathVariable("id") Integer id, @PathVariable("eid") Integer eid, HttpServletResponse resp) {
		Usergroup group = serv.findUsergroupById(id);
		Event evt = eventServ.findEventById(eid);
		if(group != null && evt != null) {
			group.addEvent(evt);
			serv.modifyUsergroup(group);
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return group;
	}

	@PostMapping
	public Usergroup addUsergroup(@RequestBody Usergroup newUsergroup, HttpServletResponse resp) {
		Usergroup user = serv.addUsergroup(newUsergroup);
		if(user != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(400);
		}
		return user;
	}
	
	@PostMapping("{id}/comments")
	public Comment addGroupComment(@PathVariable("id") Integer eid, @RequestBody Comment comment, HttpServletResponse resp) {
		// TODO: use session to assign userid
		int userId = 1;
		Usergroup group = serv.findUsergroupById(eid);
		if(group != null) {
			comment = commentServ.addComment(comment);
			comment.setUser(userServ.findUserById(userId));
			group.addComment(comment);
			serv.modifyUsergroup(group);
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return comment;
	}
	
	@DeleteMapping("{id}")
	public boolean deleteUsergroup(@PathVariable("id") Integer id, HttpServletResponse resp) {
		boolean deleted = serv.deleteUsergroup(serv.findUsergroupById(id));
		if (!deleted) {
			resp.setStatus(404);
		}else {
			resp.setStatus(204);
		}
		return deleted;
	}
	
	@DeleteMapping("{id}/comments/{cid}")
	public boolean deleteGroupComment(@PathVariable("id") Integer gid, @PathVariable("cid") Integer cid, HttpServletResponse resp) {
		Comment c = commentServ.findCommentById(cid);
		Usergroup group = serv.findUsergroupById(gid);
		boolean deleted = false;
		if (c != null) {
			commentServ.deleteComment(c);
			group.removeComment(c);
			serv.modifyUsergroup(group);
			resp.setStatus(204);
			deleted = true;
		}else {
			resp.setStatus(404);
		}
		return deleted;
	}
	
	@DeleteMapping("{id}/events/{eid}")
	public boolean removeGroupFromEvent(@PathVariable("id") Integer gid, @PathVariable("eid") Integer eid, HttpServletResponse resp) {
		Event evt = eventServ.findEventById(eid);
		Usergroup group = serv.findUsergroupById(gid);
		boolean removed = false;
		if (evt != null && group != null) {
			group.removeEvent(evt);
			serv.modifyUsergroup(group);
			resp.setStatus(204);
			removed = true;
		}else {
			resp.setStatus(404);
		}
		return removed;
	}
}
