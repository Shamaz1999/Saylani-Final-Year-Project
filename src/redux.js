import { createStore,combineReducers} from 'redux';
import updatee from './reducer/update'
import userReducer from'./reducer/userreducer'
import adsReducer from './reducer/adsReducer'
import theme from './reducer/theme'
import socket from './reducer/socket';
let allreducer = combineReducers({ userReducer,updatee,adsReducer,socket,theme});
let store = createStore(allreducer);

export default store;