import React from 'react';
import './App.css'
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";


class App extends React.Component {
    componentDidMount() {
        this.restoreState()
    }

    nextTodoListId = 0;

    state = {
        todolists: []
    }


    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('main-state', stateAsString)
    }

    restoreState = () => {
        //let state = this.state
        let state = {
            todolists: []
        }
        let stateAsString = localStorage.getItem('main-state');
        if (stateAsString) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.todolists.forEach(tl => {
                    if (tl.id >= this.nextTodoListId) {
                        this.nextTodoListId = tl.id + 1;
                    }
                }
            )
        })
    }


    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextTodoListId,
            title: title,
            tasks: []
        }
        //this.nextTodoListId++;
        //let newToDoLists = [...this.state.todolists, newTodoList];
        // this.setState({todolists: newToDoLists}, this.saveState);
        this.props.createTodolists(newTodoList);
        this.nextTodoListId++;
    }


    render = () => {

        const todolists = this.props.todolists.map(tl => <TodoList key={tl.id}
                                                                   id={tl.id}
                                                                   title={tl.title}
                                                                   tasks={tl.tasks}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className='App'>
                    {todolists}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTodolists: (newTodolist) => {
            let action = {
                type: 'ADD-TODOLIST',
                newTodolist
            };
            dispatch(action)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
