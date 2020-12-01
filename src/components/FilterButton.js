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
      <svg className='icon--filter' xmlns='http://www.w3.org/2000/svg' viewBox='-0 -400 2500 1750' style={{ width:'auto', height:'100%' }}>
        <g transform='matrix(1,0,0,-1,182.23729,1201.8983)' id='g3015'>
          <path d='m 1403,1241 q 17,-41 -14,-70 L 896,678 V -64 q 0,-42 -39,-59 -13,-5 -25,-5 -27,0 -45,19 L 531,147 q -19,19 -19,45 V 678 L 19,1171 q -31,29 -14,70 17,39 59,39 h 1280 q 42,0 59,-39 z' id='path3017' style={{ fill: 'currentColor' }}></path>
        </g>
      </svg>
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
