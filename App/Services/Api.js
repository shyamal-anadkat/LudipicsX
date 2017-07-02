// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://api.ludipics.com:3000/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = (username) => api.get('search/users', {q: username})
  const currentUser = () => api.get('api/current-user')
  const signup = (username, email, password) => api.post('api/signup', {'username': username, 'email': email, 'password': password})
  const login = (username, password) => api.post('api/login', {'username': username, 'password': password})
  const logout = () => api.post('api/logout')

  // Non-Auth Calls

  const ludiCategories = (filters = {}) => api.get('api/ludiCategories', filters)
  const ludiCategory = (id) => api.get('api/ludiCategories/' + id)
  const ludiGroups = (filters = {}) => api.get('api/ludiGroups', filters)
  const ludiGroup = (id) => api.get('api/ludiGroups/' + id)
  const dailies = (filters = {}) => api.get('api/dailies', filters)
  const daily = (id) => api.get('api/dailies/' + id)
  const stories = (filters = {}) => api.get('api/stories', filters)
  const story = (id) => api.get('api/stories/' + id)
  const posts = (filters) => api.get('api/posts', filters)
  const post = (id) => api.get('api/posts/' + id)
  const user = (id) => api.get('api/users/' + id)

  // Auth Calls

  const placeUserInLudiCategory = (ludiCategoryID) => api.post('api/auth/ludiCategories', {'ludiCategory': {'id': ludiCategoryID}})
  const makeNewStory = (ludiGroupID) => api.post('api/auth/stories', {'ludiGroup': {'id': ludiGroupID}})
  const deleteStory = (storyID) => api.delete('api/auth/stories/' + storyID)
  // TODO: /api/auth/posts
  const deletePost = (postID) => api.delete('api/auth/posts/' + postID)
  const upvotePost = (postID) => api.post('api/auth/upvote', {'id': postID})

  // Updating Headers (token management)
  const updateHeader = (key, value) => api.setHeader(key, value)
  const updateHeaders = (dict) => api.setHeaders(dict)
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    currentUser,
    signup,
    login,
    logout,
    ludiCategories,
    ludiCategory,
    ludiGroups,
    ludiGroup,
    dailies,
    daily,
    stories,
    story,
    posts,
    post,
    user,
    placeUserInLudiCategory,
    makeNewStory,
    deleteStory,
    deletePost,
    upvotePost,
    updateHeader,
    updateHeaders
  }
}

// let's return back our create method as the default.
export default {
  create
}
