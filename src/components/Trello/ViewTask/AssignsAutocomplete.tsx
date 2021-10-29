import React, { useState } from 'react'
import { PersonDataType, AssignsAutocompleteType } from '../types'
import Select from 'react-select'

const AssignsAutocomplete = ({ items, onSelect }: AssignsAutocompleteType) => {
  const [itemsList, setItemsList] = useState<PersonDataType[]>(items)
  const [person, setPerson] = useState<PersonDataType | null>(null)

  const onAddNewAssign = (value: PersonDataType | null) => {
    if (value) {
      const itemsListWithoutValue: PersonDataType[] = itemsList?.filter((person) => person.id !== value.id)
      setItemsList([...itemsListWithoutValue])
      setPerson(null)
      onSelect(value)
    }
  }

  return (
    <div className="assignsAutocomplete">
      <Select
        options={itemsList}
        isSearchable={true}
        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
        value={person}
        onChange={setPerson}
      />
      <button className="assignsAutocomplete__button" onClick={() => onAddNewAssign(person)}>
        <img src="/icons/plus-square-dotted.svg" />
      </button>
    </div>
  )
}

export default AssignsAutocomplete
