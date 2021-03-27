import { SHOWS_CACHE_LOCAL_KEY } from '../utils/Constants';

/**
 * Get shows cached by query
 * @param {String} query
 * @returns {Object[]}
 */
export function getShowsCachedByPage(page) {
  const data = JSON.parse(localStorage.getItem(SHOWS_CACHE_LOCAL_KEY));
  if (data && page === data.page) {
    return data.results;
  }
  return [];
}

/**
 * Fetch shows by page
 * @param {Number} page
 * @returns {Object[]}
 */
export async function fetchShowsByPage(page = 0) {
  const cache = getShowsCachedByPage(page);
  if (cache.length > 0) {
    return cache;
  }
  const results = await fetch(`https://api.tvmaze.com/shows?page=${page}`).then((res) => res.json());
  localStorage.setItem(SHOWS_CACHE_LOCAL_KEY, JSON.stringify({
    page,
    results,
  }));
  return results;
}

/**
 *
 * @param {String} query
 * @returns {Promise}
 */
export function searchShows(query) {
  return fetch(`https://api.tvmaze.com/search/shows?q=${query}`).then((res) => res.json());
}
