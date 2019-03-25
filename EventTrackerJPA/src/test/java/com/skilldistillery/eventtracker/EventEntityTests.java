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

@DisplayName("Event Entity Tests")
class EventEntityTests {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Event event;
	
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
		event = em.find(Event.class, 3);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		event = null;
	}

//	select * from event where id = 3;
//	+----+---------+-----------------+----------------------------------------------+--------+---------------------+---------------------+---------------------+
//	| id | user_id | name            | description                                  | active | date                | created_at          | updated_at          |
//	+----+---------+-----------------+----------------------------------------------+--------+---------------------+---------------------+---------------------+
//	|  3 |       4 | Run in the park | Come join us for a run/jog/walk in the park! |      1 | 2019-04-15 06:30:00 | 2019-03-20 14:33:58 | 2019-03-20 14:33:58 |
//	+----+---------+-----------------+----------------------------------------------+--------+---------------------+---------------------+---------------------+
	
	@Test
	void test_Event_entity_mappings() {
		assertEquals("Run in the park", event.getName());
		assertEquals("Come join us for a run/jog/walk in the park!", event.getDescription());
		assertTrue(event.isActive());
	}
	
	@Test
	void test_Event_Usergroup_associations() {
		assertTrue(event.getGroups().size() > 0);
	}
	
	@Test
	void test_Event_EventComments_associations() {
		assertTrue(event.getComments().size() > 0);
	}
	
	@Disabled
	@Test
	void test() {
		fail("Not yet implemented");
	}

}
