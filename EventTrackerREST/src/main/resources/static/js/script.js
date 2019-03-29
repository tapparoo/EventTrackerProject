let getAllGroups = (function() {
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
})();

let getAllEvents = (function() {
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
})();

let getEventsByGroup = function(group) {
	let xhr = new XMLHttpRequest();
	let path = 'api/groups/' + group.id + '/events'
	xhr.open('GET', path, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var data = JSON.parse(xhr.responseText);
			return data;
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};

	xhr.send(null);
}


let getAllUsers = (function() {
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
})();

let loadUserDropdown = function(users){
	let dropdown = document.getElementById('userListInnerDiv');
	
	for (let i = 0; i < users.length; i++){
		let user = users[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.textContent = `${user.id}: ${user.firstName} ${user.lastName} - ${user.username}`;
		dropdown.append(btn);
	}
}

let loadGroupDropdown = function(groups){
	let dropdown = document.getElementById('groupListInnerDiv');
	
	for (let i = 0; i < groups.length; i++){
		let group = groups[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.textContent = `${group.id}: ${group.name} - Active: ${group.active}`;
		dropdown.append(btn);
	}
}

let loadEventDropdown = function(events){
	let dropdown = document.getElementById('eventListInnerDiv');
	
	for (let i = 0; i < events.length; i++){
		let event = events[i];
		let btn = document.createElement('button');
		btn.classList.add('dropdown-item');
		btn.setAttribute('type', 'button');
		btn.textContent = `${event.id}: ${event.name} - Active: ${event.active}`;
		dropdown.append(btn);
	}
}

