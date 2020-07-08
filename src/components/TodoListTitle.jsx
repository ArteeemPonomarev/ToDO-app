import React from 'react';


class TodoListTitle extends React.Component {

    state = {
        isEditMode: false,
        title: this.props.title
    }

    activateMode = () => {
        this.setState({isEditMode: true})
    }

    deactivateMode = () => {
        this.setState({isEditMode: false})
        this.props.changeTodolistTitle(this.state.title);
    }

    onTitleChange = (e) => {
        this.setState({title: e.currentTarget.value})
    }


    render = () => {
        return (
            <div>
                {!this.state.isEditMode
                    ? <h3 className='todoList-header__title'
                          onClick={this.activateMode}>{this.props.title}
                        <button onClick={this.props.deleteTodolist}>x</button>
                    </h3>
                    : <input type='text'
                             autoFocus={true}
                             onBlur={this.deactivateMode}
                             onChange={this.onTitleChange}
                             value={this.state.title}/>
                }
            </div>
        );
    }
}


export default TodoListTitle;