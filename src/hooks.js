import { useEffect } from 'react';

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
