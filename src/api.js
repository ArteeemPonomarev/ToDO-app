import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
})

export const api = {
    createTodolist(title) {
        return instance.post('', {title: title})
            .then(res => res.data)
    },
    getTodolists() {
        return instance.get()
            .then(res => res.data)
    },
    deleteTodolist(todolistId) {
        return instance.delete(`${todolistId}`)
            .then(res => res.data)
    },
    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
            .then(res => res.data)
    },
    addTask(newTitle, todolistId) {
        return instance.post(`/${todolistId}/tasks`, {title: newTitle})
            .then(res => res.data)
    },
    changeTask(newTask, todolistId) {
        return instance.put(`/${todolistId}/tasks/${newTask.id}`, newTask)
            .then(res => res.data)
    },
    deleteTask(taskId, todolistId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    changeTodolistTitle(title, todolistId) {
        return instance.put(`/${todolistId}`, {title})
            .then(res => res.data)
    }
}