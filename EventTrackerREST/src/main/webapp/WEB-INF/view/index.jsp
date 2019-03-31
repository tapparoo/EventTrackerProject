<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Event Tracker</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/styles.css">
    <jsp:include page="/WEB-INF/components/bootstrapHead.jsp"></jsp:include>
  </head>
  <body>
  <jsp:include page="/WEB-INF/components/navbar.jsp"></jsp:include>
  
    <div class="container">
    	<div class="row row-content">
    		<div class="col flexme">
				<div class="dropdown">
				  <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="userList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    Select User
				  </button>
				  <button class="btn btn-secondary btn-sm" type="button" id="newUserBtn">New User</button>
				  <div class="dropdown-menu" aria-labelledby="userList" id="userListInnerDiv">
				
				  </div>
				</div>					
				<div class="dropdown">
				  <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="groupList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    Select Group
				  </button>
				  <button class="btn btn-secondary btn-sm" type="button" id="newGroupBtn">New Group</button>
				  <div class="dropdown-menu" aria-labelledby="groupList" id="groupListInnerDiv">
				
				  </div>
				</div>					
				<div class="dropdown">
				  <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="eventList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    Select Event
				  </button>
				  <button class="btn btn-secondary btn-sm" type="button" id="newEventBtn">New Event</button>
				  <div class="dropdown-menu" aria-labelledby="eventList" id="eventListInnerDiv">
				
				  </div>
				</div>					
			</div>
    		<div class="col">
	    		<nav id="userTabs">
				  <div class="nav nav-tabs" id="nav-tab" role="tablist">
				    <a class="nav-item nav-link active" id="nav-user-tab" data-toggle="tab" href="#nav-user" role="tab" aria-controls="nav-user" aria-selected="true">User</a>
				    <a class="nav-item nav-link" id="nav-group-tab" data-toggle="tab" href="#nav-group" role="tab" aria-controls="nav-group" aria-selected="false">Group</a>
				    <a class="nav-item nav-link" id="nav-event-tab" data-toggle="tab" href="#nav-event" role="tab" aria-controls="nav-event" aria-selected="false">Event</a>
			 	  </div>
			 	</nav>
    			<div class="tab-content" id="nav-tabContent">
 					<div class="tab-pane fade show active" id="nav-user" role="tabpanel" aria-labelledby="nav-user-tab">
					    <div class="container">
							<form name="userForm">
							  <div class="form-row">
							    <div class="form-group col-md-6">
							      <label for="username">Username</label>
							      <input type="text" id="username" name="username" class="form-control" placeholder="Username">
							    </div>
							    <div class="col-md-4"></div>
							    <div class="form-group col-md-2">
							      <label for="uid">User ID</label>
							      <input type="text" id="uid" name="uid" class="form-control" disabled>
							    </div>
						      </div>
							  <div class="form-row">
							    <div class="form-group col-md-6">
							      <label for="fname">First Name</label>
							      <input type="text" id="fname" name="firstName" class="form-control" placeholder="First name">
							    </div>
							    <div class="form-group col-md-6">
							      <label for="lname">Last Name</label>
							      <input type="text" id="lname" name="lastName" class="form-control" placeholder="Last name">
							    </div>
							  </div>
							  <div class="form-row">
							    <div class="form-group col-md-6">
							      <label for="email">Email</label>
							      <input type="email" class="form-control" id="email" name="email" placeholder="Email">
							    </div>
							    <div class="form-group col-md-6">
							      <label for="password">Password</label>
							      <input type="password" class="form-control" id="password" name="password" placeholder="Password">
							    </div>
							  </div>
							  <div class="form-row">
							    <div class="form-group col-md-4">
							      <label for="age">Age</label>
							      <input type="number" min="0" max="130" class="form-control" id="age" name="age">
							    </div>
							    <div class="form-group col-md-4">
							      <label for="height">Height(in)</label>
							      <input type="number" min="0" step=".1" max="999" class="form-control" id="height" name="height">
							    </div>
							    <div class="form-group col-md-4">
							      <label for="weight">Weight(lb)</label>
							      <input type="number" min="0" step=".1" max="1000" class="form-control" id="weight" name="weight">
							    </div>
							  </div>
							  <div class="form-row">
							  	<div class="col-md-4">
								  <div class="form-group">
								    <div class="form-check">
								      <input class="form-check-input" type="checkbox" id="active" name="active">
								      <label class="form-check-label" for="active">
								        Enabled?
								      </label>
								    </div>
								    <div class="form-check">
								      <input class="form-check-input" type="checkbox" id="admin" name="admin">
								      <label class="form-check-label" for="admin">
								        Admin?
								      </label>
								    </div>
								  </div>
								  <button type="submit" class="btn btn-sm btn-primary" id="userSaveBtn">Save</button><br/><br/>
								  <button type="button" class="btn btn-sm btn-danger" id="userDeleteBtn">Delete User</button>
							  	</div>
							  </div>
							</form>
					    </div>
				    </div>
					<div class="tab-pane fade" id="nav-group" role="tabpanel" aria-labelledby="nav-group-tab">
					    <div class="container">
							<form name="groupForm">
							  <div class="form-row">
							    <div class="form-group col-md-6">
							      <label for="gname">Name</label>
							      <input type="text" id="gname" name="gname" class="form-control" placeholder="Name">
							    </div>
							    <div class="col-md-4"></div>
							    <div class="form-group col-md-2">
							      <label for="gid">Group ID</label>
							      <input type="text" id="gid" name="gid" class="form-control" disabled>
							    </div>
						      </div>
							  <div class="form-row">
							    <div class="form-group col-md-6">
							      <label for="description">Description</label>
							      <input type="text" id="gdesc" name="gdesc" class="form-control" placeholder="Description">
							    </div>
							  </div>
							 
							  <div class="form-row">
							  	<div class="col-md-4">
								  <div class="form-group">
								    <div class="form-check">
								      <input class="form-check-input" type="checkbox" id="groupIsActive" name="active">
								      <label class="form-check-label" for="groupIsActive">
								        Enabled?
								      </label>
								    </div>
								  </div>
								  <button type="submit" class="btn btn-sm btn-primary" id="groupSaveBtn">Save</button><br/><br/>
 								  <button type="button" class="btn btn-sm btn-danger" id="groupDeleteBtn">Delete Group</button>
							  	</div>
							  	<div class="col-md-8">
				 					<div class="dropdown flexme">
									  <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="usergroupList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									    Group Members
									  </button>
									  <div class="dropdown-menu" aria-labelledby="usergroupList" id="usergroupListInnerDiv">
									  </div>
									</div>	<br/>
				 					<div class="dropdown flexme">
									  <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="groupeventList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									    Group Events
									  </button>
									  <div class="dropdown-menu" aria-labelledby="groupeventList" id="groupeventListInnerDiv">
									  </div>
									</div>	
							  	</div>
							  </div>
							</form>
					    </div>
				    </div>
					<div class="tab-pane fade" id="nav-event" role="tabpanel" aria-labelledby="nav-event-tab">
					    <div class="container">
							<form name="eventForm">
							  <div class="form-row">
							    <div class="form-group col-md-6">
							      <label for="ename">Name</label>
							      <input type="text" id="ename" name="ename" class="form-control" placeholder="Name">
							    </div>
							    <div class="col-md-4"></div>
							    <div class="form-group col-md-2">
							      <label for="eid">Event ID</label>
							      <input type="text" id="eid" name="eid" class="form-control" disabled>
							    </div>
						      </div>
							  <div class="form-row">
							    <div class="form-group col-md-6">
							      <label for="edesc">Description</label>
							      <input type="text" id="edesc" name="edesc" class="form-control" placeholder="Description">
							    </div>
							    <div class="form-group col-md-6">
							      <label for="eventAdmin">Event admin</label>
							      <input type="email" id="eventAdmin" name="eventAdmin" class="form-control" placeholder="Event admin email">
							    </div>
							  </div>
							 
							  <div class="form-row">
							  	<div class="col-md-4">
								  <div class="form-group">
								    <div class="form-check">
								      <input class="form-check-input" type="checkbox" id="eventIsActive" name="active">
								      <label class="form-check-label" for="eventIsActive">
								        Enabled?
								      </label>
								    </div>
								  </div>
								  <button type="submit" class="btn btn-sm btn-primary" id="eventSaveBtn">Save</button><br/><br/>
 								  <button type="button" class="btn btn-sm btn-danger" id="eventDeleteBtn">Delete Event</button>
							  	</div>
							  </div>
							</form>
					    </div>
				    </div>
    			</div>
    		</div>
    	</div>
    </div>

  <jsp:include page="/WEB-INF/components/bootstrapFoot.jsp"></jsp:include>
  <script type="text/javascript" src="js/functions.js"></script>
  <script type="text/javascript" src="js/init.js"></script>
  </body>
</html>
