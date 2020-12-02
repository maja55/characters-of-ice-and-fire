import React from 'react';
import PropTypes from 'prop-types';
import { CHARACTER_FIELDS } from '../constants';
import { ensureArray } from '../utils/objectUtils';
import DescriptionListItem from './DescriptionListItem';

const DescriptionList = ({ character, fullView=false }) => {
  return (
    <dl className="desc-list">
      { CHARACTER_FIELDS.map(({
        label,
        propertyName,
        isPrimary,
        isFilter,
        ...props
      }) => (isPrimary || fullView) && (
        <DescriptionListItem
          { ...props }
          key={ propertyName }
          label={ label || propertyName.charAt(0).toUpperCase() + propertyName.slice(1) }
          fullView={ fullView }
          values={ ensureArray(character[propertyName]) }
          isFilter={ isFilter && !fullView }
        />
      ))}
    </dl>
  )
}

DescriptionList.propTypes = {
  character: PropTypes.shape({
    allegiances: PropTypes.arrayOf(PropTypes.string),
    books: PropTypes.arrayOf(PropTypes.string),
    born: PropTypes.string,
    culture: PropTypes.string,
    died: PropTypes.string,
    father: PropTypes.string,
    gender: PropTypes.oneOf(["Male", "Female"]),
    mother: PropTypes.string,
    name: PropTypes.string,
    spouse: PropTypes.string,
    url: PropTypes.string.isRequired
  }).isRequired,
  fullView: PropTypes.bool
};

export default DescriptionList;
