import * as types from '../../actions/types'; 

const initialState = {
    status: undefined 
}; 

const ping = (state = initialState, action) => {
    switch (action.type) {
      case types.PING_REQUEST:
        return null; 
      case types.PING_RESPONSE: 
        return action.data;       
      case types.PING_ERROR: {
        return action.error
      }
      default:
        return state;
    }
};

export default ping;