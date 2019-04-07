package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.User;
import com.skilldistillery.eventtracker.Usergroup;

public interface UserService {

	User findUserById(int id);
	List<User> findAllUsers();
	User addUser(User user);
	User modifyUser(User user);
	boolean deleteUser(User user);
	List<Usergroup> findGroupsByUserId(int id);
	User findUserByEmail(String email);
	User findUserByUsername(String username);

}
