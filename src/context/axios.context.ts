import axios from "axios";
import Cookie from "js-cookie";


/**
 * It creates an axios instance with the base URL set to the API URL and the Authorization header set to the token stored
 * in the cookie
 * @returns An axios instance with a baseURL and Authorization header.
 */
export function createBackendContext() {
	return axios.create({
		baseURL: getApiURL(),
		headers: {
			Authorization: `Bearer ${Cookie.get(`access`)}`,
		},
	});
}

/**
 * It sends a request to the backend to get a new access token using the refresh token stored in localStorage
 * @returns A function that updates the tokens.
 */
export async function updateTokens() {
	const refresh = localStorage.getItem(`refresh`);
	if (!refresh) return false;

	const ctx = createBackendContext();
	const response = await ctx.get(`/auth/tokens`, {headers: {Refresh: refresh}})
		.catch(() => null);
	if (!response || response.status !== 200) return false;

	Cookie.set(`access`, response.data.access);
	localStorage.setItem(`refresh`, response.data.refresh);
	return true;
}

/**
 * If the hostname contains localhost, return the localhost URL, otherwise return the production URL
 * @returns the api url.
 */
function getApiURL() {
	const host = window.location.host;

	if (host.indexOf(`localhost`) >= 0) {
		return `http://localhost:3000`;
	}

	return `https://192.168.50.130:5000`;
}