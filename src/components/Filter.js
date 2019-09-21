import React from 'react'

const Filter = ({
  filter,
  setFilter
}) => {
  return (
    <section id='filter-bar-wrapper'>

      <div id='title-filter'>
        Filter By:
      </div>

      <div id='filter-bar'>
          
        <div
          onClick={(event) => setFilter('bike')}
          className={
            filter === 'bike' ? 'active' : undefined
          }
        >
          Bikes
        </div>

        <div
          onClick={(event) => setFilter('accessory')}
          className={
            filter === 'accessory' ? 'active' : undefined
          }
        >
          Helmets
        </div>
          
        <div
          onClick={(event) => setFilter('addon')}
          className={
            filter === 'addon' ? 'active' : undefined
          }
        >
          Insurance
        </div>
          
        <div
          onClick={(event) => setFilter('none')}
        >
          Reset
        </div>

      </div>
      
    </section >
  )
}

export default Filter