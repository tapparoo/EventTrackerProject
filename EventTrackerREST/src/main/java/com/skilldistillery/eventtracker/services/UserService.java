package com.skilldistillery.eventtracker.services;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import com.skilldistillery.eventtracker.User;
import com.skilldistillery.eventtracker.Usergroup;

public interface UserService {

	User findUserById(int id);
	List<User> findAllUsers();
	User addUser(User user) throws SQLIntegrityConstraintViolationException;
	User modifyUser(User user) throws SQLIntegrityConstraintViolationException;
	boolean deleteUser(User user) throws SQLIntegrityConstraintViolationException;
	List<Usergroup> findGroupsByUserId(int id);
	User findUserByEmail(String email);

}
