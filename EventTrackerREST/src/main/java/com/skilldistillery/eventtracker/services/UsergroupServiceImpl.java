package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.Usergroup;
import com.skilldistillery.eventtracker.repositories.UsergroupRepository;

@Service
public class UsergroupServiceImpl implements UsergroupService {
	@Autowired
	private UsergroupRepository repo;
	
	@Override
	public Usergroup findUsergroupById(int id) {
		Optional<Usergroup> usergroup = repo.findById(id);
		
		return usergroup.isPresent() ? usergroup.get() : null;
	}
	
	@Override
	public List<Usergroup> findAllUsergroups() {
		return repo.findAll();
	}
	
	@Override
	public Usergroup addUsergroup(Usergroup usergroup) {
		return repo.saveAndFlush(usergroup);
	}
	
	@Override
	public Usergroup modifyUsergroup(Usergroup usergroup) {
		return repo.saveAndFlush(usergroup);
	}
	
	@Override
	public boolean deleteUsergroup(Usergroup usergroup) {
		Optional<Usergroup> usergroupOpt = repo.findById(usergroup.getId());
		if(usergroupOpt.isPresent()) {
			repo.delete(usergroupOpt.get());
			return true;
		}
		return false;
	}
	
	@Override
	public List<Comment> findCommentsByGroupId(int id){
		return repo.findCommentByGroupId(id);
	}
	
	@Override
	public List<Event> findEventsByGroupId(int id){
		return repo.findEventByGroupId(id);
	}
}
