// mutations里写函数怎样更改state
import * as types from './mutation-types'
import * as func from '../common/js/local'

const mutations = {
  [types.ADDEVENT](states, obj) {
    states.count++;
    obj.id = states.count;
    states.event.unshift(obj);
    func.local.set(states);
  },
  [types.EVENTDONE](states, obj) {
    for (let i = 0; i < states.event.length; i++) {
      if (states.event[i].id === obj) {
        states.event[i].type = 2;
        states.event[i].time = func.getDate();
        var item = states.event[i];
        states.event.splice(i, 1);
        break;
      }
    }
    states.event.unshift(item);
    func.local.set(states);
  },
  [types.DELETEEVENT](states, obj){
    for(let i in states.event){
      if(states.event[i].id==obj){
        states.event.splice(i, 1)
        break
      }
    }
    func.local.set(states)
  }
}

export default mutations
