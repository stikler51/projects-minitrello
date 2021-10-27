export type TrelloDashboardProps = {
  id: string
}

export type SingleTaskDataType = {
  id?: string
  title: string
  description: string
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
  boardId: string
  taskId: string
  submitForm: ({ boardId, taskObject, taskId }: updateTaskParams) => void
  remove: ({ boardId, taskId }: removeTaskParams) => void
}

export type showModalWithContentArgs = {
  boardId: string
  taskId?: string
  actionType: 'add' | 'edit'
}
