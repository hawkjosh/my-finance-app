const API_URL = 'http://localhost:4000/api'

export const apiGet = async (path) => {
	return fetch(`${API_URL}/${path}`).then((res) => res.json())
}

export const apiAdd = async (path, data) => {
	return fetch(`${API_URL}/${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((res) => res.json())
}

export const apiEdit = async (path, data) => {
	return fetch(`${API_URL}/${path}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then((res) => res.json())
}

export const apiDelete = async (path) => {
	return fetch(`${API_URL}/${path}`, {
		method: 'DELETE',
	}).then((res) => res.json())
}