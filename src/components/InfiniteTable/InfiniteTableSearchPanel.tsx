import React, { ReactElement } from 'react'
import { InfiniteTableSearchPanelProps } from './types'

const InfiniteTableSearchPanel = ({ search }: InfiniteTableSearchPanelProps): ReactElement => {
  return (
    <div className="infiniteTableSearchPanel">
      <input
        className="searchInput"
        onChange={(e) => search(e.target.value)}
        type="text"
        placeholder="Search by project name"
      />
    </div>
  )
}

export default InfiniteTableSearchPanel
