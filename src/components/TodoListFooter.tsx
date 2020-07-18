import React from 'react';
import {Button} from "@material-ui/core";

type StateType = {
    isHidden: boolean
}

type OwnPropsType = {
    filterValue: string
    changeFilter: (filter: string) => void
}

class TodoListFooter extends React.Component<OwnPropsType, StateType> {

    state = {
        isHidden: false,
    };


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

        const variantForBtnAll = this.props.filterValue === 'All' ? 'contained' : 'text';
        const variantForBtnActive = this.props.filterValue === 'Active' ? 'contained' : 'text';
        const variantForBtnCompleted = this.props.filterValue === 'Completed' ? 'contained' : 'text';

        return (
            <div className="todoList-footer"> 
                {!this.state.isHidden && <div>
                    <Button variant = {variantForBtnAll}
                            className = { classForAll }
                            onClick = { this.onAllFilterClick }>
                        All
                    </Button>
                    <Button variant = {variantForBtnCompleted}
                            color={'primary'}
                            className = { classForCompleted }
                            onClick = { this.onCompletedFilterClick }
                    > Completed </Button>
                    <Button variant = {variantForBtnActive}
                            color={'secondary'}
                            className = { classForActive }
                            onClick = { this.onActiveFilterClick }
                    > Active </Button>
                </div>}
                {!this.state.isHidden && <span onClick={this.onShowFiltersClick}>hide</span>}
                {/* //---условный рендеринг--- */}
                {this.state.isHidden && <span onClick={this.onHideFiltersClick}>show</span>}
            </div>
        );
    }
}

export default TodoListFooter;


