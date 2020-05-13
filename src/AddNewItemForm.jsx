import React from 'react';
import PropTypes from 'prop-types';

class AddNewItemForm extends React.Component {

    state = {
        error: false,
        title:'',
    }

    onAddItemClick = () => {
        let newTitle = this.state.title.trim();
        if (newTitle === ''){
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

    onInputChange = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    }

    onKeyPressAction = (e) => {
        if (e.key === 'Enter') {
            this.onAddItemClick();
        }
    }

    render = () => {

        let classForError = this.state.error === true ? 'error' :'';

        return (
                    <div className="todoList-newTaskForm">
                        <input 
                            type="text" 
                            onChange={this.onInputChange} 
                            className={classForError} 
                            placeholder="New item name"
                            value={this.state.title}
                            onKeyPress={this.onKeyPressAction}/>

                        <button  onClick = {this.onAddItemClick}>Add</button>
                    </div>
        );
    }
}

export default AddNewItemForm;

AddNewItemForm.propTypes = {
    onAddTaskClick: PropTypes.func
}