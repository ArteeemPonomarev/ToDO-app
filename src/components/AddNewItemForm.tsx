import React, {ChangeEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

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
                {/*<input*/}
                {/*    type="text"*/}
                {/*    onChange={this.onInputChange}*/}
                {/*    className={classForError}*/}
                {/*    placeholder="New item name"*/}
                {/*    value={this.state.title}*/}
                {/*    onKeyPress={this.onKeyPressAction}/>*/}
                <TextField
                    variant={'outlined'}
                    label={'Type value'}
                    onChange={this.onInputChange}
                    className={classForError}
                    value={this.state.title}
                    onKeyPress={this.onKeyPressAction}
                    error={this.state.error}
                    helperText={this.state.error && 'Title is required.'}/>
                {/*<button onClick={this.onAddItemClick}>Add</button>*/}
                <IconButton onClick={this.onAddItemClick} color={'primary'} size={'small'}>
                    <ControlPoint />
                </IconButton>
            </div>
        );
    }
}

export default AddNewItemForm;

