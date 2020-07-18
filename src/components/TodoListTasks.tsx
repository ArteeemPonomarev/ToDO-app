import React from 'react';
import TodoListTask from './TodoListTask';
import {TaskType} from "../types/entities";

type OwnPropsType = {
    id: string
    tasks: Array<TaskType>
    changeTitle: (task: TaskType, title: string) => void
    changeStatus:(task: TaskType, checked: boolean) => void
    deleteTask: (id: string, todoId: string) => void
}


class TodoListTasks extends React.Component<OwnPropsType> {
    render = () => {

        let taskElements = this.props.tasks.map(t => <TodoListTask task={t}
                                                                   key={t.id}
                                                                   todolistId={this.props.id}
                                                                   changeStatus={this.props.changeStatus}
                                                                   changeTitle={this.props.changeTitle}
                                                                   deleteTask={this.props.deleteTask}/>);

        return (   
        <div className="todoList-tasks">
            {taskElements}
        </div>      
        );
    }
}

export default TodoListTasks;


