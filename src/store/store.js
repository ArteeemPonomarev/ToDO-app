import {createStore} from "redux";

const initialState = {
    todolists: [
        // {
        //     id: 0, title: 'What to learn', tasks: [
        //         {id: 0, title: 'html', isDone: false, priority: 'low'},
        //         {id: 1, title: 'css', isDone: false, priority: 'medium'},
        //         {id: 2, title: 'js', isDone: false, priority: 'high'}
        //     ]
        // },
        // {
        //     id: 1, title: 'Frameworks', tasks: [
        //         {id: 0, title: 'React', isDone: false, priority: 'high'},
        //         {id: 1, title: 'Angular', isDone: false, priority: 'low'},
        //         {id: 2, title: 'Vue', isDone: false, priority: 'low'}]
        // },
   ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return {
                ...state,
                todolists: [ action.newTodolist, ...state.todolists]
            }
        case 'ADD-TASK':
            return {
                ...state, todolists: state.todolists.map(todo => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {...todo, tasks: [...todo.tasks, action.newTask]}
                    }
                })
            }
        case 'CHANGE-TASK':
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
        case 'DELETE-TODOLIST':
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            }
        case 'DELETE-TASK':
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
        default:
            return state
    }
}

const store = createStore(reducer);
export default store;