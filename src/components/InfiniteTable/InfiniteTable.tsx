import React, { ReactElement, useEffect, useRef } from 'react'
import { VariableSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import InfiniteTableHeader from './InfiniteTableHeader'
import InfiniteTableSearchPanel from './InfiniteTableSearchPanel'
import { InfiniteTableProps, TableRowProps } from './types'

const InfiniteTable = ({
  hasNextPage,
  // isNextPageLoading,
  items,
  globalLoading, // Sets in true when data fully rebuilds (on search or sort)
  loadNextPage,
  sortData,
  searchData,
}: InfiniteTableProps): ReactElement => {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length
  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length
  const getItemSize = (index: number): number => {
    const DEFAULT_FONT_LINE_HEIGHT = 22
    return items[index]?.assigns.length > 1 ? items[index]?.assigns.length * DEFAULT_FONT_LINE_HEIGHT + 20 : 62
  }

  const list = useRef<any>(null)

  useEffect(() => {
    // Recalculating rows sizes due to async loading
    if (list.current) {
      list?.current.resetAfterIndex(0)
    }
  }, [items])

  // Render an item or a loading indicator.
  const TableRow = ({ index, style }: TableRowProps): ReactElement => {
    if (!isItemLoaded(index)) {
      return (
        <div
          className="infiniteTable_loadingCell"
          style={{
            ...style,
            background: `${index % 2 ? '#fff' : '#eeeeee60'}`,
          }}
        >
          Loading...
        </div>
      )
    } else {
      return (
        <div className="infiniteTable__row" style={{ ...style, background: `${index % 2 ? '#fff' : '#eeeeee60'}` }}>
          <div className="infiniteTable__cell">{items[index].id}</div>
          <div className="infiniteTable__cell">{items[index].project_name}</div>
          <div className="infiniteTable__cell">{items[index].customer.name}</div>
          <div className="infiniteTable__cell">
            {items[index].project_manager.first_name + ' ' + items[index].project_manager.last_name}
          </div>
          <div className="infiniteTable__cell">
            {items[index].sales_manager.first_name + ' ' + items[index].sales_manager.last_name}
          </div>
          <div className="infiniteTable__cell">
            {items[index].assigns.map((person) => (
              <div key={person.id}>{person.first_name + ' ' + person.last_name}</div>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="infiniteTable">
      <InfiniteTableSearchPanel search={searchData} />
      <InfiniteTableHeader sortData={sortData} />
      <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadNextPage}>
        {({ onItemsRendered, ref }) => {
          return (
            <div style={{ position: 'relative' }}>
              <VariableSizeList
                itemCount={itemCount}
                onItemsRendered={onItemsRendered}
                ref={list}
                itemSize={getItemSize}
                estimatedItemSize={62}
                height={480}
                width={'100%'}
              >
                {TableRow}
              </VariableSizeList>
              {globalLoading ? <div className="infiniteTable_globalLoading">Loading</div> : ''}
            </div>
          )
        }}
      </InfiniteLoader>
    </div>
  )
}

export default InfiniteTable
