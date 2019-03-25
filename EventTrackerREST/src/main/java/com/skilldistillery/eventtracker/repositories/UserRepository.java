package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
