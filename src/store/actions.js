// actions里写有几个函数
import * as types from './mutation-types'

export const addevent = ({commit}, param) => commit('ADDEVENT', param)
export const eventdone = ({commit}, param) => commit('EVENTDONE', param)
export const deleteEvent = ({commit}, param) => commit('DELETEEVENT', param)
