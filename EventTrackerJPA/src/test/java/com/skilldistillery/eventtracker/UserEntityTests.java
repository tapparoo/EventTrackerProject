package com.skilldistillery.eventtracker;

import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("User Entity Tests")
class UserEntityTests {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("EventTrackerPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		user = em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		user = null;
	}

//	 select id, first_name, last_name, username, password, email, height_in_inches, weight_in_pounds, age, active, admin from user where id = 1;
//	 +----+------------+-----------+----------+----------+-------------------+------------------+------------------+------+--------+-------+
//	 | id | first_name | last_name | username | password | email             | height_in_inches | weight_in_pounds | age  | active | admin |
//	 +----+------------+-----------+----------+----------+-------------------+------------------+------------------+------+--------+-------+
//	 |  1 | Adam       | Tappy     | admin    | admin    | wut@wut@gmail.com |             69.0 |            169.0 |   69 |      1 |     1 |
//	 +----+------------+-----------+----------+----------+-------------------+------------------+------------------+------+--------+-------+
	
	@Test
	void test_User_entity_mappings() {
		assertEquals("Adam", user.getFirstName());
		assertEquals("Tappy", user.getLastName());
		assertEquals("admin", user.getUsername());
		assertEquals("admin", user.getPassword());
		assertEquals("wut@wut@gmail.com", user.getEmail());
		assertEquals(69.0, user.getHeightInInches());
		assertEquals(169.0, user.getWeightInPounds());
		assertEquals(69, user.getAge());
		assertEquals("43.7", user.getBmi());
		assertTrue(user.isActive());
		assertTrue(user.isAdmin());
	}
	
	@Test
	void test_User_Usergroup_association() {
		User u = em.find(User.class, 4);
		assertTrue(u.getGroups().size() > 0);
	}
	
	@Disabled
	@Test
	void test() {
		fail("Not yet implemented");
	}

}
