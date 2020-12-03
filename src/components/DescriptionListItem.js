import React, { Suspense, SuspenseList } from 'react'
import PropTypes from 'prop-types'
import ResourceValueLoader from './ResourceValueLoader'


const DescriptionListItem = ({
  isFilter,
  label,
  fullView,
  resourceType,
  values
}) => {
  const ValueTag = fullView && label === 'Name' ? 'h1' : 'div'

  return (
    <div className='desc-list__item'>
      <dt>{ label }</dt>
      <dd>
        { (values.length === 0 || !values[0]) && <div>/</div> }
        { 
          resourceType ?
            <SuspenseList revealOrder='forwards' tail='collapsed'>
              { values.map((value, i) => (
                <Suspense fallback={ <div className='loader loader--inline' /> }>
                  <ResourceValueLoader
                    key={ value }
                    isFilter={ isFilter }
                    isLast={ i === values.length - 1 }
                    resourceType={ resourceType }
                    url={ value }
                  />
                </Suspense>
              )) }
            </SuspenseList>
            : 
              <ValueTag>{ values.join(', ') }</ValueTag>
          }
      </dd>
    </div>
  )
}

DescriptionListItem.defaultProps = {
  isFilter: false,
  fullView: false,
  resourceType: ''
}

DescriptionListItem.propTypes = {
  isFilter: PropTypes.bool,
  label: PropTypes.string.isRequired,
  fullView: PropTypes.bool,
  resourceType: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default DescriptionListItem
