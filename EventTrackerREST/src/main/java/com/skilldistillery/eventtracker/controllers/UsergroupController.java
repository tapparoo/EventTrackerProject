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

import com.skilldistillery.eventtracker.Usergroup;
import com.skilldistillery.eventtracker.services.UsergroupService;

@RestController
@RequestMapping("api/groups")
public class UsergroupController {
	@Autowired
	private UsergroupService serv;
	
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
}
