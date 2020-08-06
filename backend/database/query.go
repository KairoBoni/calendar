package database

const (
	insertNewUser = `INSERT INTO c_user(first_name, last_name, email, password)
	VALUES ($1, $2, $3, $4);`

	insertNewEvent = `INSERT INTO event(name, description, start_event, end_event)
	VALUES ($1, $2, $3, $4) RETURNING id;`

	insertNewUserEvent = `INSERT INTO user_event(user_email, event_id, confirmed)
	VALUES ($1, $2, $3);`

	getUser = `SELECT * FROM c_user WHERE email=$1`

	getEvents = `SELECT event.id, event.name, event.description, event.start_event, event.end_event, user_event.confirmed FROM event RIGHT JOIN user_event ON user_event.event_id=event.id WHERE user_event.user_email=$1`

	updateEvent = `UPDATE event SET name=$1, description=$2, start_event=$3, end_event=$4 WHERE id=$5`

	deleteUserEvent = `DELETE FROM user_event WHERE event_id=$1;`

	deleteEvent = `DELETE FROM event WHERE id=$1;`

	getUsersEmail = `SELECT email FROM c_user;`

	confirmInvite = `UPDATE user_event SET confirmed=true WHERE user_email=$1 AND event_id=$2`

	refuseInvite = `DELETE FROM user_event WHERE user_email=$1 AND event_id=$2`
)
