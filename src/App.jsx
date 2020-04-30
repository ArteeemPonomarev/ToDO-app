import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';


class App extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    // constructor(props) {
    //     super(props);
    //     this.newTaskTitleRef = React.createRef();
    // };
    state = {
        tasks: [
            { isDone: true, title: "CSS", priority: "low" },
            { isDone: false, title: "JS", priority: "low" },
            { isDone: false, title: "ReactJS", priority: "high" },
            { isDone: true, title: "Patterns", priority: "high" }
        ],

        filterValue: "All"
    };

    addTask = (newTitle) => {
        //let newText = this.newTaskTitleRef.current.value;
        //this.newTaskTitleRef.current.value = '';
        let newTask = {
            isDone: false,
            title:  newTitle,
            priority: 'low'
        }

        let newTasks = [...this.state.tasks, newTask];
        this.setState ({ tasks: newTasks });
        
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    };

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t === task) {
                return {...t, isDone: isDone}
            }
            return t
        })
        this.setState({tasks: newTasks})
    };

    render = () => {

        let filteredTasks = 
            this.state.tasks.filter(t => {
                // eslint-disable-next-line default-case
                switch (this.state.filterValue){
                    case 'Active':
                        return !t.isDone;
                    case 'Completed':
                        return t.isDone;
                    case 'All':
                            return true;
                    default:
                        return true;
                }});

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask = {this.addTask}/>
                    <TodoListTasks tasks={filteredTasks} changeStatus={this.changeStatus}/>
                    <TodoListFooter filterValue={this.state.filterValue}
                                    changeFilter={this.changeFilter}
                     />
                </div>
            </div>
        );
    }
}

export default App;

