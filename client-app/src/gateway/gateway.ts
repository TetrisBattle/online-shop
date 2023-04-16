import axios from 'axios'

const baseApiUrl = 'http://localhost:5000/api'

export async function getActivities() {
	const response = await axios.get(`${baseApiUrl}/Activities`)
	return response.data
}
