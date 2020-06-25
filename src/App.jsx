import React from 'react';
import './App.css'
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, setTodolistsTC} from "./store/reducer";



class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTodo()
    }

    addTodoList = (title) => {
        this.props.addTodolists(title);
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
        addTodolists: (title) => {
            dispatch(addTodoList(title));
        },
        getTodo: () => {
            dispatch(setTodolistsTC());
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
