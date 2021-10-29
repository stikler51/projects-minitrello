import React, { ReactElement, useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router'
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
import ViewTask from './ViewTask/ViewTask'

const TrelloDashboard = ({ id }: TrelloDashboardProps): ReactElement => {
  const [boards, setBoards] = useState<TasksDataType>([])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: 'Modal', content: <></> })
  const history = useHistory()
  const { taskId } = useParams<{ taskId: string }>()

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
      if (taskId) {
        showModalWithContent({ boardId: '', taskId: taskId, actionType: 'view' })
      }
    }, 1500)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    if (taskId) {
      history.push('/trello')
    }
  }, [taskId])

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
            task.assigns = [...taskObject.assigns]
            task.comments = [...taskObject.comments]
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
    // setShowModal(false)
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
    history.push(`/trello`)
  }

  const showModalWithContent = ({ boardId, actionType, taskId }: showModalWithContentArgs): void => {
    switch (actionType) {
      case 'add':
        setModalContent({ title: 'Add New Task', content: <NewTaskForm boardId={boardId} submitForm={addNewTask} /> })
        break
      case 'view':
        if (taskId) {
          setModalContent({
            title: 'View Task',
            content: <ViewTask taskId={taskId} boardId={boardId} updateTask={updateTask} remove={removeTask} />,
          })

          history.push(`/trello/${taskId}`)
        }
        break
      default:
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
      <Modal open={showModal} close={closeModal} content={modalContent} />
    </>
  )
}

export default TrelloDashboard
