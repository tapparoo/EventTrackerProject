package com.skilldistillery.eventtracker.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.skilldistillery.eventtracker.Event;
import com.skilldistillery.eventtracker.repositories.EventRepository;

@DisplayName("Event Service/Repository Tests")
@SpringBootTest
class EventServiceTests {

	@Autowired
	EventService serv;
	@Autowired
	EventRepository repo;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void test_Event_Repository_JPA_mappings() {
		List<Event> list = repo.findAll();
		assertThat(list.size() > 0);
	}
	
	@Disabled
	@Test
	void test() {
		fail("Not yet implemented");
	}

}
