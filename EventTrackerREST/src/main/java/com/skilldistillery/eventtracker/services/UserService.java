package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.User;

public interface UserService {

	User findUserById(int id);
	List<User> findAllUsers();
	User addUser(User user);
	User modifyUser(User user);
	boolean deleteUser(User user);

}
