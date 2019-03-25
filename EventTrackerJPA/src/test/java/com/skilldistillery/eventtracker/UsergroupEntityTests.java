package com.skilldistillery.eventtracker;

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

@DisplayName("Usergroup Entity Tests")
class UsergroupEntityTests {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Usergroup group;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("EventTrackerJPAPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		group = em.find(Usergroup.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		group = null;
	}

//	select * from eventtracker.group where id = 1;
//	+----+---------+----------------+---------------+--------+---------------------+---------------------+
//	| id | user_id | name           | description   | active | created_at          | updated_at          |
//	+----+---------+----------------+---------------+--------+---------------------+---------------------+
//	|  1 |       2 | The Dream Team | We can do it! |      1 | 2019-03-20 14:33:58 | 2019-03-20 14:33:58 |
//	+----+---------+----------------+---------------+--------+---------------------+---------------------+
	
	@Test
	void test_Usergroup_entity_mappings() {
		assertEquals("The Dream Team", group.getName());
		assertEquals("We can do it!", group.getDescription());
		assertTrue(group.isActive());
	}
	
	@Test
	void test_Usergroup_User_associations() {
		assertTrue(group.getUsers().size() > 0);
	}
	
	@Test
	void test_Usergroup_Event_associations() {
		assertTrue(group.getUsers().size() > 0);
	}
	
	@Test 
	void test_Usergroup_Comment_associations() {
		assertTrue(group.getComments().size() > 0);
	}
	
	@Disabled
	@Test
	void test() {
		fail("Not yet implemented");
	}

}
