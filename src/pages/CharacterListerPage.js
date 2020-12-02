import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import StateContext from '../context'
import DescriptionList from '../components/DescriptionList'
import FilterButton from '../components/FilterButton'


const CharacterListerPage = () => {
  const { characters, activeFilter } = useContext(StateContext)

  return (
    <div className='page__wrapper--lister'>
      { activeFilter ?
        <Fragment>
          <h1>Characters from <i>{activeFilter.label}</i></h1>
          <FilterButton
            classModifier="fixed"
            filter={ { ...activeFilter, label: 'Clear filter' } }
          />
        </Fragment>
      : <h1>All Characters of Ice and Fire</h1> }
      { characters ?
        <ul className='grid-list'>
          { Array.from(characters).map(([url, character]) => {
            if (!activeFilter || character[activeFilter.type].includes(activeFilter.key)) {
              return (
                <li
                  key={ url }
                  className='grid-list-item'
                >
                  <Link
                    to={ `/${url.split('/').pop()}` }
                    className='card'
                  >
                    <DescriptionList character={ character } />
                  </Link>
                </li>
              )
            }
            return null
          }) }
        </ul>
      : '...loading' }
    </div>
  )
}

export default CharacterListerPage
