import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_RESOURCES, LBL } from '../constants'
import { fetchApi } from '../utils/fetchUtils'
import StateContext from '../context'
import DescriptionList from '../components/DescriptionList'
import Image from '../components/Image'


const CharacterDetailsPage = () => {
  const { characterId } = useParams()
  const characterUrl = [API_RESOURCES.characters.split('?')[0], characterId].join('/')
  const { characters, dispatch } = useContext(StateContext)
  const character = characters.get(characterUrl)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    if (!character) {
      fetchApi({
        url: characterUrl,
        cb: (data) => dispatch({ 
          type: 'ADD_CHARACTER',
          payload: { data, url: characterUrl } 
        })
      })
    }

    if (character && !character.picture) {
      fetchApi({
        url: API_RESOURCES.pictures.replace('[gender]', character.gender.toLowerCase()),
        cb: (data) => dispatch({
          type: 'ADD_CHARACTER_PICTURE',
          payload: {
            url: character.url,
            picture: data.results[0].picture
          }
        })
      })
    }
  }, [character, characterUrl, dispatch])

  return (
    <div className='page__wrapper page__wrapper--detail'>
    <Link
      className='btn btn--fixed'
      style={{ display: 'inline-flex' }}
      to='/'
    >
      <span className='btn__icon btn__icon--font'>←</span>
      <span className='btn__label'>{ LBL.backButton }</span>
    </Link>
    { character ?
      <div className='card'>
        <Image
          { ...character.picture }
          alt={ character.name }
          classModifier='round'
        />
        <DescriptionList
          character={ character }
          fullView
        />
      </div>
      :
      <div className='loader' />
    }
    </div>
  )
}

export default CharacterDetailsPage
