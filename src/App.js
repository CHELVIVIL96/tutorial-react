import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
// import uuid from 'uuid';
import About from './components/pages/About';
import Axios from 'axios';
class App extends Component {
  //Estado
  state = {
    todos: []
  }
  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5').then(res => this.setState({todos: res.data}))
  }
  // state = {
  //   todos: [
  //     {
  //       id: uuid.v4(),
  //       title: 'take out the trash',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Dinner with wife',
  //       completed: false
  //     },
  //     {
  //       id: uuid.v4(),
  //       title: 'Meeting with boss',
  //       completed: false
  //     }
  //   ]
  // }
  //Cambiar estado de la tarea entre completo o incompleto
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }
  //eliminar Tarea del array
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>
      this.setState({

        todos: [...this.state.todos.filter(todo => todo.id !== id)]
  
      })
      )
    
  }
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // }
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res =>  this.setState({ todos: [...this.state.todos, res.data] }))
   
  }
  render() {

    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header></Header>
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}></AddTodo>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}></Todos>
              </React.Fragment>
            )}></Route>
            <Route path='/about' component={About}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
