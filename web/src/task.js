import store from './store'
let axios = require('axios');


export const FETCH_ALL_TASK = 'task/FETCH_ALL_TASK'
export const FETCH_USER_DATA = 'task/FETCH_USER_DATA'
export const UPDATE_LOGIN_USER = 'task/UPDATE_LOGIN_USER'
export const UPDATE_ALL_USERS = 'task/UPDATE_ALL_USERS'
export const ADD_TASK = 'task/ADD_TASK'
export const UPDATE_TASK = 'task/UPDATE_TASK'
export const DELETE_TASK = 'task/DELETE_TASK'
export const UPDATE_TASKLIST = 'task/UPDATE_TASKLIST'
export const HIDE_TOAST = 'task/HIDE_TOAST'
export const DISPLAY_TOAST = 'task/DISPLAY_TOAST'
export const APPLY_FILTER = 'task/APPLY_FILTER'
export const SWITCH_HIDE_COMPLETED = 'task/SWITCH_HIDE_COMPLETED'

const initialState = {
    tasks: [],
    loading: false,
    loggedInUser: {},
    filter: 'all',
    hideCompleted: true,
    users: [],
    toast: {
      isOpen: false,
      variant: '',
      message: ''
    }
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

    case APPLY_FILTER:
      return {
        ...state,
        filter: action.filter
      }

    case SWITCH_HIDE_COMPLETED:         
      return {
        ...state,
        hideCompleted: action.hideCompleted
      }

    case HIDE_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          isOpen: false
        }
      }

    case DISPLAY_TOAST:
      return {
        ...state,
        toast: {
          ...state.toast,
          isOpen: true,
          variant: action.toast.variant,
          message: action.toast.message
        }
      }

    default:
      return state
  }
}



export const hideToast = () => {
  return dispatch => {
    dispatch({
      type: HIDE_TOAST
    })
  }
}

export const displayToast = (toast) => {
  return dispatch => {
    dispatch({
      type: DISPLAY_TOAST,
      toast
    })
  }
}

export const applyFilter = (filter) => {
  return dispatch => {
    dispatch({
      type: APPLY_FILTER,
      filter
    });
    dispatch(getTasks());
  }
}

export const switcHideCompleted = (hideCompleted) => {
  return dispatch => {
    dispatch({
      type: SWITCH_HIDE_COMPLETED,
      hideCompleted
    });
    dispatch(getTasks());
  }
}

export const getTasks = () => {
    let url = apiEndpoint+"/task";   

    return (dispatch) => {
        dispatch({
            type: FETCH_ALL_TASK
          })
        return axios.get(url,{
          params: {
              hideCompleted: store.getState().task.hideCompleted,
              filter: store.getState().task.filter
          }
      }).then(
            (response) => {
                //let taskList = response.data.items.slice(0,10)
                let taskList = response.data;
                //console.log(taskList);                
                dispatch({
                    type: UPDATE_TASKLIST,
                    taskList
                  })
                  //dispatch(displayToast({variant: 'success', message: 'Task loaded successfully'}));
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
              dispatch(displayToast({variant: 'error', message: 'Error getting user info!'}));
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
          //config: { headers: {'X-CSRFToken': cookie.load('csrftoken') }}
          //'X-CSRFToken', Cookies.get('csrftoken')
      }).then(
        (response) => {
          dispatch(getTasks());
          dispatch(displayToast({variant: 'success', message: 'Task created successfully'}));
        },
        (err) => {
            console.log(err);
            dispatch(displayToast({variant: 'error', message: 'Error adding task!'}));
        }
    )
  }
}




export const updateTask = (taskId,data) => {
  let url = apiEndpoint+"/task/"+taskId;
  return (dispatch) => {
        dispatch({
        type: UPDATE_TASK
        })
        
      return axios({
          method: 'patch',
          url: url,
          data: data,
      }).then(
        (response) => {
          dispatch(getTasks());
          dispatch(displayToast({variant: 'success', message: 'Task updated successfully'}));
        },
        (err) => {
            console.log(err);
            dispatch(displayToast({variant: 'error', message: 'Error updating task!'}));
        }
    )
  }
}


export const deleteTask = (taskId) => {
  let url = apiEndpoint+"/task/delete/"+taskId;   

  return (dispatch) => {
      dispatch({
          type: DELETE_TASK
        })
      return axios.delete(url).then(
          (response) => {
            dispatch(getTasks());
            dispatch(displayToast({variant: 'info', message: 'Task deleted successfully!'}));       
          },
          (err) => {
              console.log(err);
              dispatch(displayToast({variant: 'error', message: 'Error deleting task!'}));
          }
      )

  }
}
