import React, { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SingleTaskDataType, EditTaskFormProps } from './types'
import { TASKS } from '../../mocks'

const EditTaskForm = ({ boardId, taskId, submitForm, remove }: EditTaskFormProps): ReactElement => {
  const { register, handleSubmit, setValue } = useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Case for real API

    // fetch('https://url_to_api/task/${taskId}')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setDefaultValues(data)
    //   })
    // const board = TASKS.filter((board) => board.id === boardId)
    // if (board.length) {
    //   const task = board[0].items.filter((task) => task.id === taskId)
    //   console.log(task)
    //   setValue('title', task[0].title)
    //   setValue('description', task[0].description)
    // }
    // setLoading(false)

    setTimeout(() => {
      const board = TASKS.filter((board) => board.id === boardId)
      if (board.length) {
        const task = board[0].items.filter((task) => task.id === taskId)
        setValue('title', task[0].title)
        setValue('description', task[0].description)
      }
      setLoading(false)
    }, 1000)
  }, [])

  const onSubmit = (data: SingleTaskDataType) => {
    const taskObject: SingleTaskDataType = {
      title: data.title,
      description: data.description,
    }
    submitForm({ boardId, taskId, taskObject: taskObject })
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <input className="formInput" {...register('title')} placeholder="Task title" required />
      <textarea className="formInput" {...register('description')} placeholder="Task description" required />
      <input className="formSubmitBtn" type="submit" value="Update task" />
      <button className="deleteTaskBtnBtn" onClick={() => remove({ boardId, taskId })}>
        Delete task
      </button>
    </form>
  )
}

export default EditTaskForm
