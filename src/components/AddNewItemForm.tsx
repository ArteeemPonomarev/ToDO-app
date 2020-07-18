import React, {ChangeEvent} from 'react';
import {Button} from "@material-ui/core";

type OwnPropsType = {
    addItem: (newTitle: string) => void
}

type StateType = {
    error: boolean
    title: string
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {
// очередность передаваемых параметров важна, сначала пропсов, затем стейта

    state: StateType = {
        error: false,
        title: '',
    }

    onAddItemClick = () => {
        let newTitle = this.state.title.trim();
        if (newTitle === '') {
            this.setState({
                error: true
            })
        } else {
            this.props.addItem(newTitle);
            this.setState({
                error: false,
                title: ''
            })

        }

    }

    onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    }

    onKeyPressAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    }

    render = () => {

        let classForError = this.state.error ? 'error' : '';

        return (
            <div className="todoList-newTaskForm">
                <input
                    type="text"
                    onChange={this.onInputChange}
                    className={classForError}
                    placeholder="New item name"
                    value={this.state.title}
                    onKeyPress={this.onKeyPressAction}/>

                {/*<button onClick={this.onAddItemClick}>Add</button>*/}
                <Button onClick={this.onAddItemClick} variant={'contained'} color={'primary'} size={'small'}>Add</Button>
            </div>
        );
    }
}

export default AddNewItemForm;

