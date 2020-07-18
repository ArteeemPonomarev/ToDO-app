import {api} from "../api";
import {TaskType, TodoType, TodoUpdateObject} from "../types/entities";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";

const ADD_TODOLIST = 'Todolist/Reducer/ADD_TODOLIST';
const DELETE_TODOLIST = 'Todolist/Reducer/DELETE_TODOLIST';
const ADD_TASK = 'Todolist/Reducer/ADD_TASK';
const DELETE_TASK = 'Todolist/Reducer/DELETE_TASK';
const UPDATE_TASK = 'Todolist/Reducer/UPDATE_TASK';
const SET_TODOLISTS = 'Todolist/Reducer/SET_TODOLISTS';
const SET_TASKS = 'Todolist/Reducer/SET_TASKS';
const CHANGE_TODOLIST_TITLE = 'Todolist/Reducer/CHANGE_TODOLIST_TITLE';


type InitialStateType = {
    todolists: Array<TodoType>
}

const initialState: InitialStateType = {
    todolists: []
}


const reducer = (state: InitialStateType = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
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
                                    return {...action.newTask}
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
        case CHANGE_TODOLIST_TITLE:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolist.id) {
                        return tl
                    } else {
                        return {
                            ...tl,
                            title: action.todolist.title || tl.title
                        }
                    }
                })
            }
        default:
            return state
    }
}
export default reducer;
//Action Creators
type ActionType =
    AddTaskActionType
    | AddTodolistActionType
    | DeleteTodolistActionType
    | DeleteTaskActionType
    | UpdateTaskActionType
    | SetTasksActionType
    | SetTodolistActionType
    | ChangeTodolistTitleAtionType


type AddTodolistActionType = {
    type: typeof ADD_TODOLIST
    newTodolist: TodoType
}
export const addTodolistAC = (newTodolist: TodoType): AddTodolistActionType => {
    return {type: ADD_TODOLIST, newTodolist}
}


type AddTaskActionType = {
    type: typeof ADD_TASK
    newTask: TaskType
    todolistId: string
}
export const addTaskAC = (todolistId: string, newTask: TaskType): AddTaskActionType => {
    return {type: ADD_TASK, todolistId, newTask}
}


type DeleteTodolistActionType = {
    type: typeof DELETE_TODOLIST
    todolistId: string
}
export const deleteTodolistAC = (todolistId: string): DeleteTodolistActionType => {
    return {type: DELETE_TODOLIST, todolistId}
}


type DeleteTaskActionType = {
    type: typeof DELETE_TASK
    todolistId: string
    taskId: string
}
export const deleteTaskAC = (todolistId: string, taskId: string): DeleteTaskActionType => {
    return {type: DELETE_TASK, todolistId, taskId}
}


type UpdateTaskActionType = {
    type: typeof UPDATE_TASK
    newTask: TaskType
}
export const updateTaskAC = (newTask: TaskType): UpdateTaskActionType => {
    return {type: UPDATE_TASK, newTask}
}


type SetTodolistActionType = {
    type: typeof SET_TODOLISTS
    todolists: Array<TodoType>
}
export const setTodolistsAC = (todolists: Array<TodoType>): SetTodolistActionType => {
    return {type: SET_TODOLISTS, todolists}
}


type SetTasksActionType = {
    type: typeof SET_TASKS
    todolistId: string
    tasks: Array<TaskType>
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {
        type: SET_TASKS
        , todolistId, tasks
    }
}

type ChangeTodolistTitleAtionType = {
    type: typeof CHANGE_TODOLIST_TITLE
    todolist: TodoUpdateObject
}
export const changeTodolistTitleAC = (todolist: TodoUpdateObject):ChangeTodolistTitleAtionType => {
    return {type: CHANGE_TODOLIST_TITLE, todolist}
}

//Thunk Creators
// 1 - варииант
// export const setTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
//     api.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res));
//         });
// }

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>;
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionType>
// 2 - вариант
export const setTodolistsTC = (): ThunkType => (dispatch: ThunkDispatchType) => {
    api.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res));
        });
}
export const addTodoList = (title: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.createTodolist(title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(addTodolistAC(res.data.item));
            }
        });
}
export const getTasks = (todolistId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.getTasks(todolistId)
        .then(res => {
            if (!res.error) {
                dispatch(setTasksAC(todolistId, res.items))
            }
        })
}
export const addTask = (newTitle: string, todolistId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.addTask(newTitle, todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(addTaskAC(todolistId, res.data.item));
            }
        });
}
export const changeTask = (newTask: TaskType, todolistId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.changeTask(newTask, todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(updateTaskAC(res.data.item));
            }
        })
}
export const deleteTodolist = (todolistId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.deleteTodolist(todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(deleteTodolistAC(todolistId));
            }
        });
}
export const deleteTask = (todolistId: string, taskId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.deleteTask(taskId, todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId));
            }
        });
}
export const changeTodolistTitle = (title: string, todolistId: string): ThunkType => (dispatch: ThunkDispatchType) => {
    api.changeTodolistTitle(title, todolistId)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(changeTodolistTitleAC({title: title, id: todolistId}))
            }
        });
}