import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  setLudiGroup: ['ludiGroup'],
  setLudiCategory: ['setLudiCategory'],
  setStories: ['stories'],
  setDaily: ['daily'],
  requestDaily: ['date'],
  requestLudiCategory: null,
  requestLudiGroup: null,
  requestStories: null
})

export const GroupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  ludiGroup: null,
  ludiCategory: null,
  stories: null,
  daily: null,
  fetchingLudiGroup: false,
  fetchingLudiCategory: false,
  fetchingStories: false,
  fetchingDaily: false
})

export const requestLudiGroup = state => state.merge({ fetchingLudiGroup: true })
export const requestLudiCategory = state => state.merge({ fetchingLudiCategory: true })
export const requestDaily = state => state.merge({ fetchingDaily: true })
export const requestStories = state => state.merge({ fetchingStories: true })

export const setLudiGroup = (state, {ludiGroup}) => state.merge({ ludiGroup, fetchingLudiGroup: false })
export const setLudiCategory = (state, {ludiCategory}) => state.merge({ ludiCategory, fetchingLudiCategory: false })
export const setStories = (state, {stories}) => state.merge({ stories, fetchingStories: false })
export const setDaily = (state, {daily}) => state.merge({daily, fetchingDaily: false})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_LUDIGROUP]: requestLudiGroup,
  [Types.REQUEST_LUDICATEGORY]: requestLudiCategory,
  [Types.REQUEST_STORIES]: requestStories,
  [Types.REQUEST_DAILY]: requestDaily,
  [Types.SET_LUDIGROUP]: setLudiGroup,
  [Types.SET_LUDICATEGORY]: setLudiCategory,
  [Types.SET_STORIES]: setStories,
  [Types.SET_DAILY]: setDaily
})

export const getLudiCategory = (state) => state.ludiCategory
export const getLudiGroup = (state) => state.ludiGroup
export const getStories = (state) => state.stories
export const getDaily = (state) => state.daily
