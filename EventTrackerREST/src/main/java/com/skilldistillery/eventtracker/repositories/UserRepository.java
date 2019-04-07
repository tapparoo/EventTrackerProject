package com.skilldistillery.eventtracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.eventtracker.User;
import com.skilldistillery.eventtracker.Usergroup;

public interface UserRepository extends JpaRepository<User, Integer> {
	@Query("SELECT u.usergroups FROM User u WHERE u.id = :id")
	List<Usergroup> findUsergroupByUserId(@Param(value="id") int id);
	User findByEmail(String email);
	User findByUsername(String username);

}
