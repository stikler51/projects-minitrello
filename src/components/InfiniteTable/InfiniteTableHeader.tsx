import React, { ReactElement, useState, useEffect } from 'react'
import { InfiniteTableColumn, InfiniteTableHeaderProps, SortValue } from './types'

const InfiniteTableColumns: InfiniteTableColumn[] = [
  {
    name: '#',
    fieldName: 'sequential',
    sortable: false,
  },
  {
    name: 'Project',
    fieldName: 'project_name',
    sortable: true,
  },
  {
    name: 'Customer',
    fieldName: 'customer',
    sortable: false,
  },
  {
    name: 'Project Manager',
    fieldName: 'project_manager',
    sortable: false,
  },
  {
    name: 'Sales Manager',
    fieldName: 'sales_manager',
    sortable: false,
  },
  {
    name: 'Assigns',
    fieldName: 'assigns',
    sortable: false,
  },
]

const InfiniteTableHeader = ({ sortData }: InfiniteTableHeaderProps): ReactElement => {
  const [sortingColumn, setSortingColumn] = useState<SortValue>({
    column: '',
    order: 'desc',
  })

  const sortByColumn = (colIndex: number): void => {
    if (InfiniteTableColumns[colIndex].sortable) {
      setSortingColumn({
        column: InfiniteTableColumns[colIndex].fieldName,
        order:
          sortingColumn.order === 'asc' || sortingColumn.column !== InfiniteTableColumns[colIndex].fieldName
            ? 'desc'
            : 'asc',
      })
    }
  }

  useEffect(() => {
    if (sortingColumn.column) {
      sortData(sortingColumn.column, sortingColumn.order)
    }
  }, [sortingColumn])

  return (
    <div className="infiniteTable__row infiniteTable__row_header">
      {InfiniteTableColumns.map((col, index) => {
        return (
          <div
            className={`infiniteTable__cell ${col.sortable ? 'infiniteTable__cell_sortable' : ''} ${
              sortingColumn.column === col.fieldName ? 'infiniteTable__cell_sortable_' + sortingColumn.order : ''
            }`}
            key={col.fieldName}
            onClick={() => sortByColumn(index)}
          >
            {col.name}
            {col.sortable ? <img src="/icons/chevron-down.svg"></img> : ''}
          </div>
        )
      })}
    </div>
  )
}

export default InfiniteTableHeader
