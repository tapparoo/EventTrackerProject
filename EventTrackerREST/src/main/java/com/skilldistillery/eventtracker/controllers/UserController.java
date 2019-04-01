package com.skilldistillery.eventtracker.controllers;

import java.sql.SQLIntegrityConstraintViolationException;
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

import com.skilldistillery.eventtracker.User;
import com.skilldistillery.eventtracker.Usergroup;
import com.skilldistillery.eventtracker.services.UserService;
import com.skilldistillery.eventtracker.services.UsergroupService;

@RestController
@RequestMapping("api/users")
public class UserController {
	@Autowired
	private UserService serv;
	@Autowired
	private UsergroupService groupServ;

	@GetMapping("{id}")
	public User getUser(@PathVariable("id") Integer uid, HttpServletResponse resp) {
		User user = serv.findUserById(uid);
		if (user != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return user;
	}

	@GetMapping
	public List<User> getAllUsers(HttpServletResponse resp) {
		List<User> users = serv.findAllUsers();
		if (users.size() > 0) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return users;
	}

	@GetMapping("{id}/groups")
	public List<Usergroup> getGroupsByUser(@PathVariable("id") Integer uid, HttpServletResponse resp) {
		List<Usergroup> groups = serv.findGroupsByUserId(uid);
		if (groups.size() > 0) {
			resp.setStatus(200);
		} else {
			resp.setStatus(204);
		}
		return groups;
	}

	@PutMapping("{id}")
	public User modifiyUser(@PathVariable("id") Integer id, @RequestBody User modifiedUser, HttpServletResponse resp) {
		modifiedUser.setId(id);
		User updatedUser = null;

		try {
			updatedUser = serv.modifyUser(modifiedUser);
		} catch (Exception e) {
			if (modifiedUser.getHeightInInches() > 999.9 || modifiedUser.getWeightInPounds() > 999.9) {
				resp.setHeader("Error", "Height or weight is out of range - max value = 999.9");
			} else {
				resp.setHeader("Error", "Username or email already exists");
			}
		}

		if (updatedUser != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return updatedUser;
	}

	@PutMapping("{id}/groups/{gid}")
	public User addUserToGroup(@PathVariable("id") Integer id, @PathVariable("gid") Integer gid,
			HttpServletResponse resp) throws SQLIntegrityConstraintViolationException {
		User user = serv.findUserById(id);
		Usergroup group = groupServ.findUsergroupById(gid);
		List<Usergroup> groups = serv.findGroupsByUserId(id);
		if (groups.contains(group)) {
			resp.setStatus(400);
		} else if (user != null && group != null) {
			user.addUsergroup(group);
			serv.modifyUser(user);
			resp.setStatus(200);
		} else {
			resp.setStatus(404);
		}
		return user;
	}

	@PostMapping
	public User addUser(@RequestBody User newUser, HttpServletResponse resp) {
		User user = null;

		try {
			user = serv.addUser(newUser);
		} catch (Exception e) {
			if (newUser.getHeightInInches() > 999.9 || newUser.getWeightInPounds() > 999.9) {
				resp.setHeader("Error", "Height or weight is out of range - max value = 999.9");
			} else {
				resp.setHeader("Error", "Username or email already exists");
			}
		}

		if (user != null) {
			resp.setStatus(200);
		} else {
			resp.setStatus(400);
		}
		return user;
	}

	@DeleteMapping("{id}")
	public boolean deleteUser(@PathVariable("id") Integer id, HttpServletResponse resp) {
		boolean deleted = false;
		
		deleted = serv.deleteUser(serv.findUserById(id));
		if (!deleted) {
			resp.setStatus(404);
		} else {
			resp.setStatus(204);
		}
		return deleted;
	}

	@DeleteMapping("{id}/groups/{gid}")
	public boolean removeUserFromGroup(@PathVariable("id") Integer id, @PathVariable("gid") Integer gid,
			HttpServletResponse resp) {
		User user = serv.findUserById(id);
		Usergroup group = groupServ.findUsergroupById(gid);
		List<Usergroup> groups = serv.findGroupsByUserId(id);
		if (groups == null || !groups.contains(group)) {
			resp.setStatus(400);
		} else if (user != null && group != null) {
			user.removeUsergroup(group);
			try {
				serv.modifyUser(user);
			} catch (Exception e) {
				e.printStackTrace();
			}
			resp.setStatus(204);
			return true;
		} else {
			resp.setStatus(404);
		}
		return false;
	}

}
