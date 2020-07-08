import React from 'react';
import './App.css'
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, setTodolistsTC} from "./store/reducer";
import {AppStateType} from "./store/store";
import {TodoType} from "./types/entities";

type MapStatePropsType = {
    todolists: Array<TodoType>
}
type MapDispatchPropsType = {
    getTodo:() => void
    addTodolists: (title: string) => void
}

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTodo()
    }

    addTodoList = (title: string) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.reducer.todolists
    }
}

const mapDispatchToProps = (dispatch: any):MapDispatchPropsType => {
    return {
        addTodolists: (title) => {
            dispatch(addTodoList(title));
        },
        getTodo: () => {
            dispatch(setTodolistsTC());
        }
    }
}

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
