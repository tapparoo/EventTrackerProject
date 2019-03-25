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

@DisplayName("Comment Entity Tests")
class CommentEntityTests {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Comment comment;
	
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
		comment = em.find(Comment.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		comment = null;
	}

//	select * from comment where id = 1;
//	+----+---------+---------------------+--------+
//	| id | user_id | comment             | active |
//	+----+---------+---------------------+--------+
//	|  1 |       1 | Good luck everyone! |      1 |
//	+----+---------+---------------------+--------+
	
	@Test
	void test_Comment_entity_mappings() {
		assertEquals("Good luck everyone!", comment.getComment());
		assertTrue(comment.isActive());
		assertEquals("Adam", comment.getUser().getFirstName());
	}
	
	@Disabled
	@Test
	void test() {
		fail("Not yet implemented");
	}

}
