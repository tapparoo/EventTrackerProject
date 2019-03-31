package com.skilldistillery.eventtracker;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="first_name")
	private String firstName;
	@Column(name="last_name")
	private String lastName;
	private String username;
	private String password;
	private String email;
	private int age;
	@Column(name="height_in_inches")
	private Double heightInInches;
	@Column(name="weight_in_pounds")
	private Double weightInPounds;
	private boolean active;
	private boolean admin;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name="user_usergroup",
		joinColumns=@JoinColumn(name="user_id"),
		inverseJoinColumns=@JoinColumn(name="usergroup_id"))
	private List<Usergroup> usergroups;

	public void addUsergroup(Usergroup group) {
		if (usergroups == null) usergroups = new ArrayList<>();
		if (!usergroups.contains(group)) {
			usergroups.add(group);
		}
	}
	
	public void removeUsergroup(Usergroup group) {
		if (usergroups != null && usergroups.contains(group)) {
			usergroups.remove(group);
		}
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Double getHeightInInches() {
		return heightInInches;
	}

	public void setHeightInInches(Double heightInInches) {
		this.heightInInches = heightInInches;
	}

	public Double getWeightInPounds() {
		return weightInPounds;
	}

	public void setWeightInPounds(Double weightInPounds) {
		this.weightInPounds = weightInPounds;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public List<Usergroup> getUsergroups() {
		return usergroups;
	}

	public void setUsergroups(List<Usergroup> usergroups) {
		this.usergroups = usergroups;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
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
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", username=" + username
				+ ", password=" + password + ", email=" + email + ", age=" + age + ", heightInInches=" + heightInInches
				+ ", weightInPounds=" + weightInPounds + ", active=" + active + ", admin=" + admin + ", usergroups="
				+ usergroups + "]";
	}
}
