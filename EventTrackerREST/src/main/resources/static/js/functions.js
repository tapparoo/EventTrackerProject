/*
 * 			GROUP STUFF
 */

let getAllGroups = function() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/groups', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			loadGroupDropdown(data);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

let loadGroupDropdown = function(groups) {
	let dropdown = document.getElementById('groupListInnerDiv');
	let btns = dropdown.getElementsByClassName('dropdown-item');

	if (btns.length > 1) {
		for (let i = btns.length - 1; i >= 0; i--) {
			dropdown.removeChild(btns[i]);
		}
	}

	for (let i = 0; i < groups.length; i++) {
		let group = groups[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.textContent = `${group.id}: ${group.name} - Active: ${group.active}`;
		btn.addEventListener('click', function() {
			populateGroupData(group);

		});
		dropdown.append(btn);
	}
}

let loadGroupUsersDropdown = function(users) {
	let dropdown = document.getElementById('usergroupListInnerDiv');
	let btns = dropdown.getElementsByClassName('dropdown-item');
	
	if (btns.length > 1) {
		for (let i = btns.length - 1; i >= 0; i--) {
			dropdown.removeChild(btns[i]);
		}
	}
	
	for (let i = 0; i < users.length; i++) {
		let user = users[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.textContent = `${user.id}: ${user.firstName} ${user.lastName} - ${user.username}`;
		btn.addEventListener('click', function() {
			populateUserData(user)
		});
		dropdown.append(btn);
	}
}

let loadGroupEventsDropdown = function(events) {
	let dropdown = document.getElementById('groupeventListInnerDiv');
	let btns = dropdown.getElementsByClassName('dropdown-item');
	
	if (btns.length > 1) {
		for (let i = btns.length - 1; i >= 0; i--) {
			dropdown.removeChild(btns[i]);
		}
	}
	
	for (let i = 0; i < events.length; i++) {
		let event = events[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.textContent = `${event.id}: ${event.name} - Active: ${event.active}`;
		btn.addEventListener('click', function() {
			populateEventData(event)
		});
		dropdown.append(btn);
	}
}

let populateGroupData = function(group) {
	// empty out the values if this function is being called again after a
	// delete
	if (group) {
		groupForm.gid.value = group.id;
		groupForm.gname.value = group.name;
		groupForm.gdesc.value = group.description;
		groupForm.groupIsActive.checked = group.active;
		getUsersByGroup(group.id);
		getEventsByGroup(group.id);
	} else {
		groupForm.gid.value = '';
		groupForm.gname.value = '';
		groupForm.gdesc.value = '';
		groupForm.groupIsActive.checked = '';
	}
	$('#nav-group-tab').click();
}

let getUsersByGroup = function(id) {
	let xhr = new XMLHttpRequest();
	
	xhr.open('GET', `api/groups/${id}/users`, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			loadGroupUsersDropdown(data);
		}
		
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};
	
	xhr.send(null);
}

let getEventsByGroup = function(id) {
	let xhr = new XMLHttpRequest();
	let path = `api/groups/${id}/events`
	xhr.open('GET', path, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			loadGroupEventsDropdown(data);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

let updateGroup = function(group) {
	var xhr = new XMLHttpRequest();

	if (group.id && group.id > 0) {
		xhr.open('PUT', `api/groups/${group.id}`, true);
	} else {
		xhr.open('POST', `api/groups`, true);
	}

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				getAllGroups();
				populateGroupData(JSON.parse(xhr.responseText));
			} else {
				console.log("PUT/POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				alert(xhr.getResponseHeader('error'))
			}
		}
	}
	xhr.send(group);
}

let deleteGroup = function(id) {
	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', `api/groups/${id}`, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				getAllGroups();
				populateEventData();
			} else {
				console.log("DELETE request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				alert(xhr.getResponseHeader('error'))
			}
		}
	}
	xhr.send(id);
}

/*
 * EVENT STUFF
 */

let loadEventDropdown = function(events) {
	let dropdown = document.getElementById('eventListInnerDiv');
	let btns = dropdown.getElementsByClassName('dropdown-item');

	if (btns.length > 1) {
		for (let i = btns.length - 1; i >= 0; i--) {
			dropdown.removeChild(btns[i]);
		}
	}

	for (let i = 0; i < events.length; i++) {
		let event = events[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.textContent = `${event.id}: ${event.name} - Active: ${event.active}`;
		btn.addEventListener('click', function() {
			populateEventData(event);
		});
		dropdown.append(btn);
	}
}

let populateEventData = function(event) {
	// empty out the values if this function is being called again after a
	// delete
	if (event) {
		eventForm.eid.value = event.id;
		eventForm.ename.value = event.name;
		eventForm.edesc.value = event.description;
		eventForm.eventIsActive.checked = event.active;
	} else {
		eventForm.eid.value = '';
		eventForm.ename.value = '';
		eventForm.edesc.value = '';
		eventForm.eventIsActive.checked = '';
	}
	$('#nav-event-tab').click();
}

let getAllEvents = function() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/events', true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			loadEventDropdown(data);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

let updateEvent = function(event) {
	var xhr = new XMLHttpRequest();

	if (event.id && event.id > 0) {
		xhr.open('PUT', `api/events/${event.id}`, true);
	} else {
		xhr.open('POST', `api/events`, true);
	}

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				getAllEvents();
				populateEventData(JSON.parse(xhr.responseText));
			} else {
				console.log("PUT/POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				alert(xhr.getResponseHeader('error'))
			}
		}
	}
	xhr.send(event);
}

let deleteEvent = function(id) {
	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', `api/events/${id}`, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				getAllEvents();
				populateEventData();
			} else {
				console.log("DELETE request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				alert(xhr.getResponseHeader('error'))
			}
		}
	}
	xhr.send(id);
}

/*
 * USER STUFF
 */

let getAllUsers = function() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/users', true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			loadUserDropdown(data);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

let getUserById = function(id){
	let xhr = new XMLHttpRequest();

	xhr.open('GET', `api/users/${id}`, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			return JSON.parse(xhr.responseText);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

let loadUserDropdown = function(users) {
	let dropdown = document.getElementById('userListInnerDiv');
	let btns = dropdown.getElementsByClassName('dropdown-item');

	if (btns.length > 1) {
		for (let i = btns.length - 1; i >= 0; i--) {
			dropdown.removeChild(btns[i]);
		}
	}

	for (let i = 0; i < users.length; i++) {
		let user = users[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.textContent = `${user.id}: ${user.firstName} ${user.lastName} - ${user.username}`;
		btn.addEventListener('click', function() {
			populateUserData(user);
		});
		dropdown.append(btn);
	}
}

let populateUserData = function(user) {
	// empty out the values if this function is being called again after a
	// delete
	if (user) {
		userForm.firstName.value = user.firstName;
		userForm.lastName.value = user.lastName;
		userForm.username.value = user.username;
		userForm.email.value = user.email;
		userForm.password.value = user.password;
		userForm.age.value = user.age;
		userForm.height.value = user.heightInInches;
		userForm.weight.value = user.weightInPounds;
		userForm.uid.value = user.id;
		userForm.admin.checked = user.admin;
		userForm.active.checked = user.active;
	} else {
		userForm.firstName.value = '';
		userForm.lastName.value = '';
		userForm.username.value = '';
		userForm.email.value = '';
		userForm.password.value = '';
		userForm.age.value = '';
		userForm.height.value = '';
		userForm.weight.value = '';
		userForm.uid.value = '';
		userForm.admin.checked = '';
		userForm.active.checked = '';
	}
	$('#nav-user-tab').click();
}

let updateUser = function(id, user) {
	var xhr = new XMLHttpRequest();

	if (id && id > 0) {
		xhr.open('PUT', `api/users/${id}`, true);
	} else {
		xhr.open('POST', `api/users`, true);
	}

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				getAllUsers();
				populateUserData(JSON.parse(xhr.responseText));
			} else {
				console.log("PUT/POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				alert(xhr.getResponseHeader('error'))
			}
		}
	}
	xhr.send(user);
}

let deleteUser = function(id) {
	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', `api/users/${id}`, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				getAllUsers();
				populateUserData();
			} else {
				console.log("DELETE request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				alert(xhr.getResponseHeader('error'))
			}
		}
	}
	xhr.send(id);
}
