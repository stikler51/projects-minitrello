import React, { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { EditTaskFormProps } from '../types'

const EditTaskForm = ({ taskObject, onSubmit }: EditTaskFormProps): ReactElement => {
  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    setValue('title', taskObject?.title)
    setValue('description', taskObject?.description)
  }, [])

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <input className="formInput" {...register('title')} placeholder="Task title" required />
      <textarea className="formInput" {...register('description')} placeholder="Task description" required />
      <input className="formSubmitBtn" type="submit" value="Update task" />
    </form>
  )
}

export default EditTaskForm
