import cookie from "react-cookie";
let axios = require('axios');

export const INCREMENT_REQUESTED = 'counter/INCREMENT_REQUESTED'
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT_REQUESTED = 'counter/DECREMENT_REQUESTED'
export const DECREMENT = 'counter/DECREMENT'

export const FETCH_ALL_TASK = 'task/FETCH_ALL_TASK'
export const FETCH_USER_DATA = 'task/FETCH_USER_DATA'
export const UPDATE_LOGIN_USER = 'task/UPDATE_LOGIN_USER'
export const UPDATE_ALL_USERS = 'task/UPDATE_ALL_USERS'
export const ADD_TASK = 'task/ADD_TASK'
export const UPDATE_TASK = 'task/UPDATE_TASK'
export const UPDATE_TASKLIST = 'task/UPDATE_TASKLIST'

const initialState = {
    tasks: [],
    loading: false,
    loggedInUser: {},
    users: [],
    count: 0,
    isIncrementing: false,
    isDecrementing: false
}

let apiEndpoint = "/api";
if (process.env.NODE_ENV === 'development') {
    apiEndpoint = "http://localhost:8000/api";
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_USER:
      return {
        ...state,
        loggedInUser: action.loggedInUser
      }

      case UPDATE_TASKLIST:
      return {
        ...state,
        tasks: action.taskList
      }

    case UPDATE_ALL_USERS:
      return {
        ...state,
        users: action.users
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
    let url = apiEndpoint+"/task";   

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


export const getUserInfo = () => {
  let url = apiEndpoint+"/userinfo";   

  return (dispatch) => {
      dispatch({
          type: FETCH_USER_DATA
        })
      return axios.get(url).then(
          (response) => {
              //let taskList = response.data.items.slice(0,10)
              let loggedInUser = response.data.logged_in_user;
              let users = response.data.users;
              console.log(loggedInUser);
              dispatch({
                  type: UPDATE_LOGIN_USER,
                  loggedInUser
                })
              dispatch({
                type: UPDATE_ALL_USERS,
                users
              })
          },
          (err) => {
              console.log(err);
          }
      )

  }
}



export const addTask = (data) => {
  let url = apiEndpoint+"/task/";
  return (dispatch) => {
        dispatch({
        type: ADD_TASK
        })
        
      return axios({
          method: 'post',
          url: url,
          data: data,
          config: { headers: {'X-CSRFToken': cookie.load('csrftoken') }}
          //'X-CSRFToken', Cookies.get('csrftoken')
      }).then(
        (response) => {
          getTasks();
        },
        (err) => {
            console.log(err);
        }
    )
  }
}
