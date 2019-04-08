
// This is old/pre-angular code for REST API requests.  Leaving this here for reference



let listeners = (function(e) {
	window.addEventListener('load', function() {
		getAllUsers();
		getAllGroups();
		getAllEvents();
	})

	document.getElementById('userSaveBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				let obj = {
					id : userForm.uid.value,
					firstName : userForm.firstName.value,
					lastName : userForm.lastName.value,
					username : userForm.username.value,
					email : userForm.email.value,
					password : userForm.password.value,
					age : userForm.age.value,
					heightInInches : userForm.height.value,
					weightInPounds : userForm.weight.value,
					admin : userForm.admin.checked,
					active : userForm.active.checked
				}
				let user = JSON.stringify(obj);
				updateUser(obj.id, user);
			})
	document.getElementById('userDeleteBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				let id = userForm.uid.value;
				if (id && id > 0) {
					deleteUser(id);
				}
			})
	document.getElementById('addUserToGroupBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				let uid = userForm.uid.value;
				let gid = document.getElementById('addUserToGroup').value;
				if (uid && gid > 0) {
					addGroupToUser(uid, gid);
				}
			})

	document.getElementById('newUserBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				populateUserData();
			})
	document.getElementById('groupSaveBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				let group = {
					id : groupForm.gid.value,
					name : groupForm.gname.value,
					description : groupForm.gdesc.value,
					active : groupForm.groupIsActive.checked
				};
				updateGroup(JSON.stringify(group));
			})
	document.getElementById('groupDeleteBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				let id = groupForm.gid.value;
				if (id && id > 0) {
					deleteGroup(id);
				}
			})
	document.getElementById('newGroupBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				populateGroupData();
			})
	document.getElementById('eventSaveBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				let obj = {
					id : eventForm.eid.value,
					name : eventForm.ename.value,
					description : eventForm.edesc.value,
					active : eventForm.eventIsActive.checked
				}
				updateEvent(JSON.stringify(obj));
			})
	document.getElementById('eventDeleteBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				let id = eventForm.eid.value;
				if (id && id > 0) {
					deleteEvent(id);
				}
			})
	document.getElementById('newEventBtn').addEventListener('click',
			function(e) {
				e.preventDefault();
				populateEventData();
			})
})();
