import * as func from '../common/js/local'
const state = func.local.get() || {
    event: [],
    count: 0
}
export default state
