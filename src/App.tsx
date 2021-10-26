import React, { ReactElement } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Table, Trello } from './pages'

function App(): ReactElement {
  return (
    <div className="App container">
      <Router>
        <Switch>
          <Route path="/trello" exact>
            <Trello />
          </Route>
          <Route path="/table" exact>
            <Table />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
