package com.skilldistillery.eventtracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.skilldistillery.eventtracker")
public class EventTrackerRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventTrackerRestApplication.class, args);
	}

}
