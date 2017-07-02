import { call, put } from 'redux-saga/effects'
import { Alert } from 'react-native'
import LoginActions from '../Redux/LoginRedux'
import setCookie from 'set-cookie-parser'

export function * currentUser (api) {
  const response = yield call(api.currentUser)
  api.updateHeader('X-CSRF-TOKEN', setCookie.parse(response)[0].value)
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
    if (response.data.success) {
      yield put(LoginActions.loginSuccess(username))
      Alert.alert('Login success')
    } else {
      Alert.alert('Login failed')
    }
  }
}
