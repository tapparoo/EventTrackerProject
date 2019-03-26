package com.skilldistillery.eventtracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.Usergroup;


public interface EventRepository extends JpaRepository<Event, Integer> {
	@Query("SELECT e.comments FROM Event e WHERE e.id = :eid")
	List<Comment> findCommentByEventId(@Param("eid") int id);
	@Query("SELECT e.usergroups FROM Event e WHERE e.id = :eid")
	List<Usergroup> findUsergroupByEventId(@Param("eid") int id);
}
