package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.User;
import com.skilldistillery.eventtracker.Usergroup;
import com.skilldistillery.eventtracker.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository repo;
	
	@Override
	public User findUserById(int id) {
		Optional<User> user = repo.findById(id);
		
		return user.isPresent() ? user.get() : null;
	}
	
	@Override
	public User findUserByEmail(String email) {
		return repo.findByEmail(email);
	}
	
	@Override
	public User findUserByUsername(String username) {
		return repo.findByUsername(username);
	}
	
	@Override
	public List<Usergroup> findGroupsByUserId(int id){
		return repo.findUsergroupByUserId(id);
	}
	
	@Override
	public List<User> findAllUsers() {
		return repo.findAll();
	}
	
	@Override
	public User addUser(User user) {
		User byEmail = findUserByEmail(user.getEmail());
		User byUsername = findUserByUsername(user.getUsername());
		
		// Check DB for pre-existing unique fields
		if (byEmail != null || byUsername != null) {
			return null;
		}
		
		return repo.saveAndFlush(user);
	}
	
	@Override
	public User modifyUser(User user) {
		User byEmail = findUserByEmail(user.getEmail());
		User byUsername = findUserByUsername(user.getUsername());
		
		// Check DB for pre-existing unique fields
		if ((byEmail != null && byEmail.getId() != user.getId()) || 
				(byUsername != null && byUsername.getId() != user.getId())) {
			return null;
		}
		return repo.saveAndFlush(user);
	}
	
	@Override
	public boolean deleteUser(User user) {
		Optional<User> userOpt = repo.findById(user.getId());
		if(userOpt.isPresent()) {
			repo.delete(userOpt.get());
			return true;
		}
		return false;
	}
}
