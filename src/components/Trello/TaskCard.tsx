import React, { ReactElement } from 'react'
import { SingleTaskDataType } from './types'

const TaskCard = ({ title, description }: SingleTaskDataType): ReactElement => {
  return (
    <div className="taskCard">
      <h4 className="taskCard_title">{title}</h4>
      <div className="taskCard_description">{description}</div>
    </div>
  )
}

export default TaskCard
