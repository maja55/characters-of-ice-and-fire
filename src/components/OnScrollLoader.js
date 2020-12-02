import React, { useEffect, useRef, useContext } from 'react';
import { fetchApi } from '../utils/fetchUtils';
import StateContext from '../context'


export const useIntersectionObserver = ({
  observeOnce=true,
  onIntersect,
  root,
  rootMargin,
  targetRef,
  threshold
}) => {
  useEffect(() => {
    if (targetRef && targetRef.current && onIntersect && !window.IntersectionObserver) return onIntersect(targetRef.current)
    if (!(targetRef && targetRef.current && onIntersect)) return undefined;

    const node = targetRef.current;
    const options = {
      root: root && root.current,
      rootMargin,
      threshold
    };
    const cb = (entries, observer) => {
      entries
        .filter(({ target }) => target === node)
        .forEach(({ isIntersecting }) => {
          if (!isIntersecting) return null;
          if (observeOnce) observer.unobserve(node);
          return onIntersect(node);
        });
    };

    const observer = new IntersectionObserver(cb, options);

    observer.observe(node);
    // clean up on unmount
    return () => observer.unobserve(node);
  });
};


const OnScrollLoader = ({ url }) => {
  const targetRef = useRef(null);
  const { dispatch } = useContext(StateContext);

  useIntersectionObserver({
      onIntersect: () => fetchApi({
        url,
        cb: (data, nextUrl) => {
          dispatch({ type: 'ADD_CHARACTERS', payload: data })
          dispatch({ type: 'UPDATE_NEXT_PAGE', payload: nextUrl })
        }
      }),
      targetRef,
      rootMargin: '1000px', // trigger fetch 1000px before loader element
      threshold: 0
  });

  return <div ref={ targetRef } className='loader /' />
}

export default OnScrollLoader
