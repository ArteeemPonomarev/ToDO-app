import {createStore} from "redux";

const initialState = {
    todolists: [
        {
            id: 0, title: "What to learn", tasks: [
                {id: 0, title: 'css'},
                {id: 1, title: 'css'},
                {id: 2, title: 'css'}
            ]
        },
        {
            id: 1, title: "Books", tasks: [
                {id: 0, title: 'css'},
                {id: 1, title: 'css'},
                {id: 2, title: 'css'}]
        },
        {
            id: 2, title: "Technologies", tasks: [
                {id: 0, title: 'css'},
                {id: 1, title: 'css'},
                {id: 2, title: 'css'}]
        },
        {
            id: 3, title: "Movies", tasks: [
                {id: 0, title: 'css'},
                {id: 1, title: 'css'},
                {id: 2, title: 'css'}]
        }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TODOLIST':
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case 'ADD_TASK':
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {...todo, tasks: [...todo.tasks, action.newTask]}
                    }
                })
            }
        case 'CHANGE_TASK':
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {
                            ...todo, tasks: todo.tasks.map(task => {
                                if (task.id !== action.taskId) {
                                    return task
                                } else {
                                    return {...task, ...action.obj}
                                }
                            })
                        }
                    }
                })
            }
        default:
            return state
    }
}

const store = createStore(reducer);
export default store;