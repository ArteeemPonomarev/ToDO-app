const ADD_TODOLIST = 'Todolist/Reducer/ADD_TODOLIST';
const DELETE_TODOLIST = 'Todolist/Reducer/DELETE_TODOLIST';
const ADD_TASK = 'Todolist/Reducer/ADD_TASK';
const DELETE_TASK = 'Todolist/Reducer/DELETE_TASK';
const UPDATE_TASK = 'Todolist/Reducer/UPDATE_TASK';
const SET_TODOLISTS = 'Todolist/Reducer/SET_TODOLISTS';
const SET_TASKS = 'Todolist/Reducer/SET_TASKS';
const CHANGE_TASK_TITLE = 'Todolist/Reducer/CHANGE_TASK_TITLE';

const initialState = {
    todolists: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [ ...state.todolists, action.newTodolist]
            }
        case ADD_TASK:
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {...todo, tasks: [...todo.tasks, action.newTask]}
                    }
                })
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    }
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(todo => {
                    if (todo.id === action.newTask.todoListId) {
                        return {
                            ...todo,
                            tasks: todo.tasks.map(t => {
                                if (t.id === action.newTask.id) {
                                    return {...action.newTask }
                                } else {
                                    return t
                                }
                            })
                        }
                    } else {
                        return todo
                    }
                })
            }
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(todolist => {
                    return {...todolist, tasks: []}
                })
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: action.tasks
                        }
                    } else {
                        return tl

                    }
                })
            }
        case CHANGE_TASK_TITLE:
            debugger
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id != action.todolistId) {
                        return tl
                    } else {
                        return {
                            ...tl,
                            title: action.title
                        }
                    }
                })
            }
        default:
            return state
    }
}

export const addTodolistAC = (newTodolist) => {
    return { type: ADD_TODOLIST, newTodolist}
}

export const deleteTodolistAC = (todolistId) => {
    return { type: DELETE_TODOLIST, todolistId}
}

export const addTaskAC = (todolistId, newTask) => {
    return { type: ADD_TASK, todolistId, newTask}
}

export const deleteTaskAC = (todolistId, taskId) => {
    return { type: DELETE_TASK, todolistId, taskId}
}

export const updateTaskAC = (newTask) => {
    return { type: UPDATE_TASK, newTask}
}

export const setTodolistsAC = (todolists) => {
    return {type: SET_TODOLISTS, todolists}
}

export const setTasksAC = (todolistId, tasks) => {
    return {type: SET_TASKS
        , todolistId, tasks }
}

export const changeTaskTitle = (todolistId, title) => {
    return { type: CHANGE_TASK_TITLE, todolistId, title}
}