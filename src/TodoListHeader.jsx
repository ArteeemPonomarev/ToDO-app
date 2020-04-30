import React from 'react';
import PropTypes from 'prop-types';

class TodoListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    };

    state = {
        error: false,
        title:'',
    }

    onAddTaskClick = () => {
        let newTitle = this.state.title.trim();
        if (newTitle === ''){
            this.setState({
                error: true
            })
        } else {
            this.props.addTask(newTitle);
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
            this.onAddTaskClick();
        }
    }

    render = () => {

        let classForError = this.state.error === true ? 'error' :'';

        return (
                 <div className="todoList-header">
                    <h3 className="todoList-header__title">What to Learn</h3>
                    <div className="todoList-newTaskForm">

                        <input 
                            type="text" 
                            onChange={this.onInputChange} className={classForError} placeholder="New task name" 
                            ref = {this.newTaskTitleRef} 
                            value={this.state.title}
                            onKeyPress={this.onKeyPressAction}/>

                        <button  onClick = {this.onAddTaskClick}>Add</button>
                    </div>
                </div>       
        );
    }
}

export default TodoListHeader;

TodoListHeader.propTypes = {
    onAddTaskClick: PropTypes.func
}