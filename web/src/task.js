let axios = require('axios');

export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'

export const FETCH_ALL_TASK = 'task/FETCH_ALL_TASK'
export const FETCH_ALL_USER = 'task/FETCH_ALL_USER'
export const FETCH_LOGIN_USER = 'task/FETCH_LOGIN_USER'
export const ADD_TASK = 'task/ADD_TASK'
export const UPDATE_TASK = 'task/UPDATE_TASK'
export const UPDATE_TASKLIST = 'task/UPDATE_TASKLIST'

const initialState = {
    tasks: [],
    loading: false,
    loginUser: {},
    users: [],
    count: 0,
    isIncrementing: false,
    isDecrementing: false
}

let apiEndpoint = "/";
if (process.env.NODE_ENV === 'development') {
    apiEndpoint = "http://localhost:8000/";
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

      case UPDATE_TASKLIST:
      return {
        ...state,
        tasks: action.taskList
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}

export const incrementAsync = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: INCREMENT
      })
    }, 3000)
  }
}

export const decrement = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    dispatch({
      type: DECREMENT
    })
  }
}

export const decrementAsync = () => {
  return dispatch => {
    dispatch({
      type: DECREMENT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: DECREMENT
      })
    }, 3000)
  }
}


export const getTasks = () => {
    let url = apiEndpoint+"gettasks";   

    return (dispatch) => {
        dispatch({
            type: FETCH_ALL_TASK
          })
        return axios.get(url).then(
            (response) => {
                //let taskList = response.data.items.slice(0,10)
                let taskList = response.data;
                console.log(taskList);
                dispatch({
                    type: UPDATE_TASKLIST,
                    taskList
                  })
            },
            (err) => {
                console.log(err);
            }
        )

    }
}
