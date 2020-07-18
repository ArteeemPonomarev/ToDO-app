import axios from "axios";
import {TaskType, TodoType, TodoUpdateObject} from "./types/entities";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
})

type CommonApiType<T> = {
    resultCode: 0 | 1 | 100
    messages: Array<string>
    data: T
}

// type CreateTodoType = {
//     resultCode: 0 | 1 | 100
//     messages: Array<string>
//     data: {
//         item: TodoType
//     }
// }
//
// type ResponseType2 = {
//     resultCode: 0 | 1 | 100
//     messages: Array<string>
//     data: {
//         item: TaskType
//     }
// }
//
// type ResponseType3 = {
//     resultCode: 0 | 1 | 100
//     messages: Array<string>
//     data: {}
// }


export const api = {
    createTodolist(title: string) {
        return instance.post<CommonApiType<{item:TodoType}>>('', {title: title})
            .then(res => res.data)
    },
    getTodolists() {
        return instance.get('')
            .then(res => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`${todolistId}`)
            .then(res => res.data)
    },
    getTasks(todolistId: string) {
        return instance.get(`/${todolistId}/tasks`)
            .then(res => res.data)
    },
    addTask(newTitle: string, todolistId: string) {
        return instance.post<CommonApiType<{item:TaskType}>>(`/${todolistId}/tasks`, {title: newTitle})
            .then(res => res.data)
    },
    changeTask(newTask: TodoUpdateObject, todolistId: string) {
        return instance.put(`/${todolistId}/tasks/${newTask.id}`, newTask)
            .then(res => res.data)
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    changeTodolistTitle(title: string, todolistId: string) {
        return instance.put(`/${todolistId}`, {title})
            .then(res => res.data)
    }
}