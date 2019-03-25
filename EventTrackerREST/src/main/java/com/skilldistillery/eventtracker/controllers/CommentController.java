package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.Comment;
import com.skilldistillery.eventtracker.services.CommentService;

@RestController
@RequestMapping("api/comments")
public class CommentController {
	@Autowired
	private CommentService serv;
	
	@GetMapping("{id}")
	public Comment getComment(@PathVariable("id") Integer uid, HttpServletResponse resp) {
		Comment comment = serv.findCommentById(uid);
		if(comment != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return comment;
	}
	
	@GetMapping
	public List<Comment> getAllComments(HttpServletResponse resp) {
		List<Comment> comments = serv.findAllComments();
		if(comments.size() > 0) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return comments;
	}
	
	@PutMapping("{id}")
	public Comment modifiyComment(@PathVariable("id") Integer id, @RequestBody Comment modifiedComment, HttpServletResponse resp) {
		modifiedComment.setId(id);
		Comment updatedComment = serv.modifyComment(modifiedComment);
		if(updatedComment != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(404);
		}
		return updatedComment;
	}

	@PostMapping
	public Comment addComment(@RequestBody Comment newComment, HttpServletResponse resp) {
		Comment comment = serv.addComment(newComment);
		if(comment != null) {
			resp.setStatus(200);
		}else {
			resp.setStatus(400);
		}
		return comment;
	}
	
	@DeleteMapping("{id}")
	public boolean deleteComment(@PathVariable("id") Integer id, HttpServletResponse resp) {
		boolean deleted = serv.deleteComment(serv.findCommentById(id));
		if (!deleted) {
			resp.setStatus(404);
		}else {
			resp.setStatus(204);
		}
		return deleted;
	}
}
