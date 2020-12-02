import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import StateContext from '../context'
import { fetchApi } from '../utils/fetchUtils';
import FilterButton from './FilterButton'


const ResourceValueLoader = ({ isFilter, isLast, url, resourceType }) => {
  const { dispatch, ...state } = useContext(StateContext)
  const resourceState = state[resourceType]
  const { name, isLoading } = resourceState.get(url) || {}

  useEffect(() => {
    if (!name && resourceType !== 'books' && !isLoading) {
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
  }, [dispatch, url, name, isLoading, resourceType])

  return (
    <React.Fragment>
      { 
        name ? 
          isFilter ?
            <FilterButton
              filter={ {
                label: name,
                type: resourceType,
                key: url
              } }
            />
          :
            `${name}${isLast ? '' : ', '}`
        :
          <div className='loader loader--inline' />
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
