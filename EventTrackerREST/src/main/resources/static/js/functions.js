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

let loadGroupUsersDropdown = function(users, group) {
	let dropdown = document.getElementById('groupuserListInnerDiv');
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
		btn.innerHTML = "<button class='redx' data-toggle='tooltip' "
			+ "data-placement='left' title='Leave this group'>X</button> "
			+ ` ${user.id}: ${user.firstName} ${user.lastName} - ${user.username}`;
		btn.children[0].addEventListener('click', function(e) {
			e.preventDefault();
			removeUserFromGroup(user.id, group);
		});
		dropdown.append(btn);
	}
}

let loadGroupEventsDropdown = function(events, group) {
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
		btn.innerHTML = "<button class='redx' data-toggle='tooltip' "
			+ "data-placement='left' title='Leave this group'>X</button> "
			+ ` ${event.id}: ${event.name} - Active: ${event.active}`;
		btn.children[0].addEventListener('click', function(e) {
			e.preventDefault();
			removeEventFromGroup(event.id, group);
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
		getUsersByGroup(group);
		getEventsByGroup(group);
	} else {
		groupForm.gid.value = '';
		groupForm.gname.value = '';
		groupForm.gdesc.value = '';
		groupForm.groupIsActive.checked = '';
	}
	$('#nav-group-tab').click();
}

let getUsersByGroup = function(group) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', `api/groups/${group.id}/users`, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			loadGroupUsersDropdown(data, group);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}

let getEventsByGroup = function(group) {
	let xhr = new XMLHttpRequest();
	let path = `api/groups/${group.id}/events`
	xhr.open('GET', path, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			loadGroupEventsDropdown(data, group);
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

let removeUserFromGroup = function(uid, group) {
	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', `api/users/${uid}/groups/${group.id}`, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				populateGroupData(group);
			} else {
				console.log("DELETE request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send(uid, group.id);
}

let removeEventFromGroup = function(eid, group) {
	var xhr = new XMLHttpRequest();
	
	xhr.open('DELETE', `api/groups/${group.id}/events/${eid}`, true);
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				populateGroupData(group);
			} else {
				console.log("DELETE request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send(uid, group.id);
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

let getUserById = function(id) {
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

let getGroupsByUser = function(user) {
	let xhr = new XMLHttpRequest();
	let path = `api/users/${user.id}/groups`
	xhr.open('GET', path, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			let data = xhr.responseText;
			if (data !== '') {
				data = JSON.parse(xhr.responseText);
			}
			loadUserGroupsDropdown(user, data);
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
		if (user.heightInInches > 0 && user.weightInPounds > 0) {
			let bmi = "" + (user.weightInPounds
					/ (user.heightInInches * user.heightInInches) * 705.0);
			if (bmi.length > 4) {
				userForm.bmi.value = bmi.substring(0, 4);
			}
		} else {
			userForm.bmi.value = 0.0;
		}

		getGroupsByUser(user)
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

let loadUserGroupsDropdown = function(user, groups) {
	let dropdown = document.getElementById('usergroupListInnerDiv');
	let btns = dropdown.getElementsByClassName('dropdown-item');

	if (btns.length >= 1) {
		for (let i = btns.length - 1; i >= 0; i--) {
			dropdown.removeChild(btns[i]);
		}
	}

	for (let i = 0; i < groups.length; i++) {
		let group = groups[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.innerHTML = "<button class='redx' data-toggle='tooltip' "
				+ "data-placement='left' title='Leave this group'>X</button> "
				+ ` ${group.id}: ${group.name} - Active: ${group.active}`;
		btn.children[0].addEventListener('click', function(e) {
			e.preventDefault();
			removeGroupFromUser(user, group.id)
		});
		dropdown.append(btn);
	}
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

let removeGroupFromUser = function(user, gid) {
	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', `api/users/${user.id}/groups/${gid}`, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				populateUserData(user);
			} else {
				console.log("DELETE request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send(user.id, gid);
}

let addGroupToUser = function(uid, gid) {
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', `api/users/${uid}/groups/${gid}`, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				populateUserData(JSON.parse(xhr.responseText));
			} else {
				console.log("PUT request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send(uid, gid);
}
