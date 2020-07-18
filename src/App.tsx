import React from 'react';
import './App.css'
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, setTodolistsTC} from "./store/reducer";
import {AppStateType} from "./store/store";
import {TodoType} from "./types/entities";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

type MapStatePropsType = {
    todolists: Array<TodoType>
}
type MapDispatchPropsType = {
    getTodo: () => void
    addTodolists: (title: string) => void
}

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.getTodo()
    }

    addTodoList = (title: string) => {
        this.props.addTodolists(title);
    }

    render = () => {
        const todolists = this.props.todolists.map(tl => <Grid item>
            <Paper style={{padding: '10px'}}>
                <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>
            </Paper>
        </Grid>)
        return (
            <div className={'App'}>
                <AppBar position={'static'}>
                    <Toolbar>
                        <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>
                            News
                        </Typography>
                        <Button color={'inherit'}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
                        <AddNewItemForm addItem={this.addTodoList}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists}
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        todolists: state.reducer.todolists
    }
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        addTodolists: (title) => {
            dispatch(addTodoList(title));
        },
        getTodo: () => {
            dispatch(setTodolistsTC());
        }
    }
}

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
