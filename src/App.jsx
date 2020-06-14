import React from 'react';
import './App.css'
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodolistsAC} from "./store/reducer";
import axios from 'axios';


class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                debugger
                this.props.setTodolists(res.data);
            });
    }

    nextTodoListId = 0;


    addTodoList = (title) => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, {
            withCredentials: true,
            headers: {'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
        })
            .then(res => {
                if ( res.data.resultCode === 0 ) {
                    debugger
                    this.props.addTodolists(res.data.data.item);
                }
            });

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
        addTodolists: (newTodolist) => {
            dispatch(addTodolistAC(newTodolist))
        },
        setTodolists: (todolists) => {
            dispatch(setTodolistsAC(todolists))
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
