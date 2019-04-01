package com.skilldistillery.eventtracker;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Usergroup {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;
	private String description;
	private boolean active;

	@JsonIgnore
	@ManyToMany(mappedBy = "usergroups")
	private List<User> users;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "usergroup_event", joinColumns = @JoinColumn(name = "usergroup_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
	private List<Event> events;

	@JsonIgnore
	@OneToMany
	@JoinTable(name = "usergroup_comment", joinColumns = @JoinColumn(name = "usergroup_id"), inverseJoinColumns = @JoinColumn(name = "comment_id"))
	private List<Comment> comments;

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
	
	public void addEvent(Event event) {
		if (events == null) events = new ArrayList<>();
		if (!events.contains(event)) {
			events.add(event);
		}
	}

	public void removeEvent(Event event) {
		if (events != null && events.contains(event)) {
			events.remove(event);
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

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
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
		Usergroup other = (Usergroup) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Usergroup [id=" + id + ", name=" + name + ", description=" + description + ", active=" + active
				+ ", comments=" + comments + "]";
	}
}
