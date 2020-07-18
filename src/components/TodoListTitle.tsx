import React from 'react';

type StateType = {
    isEditMode: boolean
    title: string
}

type OwnPropsType = {
    changeTodolistTitle: (title: string) => void
    title: string
    deleteTodolist: () => void
    id: string
}


class TodoListTitle extends React.Component<OwnPropsType,StateType> {

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

    onTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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