import React, { ReactElement } from 'react'
// import { useParams } from 'react-router'
import TrelloDashboard from '../components/Trello/TrelloDashboard'

const Trello = (): ReactElement => {
  // ID for identifying project
  // const {id} = useParams()
  
  const id = '123456'

  return (
    <div>
      <TrelloDashboard id={id} />
    </div>
  )
}

export default Trello
