import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {
    
    tasks =[
        {isDone: true, title: "CSS", priority: "low"},
        {isDone: false, title: "JS", priority: "low"},
        {isDone: false, title: "ReactJS", priority: "high"},
        {isDone: true, title: "Patterns", priority: "high"}
    ];

    filterValue = "Completed";
    
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks tasks = {this.tasks}/>
                    <TodoListFooter filterValue = {this.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

