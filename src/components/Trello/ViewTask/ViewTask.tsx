import React, { ReactElement, useEffect, useState, useRef } from 'react'
import AssignsAutocomplete from './AssignsAutocomplete'
import Comments from './Comments'
import CommentForm from './CommentForm'
import EditTaskForm from './EditTaskForm'
import { ViewTaskProps, SingleTaskDataType, CommentDataType } from '../types'
import { TASKS, PERSONS } from '../../../mocks'
import { PersonDataType } from '../types'

const ViewTask = ({ taskId, updateTask, boardId, remove }: ViewTaskProps): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [taskData, setTaskData] = useState<SingleTaskDataType | null>(null)
  const [assignsList, setAssignsList] = useState<PersonDataType[]>([])

  useEffect(() => {
    setLoading(true)
    // Case for real API

    // fetch('https://url_to_api/task/${taskId}')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDefaultValues(data)
    //   })

    setTimeout(() => {
      TASKS.forEach((board) => {
        const task = board.items.filter((task) => task.id === taskId)
        if (task.length) setTaskData(task[0])
      })

      setAssignsList([...PERSONS.filter((person) => person.id !== taskData?.id)])

      setLoading(false)
    }, 1000)
  }, [])

  const addNewAssignedPerson = (data: PersonDataType | null) => {
    if (taskData && data) {
      const updatedAssigns = [...taskData?.assigns, data]
      const updatedTask = { ...taskData, assigns: updatedAssigns }
      setTaskData(updatedTask)
      updateTask({ boardId, taskId, taskObject: updatedTask })
    }
  }

  const addNewComment = (data: CommentDataType | null) => {
    if (taskData && data) {
      const updatedComments = [...taskData?.comments, data]
      const updatedTask = { ...taskData, comments: updatedComments }
      setTaskData(updatedTask)
      updateTask({ boardId, taskId, taskObject: updatedTask })
    }
  }

  const editTask = (data: { title: string; description: string }) => {
    if (taskData && data) {
      const updatedTask = { ...taskData, title: data.title, description: data.description }
      setTaskData(updatedTask)
      updateTask({ boardId, taskId, taskObject: updatedTask })
      setEditMode(false)
    }
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <div>
      <div className="viewTask">
        <div className="viewTask__mainInfo">
          {editMode ? (
            <EditTaskForm taskObject={taskData} onSubmit={editTask} />
          ) : (
            <>
              <h3>
                {taskData?.title} ({taskData?.id})
              </h3>
              <p>{taskData?.description}</p>
              <div className="editButtons">
                <button className="formSubmitBtn" onClick={() => setEditMode(true)}>
                  Edit Task
                </button>
                <button className="deleteTaskBtnBtn" onClick={() => remove({ boardId: boardId, taskId: taskId })}>
                  Delete task
                </button>
              </div>
            </>
          )}
        </div>
        <div className="viewTask__assigns">
          <h3>Assigns: </h3>
          <AssignsAutocomplete items={assignsList} onSelect={addNewAssignedPerson} />
          {taskData?.assigns.map((person) => (
            <p key={person.id}>
              {person.first_name} {person.last_name}
            </p>
          ))}
        </div>
      </div>
      <h3>Comments ({taskData?.comments.length}): </h3>
      {taskData && taskData.comments.length ? <Comments items={taskData.comments} /> : ''}
      <CommentForm addNewComment={addNewComment} />
    </div>
  )
}

export default ViewTask
