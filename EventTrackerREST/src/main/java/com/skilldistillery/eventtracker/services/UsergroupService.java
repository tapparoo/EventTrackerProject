package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.Usergroup;

public interface UsergroupService {

	Usergroup findUsergroupById(int id);
	List<Usergroup> findAllUsergroups();
	Usergroup addUsergroup(Usergroup usergroup);
	Usergroup modifyUsergroup(Usergroup usergroup);
	boolean deleteUsergroup(Usergroup usergroup);

}
