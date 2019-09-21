import React from 'react'

const SelectForm = ({
  value,
  handleChange,
  numOptions
}) => {

  const arrSelect = [...Array(numOptions).keys()].map(x => x+=1)

  return (
    <select
      value={value}
      onChange={handleChange}
    >
      {
        arrSelect.map(val => (
          <option key={val} value={val}>{val}</option>
        ))
      }
    </select>
  )
}

export default SelectForm