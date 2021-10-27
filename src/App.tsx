import React, { ReactElement } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Table, Trello, Project } from './pages'

function App(): ReactElement {
  return (
    <Router>
      <div className="App container">
        <Switch>
          <Route path="/trello" exact>
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
