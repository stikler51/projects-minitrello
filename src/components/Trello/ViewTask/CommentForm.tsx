import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { CommentDataType, CommentFormProps } from '../types'

const CommentForm = ({ addNewComment }: CommentFormProps): ReactElement => {
  const { register, handleSubmit, setValue } = useForm()

  const onSubmit = (data: { text: string; first_name: string; last_name: string }) => {
    console.log(data)
    // data.id = new Date().toString()
    const newComment = {
      id: new Date().toString(),
      text: data.text,
      author: {
        id: new Date().toString(),
        first_name: data.first_name,
        last_name: data.last_name,
      },
    }
    addNewComment(newComment)
    setValue('first_name', '')
    setValue('last_name', '')
    setValue('text', '')
  }

  return (
    <>
      <h3>Add new comment</h3>
      <form className="commentForm" onSubmit={handleSubmit(onSubmit)}>
        <input className="formInput" {...register('first_name')} placeholder="First Name" required />
        <input className="formInput" {...register('last_name')} placeholder="Last Name" required />
        <textarea className="formInput formInput_fullwidth" {...register('text')} placeholder="Comment" required />
        <input className="formSubmitBtn" type="submit" value="Add comment" />
      </form>
    </>
  )
}

export default CommentForm
