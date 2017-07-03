import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { GroupTypes } from '../Redux/GroupRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, currentUser } from './LoginSagas'
import { getDailyForDate } from './GroupSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.CURRENT_USER, currentUser, api),
    takeLatest(GroupTypes.REQUEST_DAILY, getDailyForDate, api)
  ]
}
