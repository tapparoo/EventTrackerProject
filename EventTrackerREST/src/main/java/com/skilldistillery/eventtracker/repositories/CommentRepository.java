package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
