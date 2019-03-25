
## Event Tracker REST Project
This is part one of the Event Tracker project.  This portion involves setting up the backend of a small application that will deliver JSON data via REST APIs.

## Project Requirements

- Custom MySQL database with a single table
- Gradle application w/Entities - unit tested
- Spring Boot REST application with controller/repository/service - unit tested
- Basic API routes tested via Postman

## API Routes
#### User
- http://www.tappy.site:8080/EventTrackerREST/api/users
#### Event
- http://www.tappy.site:8080/EventTrackerREST/api/events
#### Group
- http://www.tappy.site:8080/EventTrackerREST/api/groups
#### Comment
- http://www.tappy.site:8080/EventTrackerREST/api/comments
### User REST API:
| Return Type    | Route    | Functionality |
| --------: | ------: |----------: |
| List<User> | GET api/users |    Gets all users |
| User |    GET api/users/{id} |    Gets one user by id |
| User |    POST api/users |    Creates a new user |
| User |    PUT api/users/{id} |    Update a user by id |
| Boolean |    DELETE api/users/{id} |    Deletes a user by id |

### Event REST API:
| Return Type    | Route    | Functionality |
| --------: | ------: |----------: |
| List<Event> | GET api/events |    Gets all User |
| Event |    GET api/events/{id} |    Gets one event entry by id |
| Event |    POST api/events |    Creates a new event |
| Event |    PUT api/events/{id} |    Update an event by id |
| Boolean |    DELETE api/events/{id} |    Deletes an event by id |

### Group REST API:
| Return Type    | Route    | Functionality |
| --------: | ------: |----------: |
| List<Group> | GET api/groups |    Gets all groups |
| Group |    GET api/groups/{id} |    Gets one group by id |
| Group |    POST api/groups |    Creates a new group |
| Group |    PUT api/groups/{id} |    Update a group by id |
| Boolean |    DELETE api/groups/{id} |    Deletes a group by id |

### Comment REST API:
| Return Type    | Route    | Functionality |
| --------: | ------: |----------: |
| List<Comment> | GET api/comments |    Gets all comments |
| Comment |    GET api/comments/{id} |    Gets one comment by id |
| Comment |    POST api/comments |    Creates a new comment |
| Comment |    PUT api/comments/{id} |    Update a comment by id |
| Boolean |    DELETE api/comments/{id} |    Deletes a comment by id |
