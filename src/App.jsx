import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';


class App extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
        // setTimeout(() => {
        //     let newTask = {
        //         isDone: false,
        //         title: 'PHP',
        //         priority: 'low'
        //     }

        //     let newTasks = [...this.state.tasks, newTask];
        //     this.setState ({ tasks: newTasks });
            //this.setState ({ tasks: [...this.state.tasks, newTask]}); передаем объект
            //---либо----
            //this.setState ((state) => ({ tasks: [...state.tasks, newTask]}));  передаем callback, который возвращает объект


            // this.state.tasks.push(newTask);// запушили таску только через 2 сек., а метод render повторно не был вызван, поэтому она не отрисовалась
            // console.log(this.state.tasks)
        // }, 2000)
    };
    state = {
        tasks: [
            { isDone: true, title: "CSS", priority: "low" },
            { isDone: false, title: "JS", priority: "low" },
            { isDone: false, title: "ReactJS", priority: "high" },
            { isDone: true, title: "Patterns", priority: "high" }
        ],

        filterValue: "All"
    };

    onAddTaskClick = () => {
        let newText = this.newTaskTitleRef.current.value;
        this.newTaskTitleRef.current.value = '';
        let newTask = {
            isDone: false,
            title:  newText,
            priority: 'low'
        }

        let newTasks = [...this.state.tasks, newTask];
        this.setState ({ tasks: newTasks });
        
    };

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader onAddTaskClick = {this.onAddTaskClick} newTaskTitleRef = {this.newTaskTitleRef} />
                    {/* <div className="todoList-header">
                    <h3 className="todoList-header__title">What to Learn</h3>
                    <div className="todoList-newTaskForm">
                        <input type="text" placeholder="New task name" ref = {this.newTaskTitleRef}/>
                        <button onClick={this.onAddTaskClick}>Add</button>
                    </div>
                </div>  */}
                    <TodoListTasks tasks={this.state.tasks} />
                    <TodoListFooter filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

