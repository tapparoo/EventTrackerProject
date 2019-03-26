package com.skilldistillery.eventtracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.Usergroup;

public interface UsergroupRepository extends JpaRepository<Usergroup, Integer> {
	@Query("SELECT g.events FROM Usergroup g WHERE g.id = :gid")
	List<Event> findEventByGroupId(@Param("gid") int id);
	@Query("SELECT g.comments FROM Usergroup g WHERE g.id = :gid")
	List<Comment> findCommentByGroupId(@Param("gid") int id);
}
