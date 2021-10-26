import { ProjectsDataType } from '../../mocks/types'

export type InfiniteTableProps = {
  hasNextPage: boolean
  isNextPageLoading: boolean
  items: ProjectsDataType
  loadNextPage: () => void
  sortData: (fieldName: string, order: Order) => void
  searchData: (searchPatter: string) => void
  globalLoading: boolean
}

export type TableRowProps = {
  index: number
  style: any
}

export type InfiniteTableSearchPanelProps = {
  search: (searchPattern: string) => void
}

export type InfiniteTableColumn = {
  name: string
  fieldName: string
  sortable: boolean
}

export type InfiniteTableHeaderProps = {
  sortData: (fieldName: string, order: Order) => void
}

export type SortValue = {
  column: string
  order: Order
}

export type Order = 'asc' | 'desc'
