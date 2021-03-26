import { RANDOM_USERS_LOCAL_KEY } from '../utils/Constants';

/**
 * Fetch random users from randomuser.me
 */
export async function fetchRandomUsers() {
  const { results } = await fetch('https://randomuser.me/api?results=5&seed=abc').then((res) => res.json());
  localStorage.setItem(RANDOM_USERS_LOCAL_KEY, JSON.stringify(results));
  return results;
}

/**
 * Get random users saved in localstorage
 * @returns {Object[]}
 */
export function getRandomUsers() {
  const users = JSON.parse(localStorage.getItem(RANDOM_USERS_LOCAL_KEY));
  return users;
}

/**
 *
 * @param {String} username
 * @param {String} password
 * @param {Function} setAuthToken
 * @param {Function} setSessionUserData
 * @returns {Object | null}
 */
export function login(username, password, setAuthToken, setSessionUserData) {
  const users = getRandomUsers();
  const foundUser = users.find((user) => user.login.username === username);
  if (foundUser && foundUser.login.password === password) {
    setAuthToken(foundUser.login.uuid);
    setSessionUserData(foundUser);
    return foundUser;
  }
  return null;
}
