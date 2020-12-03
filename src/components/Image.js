import PropTypes from 'prop-types'
import { PLACEHOLDER_IMG } from '../constants'

export const Image = ({
  alt,
  classModifier,
  large,
  medium
}) => {
  return (
    <img
      alt={ alt }
      className={ `img img--${classModifier}` }
      srcSet={ `${medium} 72w, ${large} 128w` }
      sizes='(max-width: 400px) 72px, 128px'
      src={ large }
    />
  )
}

Image.defaultProps = {
  large: PLACEHOLDER_IMG
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  classModifier: PropTypes.string,
  large: PropTypes.string,
  medium: PropTypes.string
}

export default Image
