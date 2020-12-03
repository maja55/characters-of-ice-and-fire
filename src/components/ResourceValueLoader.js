import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import StateContext from '../context'
import { fetchApi } from '../utils/fetchUtils'
import FilterButton from './FilterButton'


const ResourceValueLoader = ({ isFilter, isLast, url, resourceType }) => {
  const { dispatch, ...state } = useContext(StateContext)
  const resourceState = state[resourceType].get(url)
  const name = resourceState && resourceState.name

  useEffect(() => {
    if ((!resourceState || (!resourceState.name && !resourceState.isLoading)) && resourceType !== 'books') {
      const actionType = `ADD_${resourceType.replace(/s$/, '').toUpperCase()}`
      
      dispatch({
        type: actionType,
        payload: { data: { isLoading: true }, url }
      })
      fetchApi({ url, cb: (data) => dispatch({ 
        type: actionType,
        payload: { data, url } 
      }) })
    }
  }, [dispatch, url, resourceState, resourceType])

  return (
    <React.Fragment>
      { isFilter ?
        <FilterButton
          filter={ {
            label: name,
            type: resourceType,
            key: url
          } }
        />
      :
        `${name}${isLast ? '' : ', '}`
      }
    </React.Fragment>
  )
}


ResourceValueLoader.defaultProps = {
  isFilter: false,
  isLast: false
}

ResourceValueLoader.propTypes = {
  isFilter: PropTypes.bool,
  isLast: PropTypes.bool,
  url: PropTypes.string.isRequired,
  resourceType: PropTypes.string.isRequired,
}

export default ResourceValueLoader
