import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LBL } from '../constants'
import StateContext from '../context'
import DescriptionList from '../components/DescriptionList'
import FilterButton from '../components/FilterButton'
import OnScrollLoader from '../components/OnScrollLoader'


const CharacterListerPage = () => {
  const { characters, activeFilter, nextUrl } = useContext(StateContext)

  return (
    <div className='page__wrapper page__wrapper--lister'>
      { activeFilter ?
        <Fragment>
          <h1>{ LBL.filteredListerPrefix }<i>{ activeFilter.label }</i></h1>
          <FilterButton
            classModifier="fixed"
            filter={ { ...activeFilter, label: LBL.clearFilter } }
          />
        </Fragment>
        :
        <h1>{ LBL.listerTitle }</h1>
      }
      <br/>
      <br/>
      { characters && !!characters.size &&
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
      }
      <br/>
      { nextUrl && <OnScrollLoader url={ nextUrl } /> }
    </div>
  )
}

export default CharacterListerPage
