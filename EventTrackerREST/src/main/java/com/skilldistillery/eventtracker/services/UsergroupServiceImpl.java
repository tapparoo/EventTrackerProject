package com.skilldistillery.eventtracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.repositories.UsergroupRepository;

@Service
public class UsergroupServiceImpl implements UsergroupService {
	@Autowired
	private UsergroupRepository repo;
}
