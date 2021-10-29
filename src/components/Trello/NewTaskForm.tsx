import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { SingleTaskDataType, NewTaskFormProps } from './types'

const NewTaskForm = ({ boardId, submitForm }: NewTaskFormProps): ReactElement => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: SingleTaskDataType) => {
    const newTask = {
      ...data,
      comments: [],
      assigns: [],
    }
    submitForm({ boardId, taskObject: newTask })
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <input className="formInput" {...register('title')} placeholder="Task title" required />
      <textarea className="formInput" {...register('description')} placeholder="Task description" required />
      <input className="formSubmitBtn" type="submit" value="Add new task" />
    </form>
  )
}

export default NewTaskForm
