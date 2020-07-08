export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoList: string
    order: number
    addedDate: string
    todoListId?: string
}


export type TodoUpdateObject = {
    status?: number
    title?: string
    id?: string
}


