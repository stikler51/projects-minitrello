import React, { useState } from 'react'
import InfiniteTable from '../components/InfiniteTable/InfiniteTable'
import { PROJECTS } from '../mocks'
import { ProjectsDataType } from '../mocks/types'

const Table = () => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true)
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false)
  const [globalLoading, setGlobalLoading] = useState<boolean>(false)
  const [items, setItems] = useState<ProjectsDataType>([])

  const loadNextPage = (): void => {
    setIsNextPageLoading(true)

    // Case for real API

    // fetch('https://url_to_api/projects')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setHasNextPage(!!data.nextPage)
    //     setItems([...items, ...data.items])
    //     setIsNextPageLoading(false)
    //   })

    setTimeout(() => {
      setHasNextPage(items.length < PROJECTS.length)
      setItems([...items, ...PROJECTS.slice(items.length, items.length + 10)])
      setIsNextPageLoading(false)
    }, 1000)
  }

  const sortTableDataByRow = (fieldName: string, order: 'asc' | 'desc'): void => {
    setGlobalLoading(true)
    // Case for real API

    // fetch('https://url_to_api/projects?sortBy=${fieldName}&sortOrder=${order}')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setItems([...data.items])
    //     setGlobalLoading(false)
    //   })

    setTimeout(() => {
      const sortedArray = items.sort(function (a, b) {
        if (order === 'desc') {
          if (a.project_name > b.project_name) {
            return 1
          }
          if (a.project_name < b.project_name) {
            return -1
          }
        } else {
          if (a.project_name < b.project_name) {
            return 1
          }
          if (a.project_name > b.project_name) {
            return -1
          }
        }

        return 0
      })
      setGlobalLoading(false)
      setItems([...sortedArray])
    }, 1000)
  }

  const searchTableData = (searchPattern: string) => {
    setGlobalLoading(true)
    // Case for real API

    // fetch('https://url_to_api/projects?projectName=${searchPattern}')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setItems([...data.items])
    //     setGlobalLoading(false)
    //   })

    setTimeout(() => {
      const foundedRows = PROJECTS.filter((data) => data.project_name.includes(searchPattern))
      setItems([...foundedRows])
      setGlobalLoading(false)
    }, 1000)
  }

  return (
    <div>
      <InfiniteTable
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        items={items}
        sortData={sortTableDataByRow}
        searchData={searchTableData}
        loadNextPage={loadNextPage}
        globalLoading={globalLoading}
      />
    </div>
  )
}

export default Table
