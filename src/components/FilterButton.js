import { useContext } from 'react'
import PropTypes from 'prop-types';
import StateContext from '../context'


const FilterButton = ({ classModifier, filter }) => {
  const { label } = filter
  const { dispatch, activeFilter } = useContext(StateContext)
  const isActive = !!activeFilter && activeFilter.key === filter.key
  
  const toggleFilter = (e) => {
    e.preventDefault()

    if (isActive) {
      dispatch({ type: 'RESET_FILTER' })
    } else {
      dispatch({
        type: 'SET_FILTER',
        payload: filter
      })
    }
  }

  return (
    <button
      className={ `btn btn--${classModifier} btn--filter` }
      onClick={ toggleFilter }
      active={ isActive.toString() }
      title={ isActive ? 'Remove filter to display all characters' : `Apply filter to display only the characters from ${label}` }
    >
      <span className='btn__icon btn__icon--svg'>
        <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z"/>
        </svg>
      </span>
      { label && <span className='btn__label'>{ label }</span> }
    </button>
  )
}

FilterButton.defaultProps = {
  classModifier: 'rounded'
}

FilterButton.propTypes = {
  classModifier: PropTypes.string,
  filter: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  }).isRequired
}

export default FilterButton;
