import React from 'react';
import PropTypes from 'prop-types';


class TodoListFooter extends React.Component {

    state = {
        isHidden: false,
    };

    onHideClick = () => {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    onAllFilterClick = () => {
        this.props.changeFilter("All")
    }

    onCompletedFilterClick = () => {
        this.props.changeFilter("Completed")
    }

    onActiveFilterClick = () => {
        this.props.changeFilter("Active")
    }
    // в рендере не передаем стрелочную функцию на обработчик событий, потому что создается функция каждый раз, влияет на производительность

    onShowFiltersClick = () => {
        this.setState({
            isHidden: true
        })
    }

    onHideFiltersClick = () => {
        this.setState({
            isHidden: false
        })
    }

    render = () => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div className="todoList-footer"> 
                {!this.state.isHidden && <div>
                    <button className = { classForAll }
                            onClick = { this.onAllFilterClick }>
                        All
                    </button>
                    <button className = { classForCompleted }
                            onClick = { this.onCompletedFilterClick }
                    > Completed </button>
                    <button className = { classForActive }
                            onClick = { this.onActiveFilterClick }
                    > Active </button>
                </div>}
                {!this.state.isHidden && <span onClick={this.onShowFiltersClick}>hide</span>}
                {/* //---условный рендеринг--- */}
                {this.state.isHidden && <span onClick={this.onHideFiltersClick}>show</span>}
            </div>
        );
    }
}

export default TodoListFooter;

TodoListFooter.propTypes = {
    filterValue: PropTypes.string
};

