import React, { ReactElement } from 'react'
import { useParams } from 'react-router'

const Project = (): ReactElement => {
  const { id } = useParams<any>()

  return (
    <div>
      <h1>Project Page: {id}</h1>
    </div>
  )
}

export default Project
