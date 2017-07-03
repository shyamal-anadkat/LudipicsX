import { call, put } from 'redux-saga/effects'
import GroupActions from '../Redux/GroupRedux'

export function * getDailyForDate (api, action) {
  const response = yield call(api.dailies, {'date': action.date})
  console.log(response)
  yield put(GroupActions.setDaily(response.data))
}
