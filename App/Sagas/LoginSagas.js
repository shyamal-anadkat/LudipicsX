import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

export function * currentUser (api) {
  const response = yield call(api.currentUser)
  console.log(response.headers)
  yield put(LoginActions.setToken(response.headers['set-cookie']))
}

// attempts to login
export function * login (api, action) {
  const { username, password } = action
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    const response = yield call(api.login, username, password)
    console.log(response)
    yield put(LoginActions.loginSuccess(username))
  }
}
