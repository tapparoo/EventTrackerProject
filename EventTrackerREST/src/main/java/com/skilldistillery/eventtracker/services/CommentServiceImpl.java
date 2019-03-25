package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.repositories.CommentRepository;

@Service
public class CommentServiceImpl implements CommentService {
	@Autowired
	private CommentRepository repo;
	
	@Override
	public Comment findCommentById(int id) {
		Optional<Comment> comment = repo.findById(id);
		
		return comment.isPresent() ? comment.get() : null;
	}
	
	@Override
	public List<Comment> findAllComments() {
		return repo.findAll();
	}
	
	@Override
	public Comment addComment(Comment comment) {
		return repo.saveAndFlush(comment);
	}
	
	@Override
	public Comment modifyComment(Comment comment) {
		return repo.saveAndFlush(comment);
	}
	
	@Override
	public boolean deleteComment(Comment comment) {
		Optional<Comment> commentOpt = repo.findById(comment.getId());
		if(commentOpt.isPresent()) {
			repo.delete(commentOpt.get());
			return true;
		}
		return false;
	}
}
