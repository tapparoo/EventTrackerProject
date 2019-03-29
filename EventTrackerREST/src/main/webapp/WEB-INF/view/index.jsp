<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
    		<div class="col">
				<div class="dropdown">
				  <button class="btn btn-secondary dropdown-toggle" type="button" id="userList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    Select User
				  </button>
				  <div class="dropdown-menu" aria-labelledby="userList" id="userListInnerDiv">
				
				  </div>
				</div>					
				<div class="dropdown">
				  <button class="btn btn-secondary dropdown-toggle" type="button" id="groupList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    Select Group
				  </button>
				  <div class="dropdown-menu" aria-labelledby="groupList" id="groupListInnerDiv">
				
				  </div>
				</div>					
				<div class="dropdown">
				  <button class="btn btn-secondary dropdown-toggle" type="button" id="eventList" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				    Select Event
				  </button>
				  <div class="dropdown-menu" aria-labelledby="eventList" id="eventListInnerDiv">
				
				  </div>
				</div>					
			</div>
    		<div class="col">
	    		<nav id="userTabs">
				  <div class="nav nav-tabs" id="nav-tab" role="tablist">
				    <a class="nav-item nav-link active" id="nav-info-tab" data-toggle="tab" href="#nav-user" role="tab" aria-controls="nav-user" aria-selected="true">User</a>
				    <a class="nav-item nav-link" id="nav-stories-tab" data-toggle="tab" href="#nav-group" role="tab" aria-controls="nav-group" aria-selected="false">Group</a>
				    <a class="nav-item nav-link" id="nav-roles-tab" data-toggle="tab" href="#nav-event" role="tab" aria-controls="nav-event" aria-selected="false">Event</a>
			 	  </div>
			 	</nav>
    			<div class="content">
    			<div class="tab-content" id="nav-tabContent">
 					<div class="tab-pane fade" id="nav-user" role="tabpanel" aria-labelledby="nav-user-tab">
					    <div class="container">
								<!-- 		    code goes here             -->
								<!-- 		    code goes here             -->
								<!-- 		    code goes here             -->
					    </div>
				    </div>
					<div class="tab-pane fade" id="nav-group" role="tabpanel" aria-labelledby="nav-group-tab">
					    <div class="container">
								<!-- 		    code goes here             -->
								<!-- 		    code goes here             -->
								<!-- 		    code goes here             -->
					    
					    </div>
				    </div>
					<div class="tab-pane fade" id="nav-event" role="tabpanel" aria-labelledby="nav-event-tab">
					    <div class="container">
								<!-- 		    code goes here             -->
								<!-- 		    code goes here             -->
								<!-- 		    code goes here             -->

					    </div>
				    </div>
    			</div>
    			</div>
    		</div>
    	</div>
    </div>

  <jsp:include page="/WEB-INF/components/bootstrapFoot.jsp"></jsp:include>
  <script type="text/javascript" src="js/script.js"></script>
  </body>
</html>
