import React, { useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { fetchApi } from '../utils/fetchUtils'
import { useIntersectionObserver } from '../hooks'
import StateContext from '../context'


const OnScrollLoader = ({ url }) => {
  const targetRef = useRef(null)
  const { dispatch } = useContext(StateContext)

  useIntersectionObserver({
      onIntersect: () => fetchApi({
        url,
        cb: (data, nextUrl) => {
          dispatch({ type: 'ADD_CHARACTERS', payload: data })
          dispatch({ type: 'UPDATE_NEXT_PAGE_URL', payload: nextUrl })
        }
      }),
      targetRef,
      rootMargin: '1000px', // trigger fetch 1000px before loader element
      threshold: 0
  })

  return <div ref={ targetRef } className='loader' />
}

export default OnScrollLoader

OnScrollLoader.propTypes = {
  url: PropTypes.string.isRequired
}
