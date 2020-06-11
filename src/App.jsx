import React from 'react';
import './App.css'
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC} from "./store/reducer";


class App extends React.Component {
    componentDidMount() {

    }

    nextTodoListId = 0;

    state = {
        todolists: []
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
            dispatch(addTodolistAC(newTodolist))
        },

    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
