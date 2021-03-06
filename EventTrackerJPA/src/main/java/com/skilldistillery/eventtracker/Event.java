package com.skilldistillery.eventtracker;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Event {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String name;
	private String description;
	private boolean active;

	private String date;
	
	@JsonIgnore
	@OneToMany(fetch=FetchType.EAGER)
	@JoinTable(name="event_comment",
		joinColumns=@JoinColumn(name="event_id"),
		inverseJoinColumns=@JoinColumn(name="comment_id"))
	private List<Comment> comments;
	
	@JsonIgnore
	@ManyToMany(mappedBy="events")
		private List<Usergroup> usergroups;

	public void addComment(Comment comment) {
		if (comments == null) comments = new ArrayList<>();
		if (!comments.contains(comment)) {
			comments.add(comment);
		}
	}
	
	public void removeComment(Comment comment) {
		if (comments != null && comments.contains(comment)) {
			comments.remove(comment);
		}
	}
	
	public void addUsergroup(Usergroup usergroup) {
		if (usergroup == null) usergroups = new ArrayList<>();
		if (!usergroups.contains(usergroup)) {
			usergroups.add(usergroup);
		}
	}

	public void removeUsergroup(Usergroup usergroup) {
		if (usergroups != null && usergroups.contains(usergroup)) {
			usergroups.remove(usergroup);
	}
}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public List<Usergroup> getUsergroups() {
		return usergroups;
	}

	public void setUsergroups(List<Usergroup> usergroups) {
		this.usergroups = usergroups;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Event other = (Event) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", name=" + name + ", description=" + description + ", active=" + active + ", date="
				+ date + ", comments=" + comments + ", usergroups=" + usergroups + "]";
	}
}
