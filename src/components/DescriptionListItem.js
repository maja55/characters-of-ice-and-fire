import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import StateContext from '../context'
import { getProp } from '../utils/objectUtils'
import FilterButton from './FilterButton'

const DescriptionListItem = ({
  isFilter,
  label,
  resourceType,
  values
}) => {
  const state = useContext(StateContext)
  const [resourceValues, setResourceValues] = useState(new Array(values.length))
  const resourceState = resourceType ? state[resourceType] : null
  const textValues = resourceType ? resourceValues : values

  useEffect(() => {
    if (resourceType) {
      values.forEach((value, i) => {
        const newValue = getProp(resourceState.get(value), 'name')
        
        setResourceValues(prevValues => {
          if (prevValues[i] !== newValue) {
            const newValues = [...prevValues]
            newValues[i] = newValue
            return newValues
          }
          return prevValues
        })
      })
    }
  }, [resourceState, resourceType, values])

  return (
    <div className='desc-list-item'>
      <dt>{ label }</dt>
      <dd>
        { (textValues.length === 0 || !textValues[0]) && <div>/</div> }
        { isFilter ? textValues.map((value, i) => (
          <FilterButton
            key={ value }
            filter={ {
              label: value,
              type: resourceType,
              key: values[i]
            } }
          />
        )) : <div>{ textValues.join(', ') }</div> }
      </dd>
    </div>
  )
}

DescriptionListItem.defaultProps = {
  isFilter: false,
  resourceType: ''
}

DescriptionListItem.propTypes = {
  isFilter: PropTypes.bool,
  label: PropTypes.string.isRequired,
  resourceType: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default DescriptionListItem
