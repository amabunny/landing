import React, { useCallback } from 'react'
import { Select, Input } from 'antd'
import cn from 'classnames'
import { FormattedMessage } from 'react-intl'
import { useStore } from 'effector-react'
import { $filterType, $searchString, changeFilterType, changeSearchString } from '../../model'
import { TodoFilterTypes } from '../../types'
import classes from './style.module.less'

interface IProps {
  className?: string
}

export const Filters: React.FC<IProps> = ({ className }) => (
  <div className={cn(classes.wrapper, className)}>
    <div>
      <FilterTypeSelect />
    </div>

    <div>
      <SearchInput />
    </div>
  </div>
)

const FilterTypeSelect = () => {
  const selectedFilterType = useStore($filterType)

  const onFilterTypeSelect = useCallback((value: TodoFilterTypes) => {
    changeFilterType(value)
  }, [])

  return (
    <Select
      className={classes.select}
      onSelect={onFilterTypeSelect}
      value={selectedFilterType}
    >
      {Object.values(TodoFilterTypes).map(value =>
        <Select.Option
          key={value}
          value={value}
        >
          <FormattedMessage id={`todos.filterTypes.${value}`} />
        </Select.Option>
      )}
    </Select>
  )
}

const SearchInput = () => {
  const searchString = useStore($searchString)

  const onSearchStringChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchString(e.target.value)
  }, [])

  return (
    <Input.Search
      onChange={onSearchStringChange}
      value={searchString}
    />
  )
}
