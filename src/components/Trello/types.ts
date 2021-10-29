import { ReactEventHandler, SyntheticEvent } from 'react'

export type TrelloDashboardProps = {
  id: string
}

export type PersonDataType = {
  id: string
  first_name: string
  last_name: string
}

export type CommentDataType = {
  id: string
  text: string
  author: PersonDataType
}

export type SingleTaskDataType = {
  id?: string
  title: string
  description: string
  assigns: PersonDataType[]
  comments: CommentDataType[]
}

export type BoardProps = {
  id: string
  label: string
  items: SingleTaskDataType[]
  action: ({ boardId, actionType, taskId }: showModalWithContentArgs) => void
}

export type addNewTaskParams = {
  boardId: string
  taskObject: SingleTaskDataType
}

export type updateTaskParams = {
  boardId: string
  taskId: string
  taskObject: SingleTaskDataType
}

export type removeTaskParams = {
  boardId: string
  taskId: string
}

export type NewTaskFormProps = {
  boardId: string
  submitForm: ({ boardId, taskObject }: addNewTaskParams) => void
}

export type EditTaskFormProps = {
  taskObject: SingleTaskDataType | null
  onSubmit: (data: { title: string; description: string }) => void
}

export type ViewTaskProps = {
  taskId: string
  boardId: string
  updateTask: ({ boardId, taskObject, taskId }: updateTaskParams) => void
  remove: ({ boardId, taskId }: removeTaskParams) => void
}

export type showModalWithContentArgs = {
  boardId: string
  taskId?: string
  actionType: 'add' | 'edit' | 'view'
}

export type AssignsAutocompleteType = {
  items: PersonDataType[]
  onSelect: (data: PersonDataType) => void
}

export type SingleCommentType = {
  id: string
  text: string
  author: PersonDataType
}

export type CommentsProps = {
  items: SingleCommentType[]
}

export type CommentFormProps = {
  addNewComment: (data: SingleCommentType) => void
}
