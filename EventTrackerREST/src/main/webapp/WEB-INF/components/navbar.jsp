<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<style>
	.navbar{
		background-color: #739eb7!important;
	}
	.navbar-brand, #navSearchButton{
		color: white!important;
	    font-weight: bold;
	}
	#navbarSupportedContent,.btn-outline-warning{
	    background-color: #779db8;
		border-color: #caced3!important;
		color: white!important;
		margin:5px;
		justify-content: flex-end;
	}
</style>

<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
  <a class="navbar-brand" href="home.do">Event Tracker</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		Logged in as: Administrator  
	</div>
</nav>
