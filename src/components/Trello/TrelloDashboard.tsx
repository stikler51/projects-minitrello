import React, { ReactElement, useState, useEffect } from 'react'
import Board from './Board'
import {
  TrelloDashboardProps,
  addNewTaskParams,
  showModalWithContentArgs,
  updateTaskParams,
  removeTaskParams,
} from './types'
import { TASKS } from '../../mocks'
import { TasksDataType } from '../../mocks/types'
import Modal from '../Modal/Modal'
import NewTaskForm from './NewTaskForm'
import EditTaskForm from './EditTaskForm'

const TrelloDashboard = ({ id }: TrelloDashboardProps): ReactElement => {
  const [boards, setBoards] = useState<TasksDataType>([])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: 'Modal', content: <></> })

  // First loading
  useEffect(() => {
    // Case for real API

    // fetch('https://url_to_api/tasks/${id}')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setItems([...data])
    //   })

    setTimeout(() => {
      setBoards([...TASKS])
    }, 1500)
  }, [])

  const addNewTask = ({ boardId, taskObject }: addNewTaskParams) => {
    // Case for real API
    // fetch('https://url_to_api/tasks/${boardId}',
    //   {
    //     method: 'POST'
    //     body: JSON.stringify(taskObject),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })

    const updatedTasks = boards.map((board) => {
      if (board.id === boardId) {
        board.items.push({ ...taskObject, id: Date.now().toString() })
        return board
      }
      return board
    })
    setBoards([...updatedTasks])
    setShowModal(false)
  }

  const updateTask = ({ boardId, taskId, taskObject }: updateTaskParams) => {
    // Case for real API
    // fetch('https://url_to_api/task/${taskId}',
    //   {
    //     method: 'PUT'
    //     body: JSON.stringify(taskObject),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })

    const updatedTasks = boards.map((board) => {
      if (board.id === boardId) {
        const updatedTasks = board.items.map((task) => {
          if (task.id === taskId) {
            task.title = taskObject.title
            task.description = taskObject.description
            return task
          }
          return task
        })
        board.items = updatedTasks
        return board
      }
      return board
    })

    setBoards([...updatedTasks])
    setShowModal(false)
  }

  const removeTask = ({ boardId, taskId }: removeTaskParams) => {
    // Case for real API
    // fetch('https://url_to_api/task/${taskId}',
    //   {
    //     method: 'DELETE'
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })

    const updatedTasks = boards.map((board) => {
      if (board.id === boardId) {
        const updatedTasks = board.items.filter((task) => task.id !== taskId)

        board.items = updatedTasks
        return board
      }
      return board
    })

    setBoards([...updatedTasks])
    setShowModal(false)
  }

  const showModalWithContent = ({ boardId, actionType, taskId }: showModalWithContentArgs): void => {
    switch (actionType) {
      case 'add':
        setModalContent({ title: 'Add New Task', content: <NewTaskForm boardId={boardId} submitForm={addNewTask} /> })
        break
      case 'edit':
        if (taskId) {
          setModalContent({
            title: 'Edit Task',
            content: <EditTaskForm boardId={boardId} submitForm={updateTask} taskId={taskId} remove={removeTask} />,
          })
        }
        break
      default:
        setModalContent({ title: 'Modal', content: <></> })
        break
    }
    setShowModal(true)
  }

  return (
    <>
      <div className="trelloDashboard">
        {!boards.length ? 'Loading...' : ''}
        {boards.map((board) => (
          <Board key={board.id} id={board.id} label={board.label} items={board.items} action={showModalWithContent} />
        ))}
      </div>
      <Modal open={showModal} close={() => setShowModal(false)} content={modalContent} />
    </>
  )
}

export default TrelloDashboard
