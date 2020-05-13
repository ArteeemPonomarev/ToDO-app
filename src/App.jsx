import React from 'react';
import './App.css'
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";


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
        }
        this.nextTodoListId++;
        let newToDoLists = [...this.state.todolists, newTodoList];
        this.setState({todolists: newToDoLists}, this.saveState);
    }


    render = () => {

        const todoLists = this.state.todolists.map(tl => <TodoList key={tl.id}
                                                                   id={tl.id}
                                                                   title={tl.title}/>)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className='App'>
                    {todoLists}
                </div>
            </>
        )
    }
}

export default App;