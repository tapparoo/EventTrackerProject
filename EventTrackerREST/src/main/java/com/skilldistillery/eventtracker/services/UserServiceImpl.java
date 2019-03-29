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
	public List<Usergroup> findGroupsByUserId(int id){
		return repo.findUsergroupByUserId(id);
	}
	
	@Override
	public List<User> findAllUsers() {
		return repo.findAll();
	}
	
	@Override
	public User addUser(User user) {
		return repo.saveAndFlush(user);
	}
	
	@Override
	public User modifyUser(User user) {
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
