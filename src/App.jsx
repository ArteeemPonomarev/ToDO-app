import React from 'react';
import './App.css'
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addTodolistAC, setTodolistsAC} from "./store/reducer";
import {api} from "./api";


class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.getTodolists()
            .then(res => {
                this.props.setTodolists(res);
            });
    }


    addTodoList = (title) => {
        api.createTodolist(title)
            .then(res => {
                if (res.resultCode === 0) {
                    this.props.addTodolists(res.data.item);
                }
            });

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
