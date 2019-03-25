package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.Comment;

public interface CommentService {

	Comment findCommentById(int id);
	List<Comment> findAllComments();
	Comment addComment(Comment comment);
	Comment modifyComment(Comment comment);
	boolean deleteComment(Comment comment);

}
