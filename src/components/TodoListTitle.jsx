import React from 'react';
import {connect} from "react-redux";
import {changeTaskTitle} from "../store/reducer";
import axios from 'axios';


class TodoListTitle extends React.Component {

    state = {
        isEditMode: false,
        title: this.props.title
    }

    activateMode = () => {
        this.setState({isEditMode: true})
    }

    deactivateMode = () => {
        this.setState({isEditMode: false});
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`, {title: this.state.title}, {
            withCredentials: true,
            headers: {'API-KEY': '9b6aada9-34d3-4135-a32f-7e9aacf37623'}
        }).then(res => {
            if (res.data.resultCode === 0) {
                debugger
                this.props.changeTitle(res.data.data)
            }
        })
    }

    onTitleChange = (e) => {
        this.setState({title: e.currentTarget.value})
    }


    render = () => {
        return (
            <h3 className="todoList-header__title">
                {!this.state.isEditMode
                    ? <span >
                        <span onClick={this.activateMode}>{this.props.title}</span> <button onClick={() => {this.props.deleteTodolist(this.props.id)}}>x</button>
                        </span>
                    : <span>
                        <input type='text'
                               autoFocus={true}
                               onBlur={this.deactivateMode}
                               onChange={this.onTitleChange}/>
                    </span>}

            </h3>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        changeTitle: (todolist) => {
            dispatch(changeTaskTitle(todolist))
        }
    }
}

const ContainerTodoListTitle = connect(null, mapDispatchToProps)(TodoListTitle);
export default ContainerTodoListTitle;