import React, { ReactElement } from 'react'
import TaskCard from './TaskCard'
import { BoardProps } from './types'

const Board = ({ id, label, items, action }: BoardProps): ReactElement => {
  return (
    <div className="trelloBoard">
      <div className="trelloBoard_header">
        <span className="trelloBoard_label">{label}</span>
        <button className="trelloBoard_addTaskButton" onClick={() => action({ boardId: id, actionType: 'add' })}>
          <img src="/icons/plus-square-dotted.svg" />
        </button>
      </div>
      <div className="trelloBoard_body">
        {items.map((task) => (
          <div key={task.id} onClick={() => action({ boardId: id, taskId: task.id, actionType: 'view' })}>
            <TaskCard {...task} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
