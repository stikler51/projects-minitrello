import React, { ReactElement } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Home, Table, Trello, Project } from './pages'

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/table">Table</Link>
          </li>
          <li>
            <Link to="/trello">Mini Trello</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

function App(): ReactElement {
  return (
    <Router>
      <Navigation />
      <div className="App container">
        <Switch>
          <Route path="/trello" exact>
            <Trello />
          </Route>
          <Route path="/trello/:taskId">
            <Trello />
          </Route>
          <Route path="/table" exact>
            <Table />
          </Route>
          <Route path="/table/:id">
            <Project />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
