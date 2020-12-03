import React from 'react';
import { renderHook } from '@testing-library/react-hooks'
import { useIntersectionObserver } from './hooks';


const targetNode = <div>target</div>;
const mocks = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    onIntersect: jest.fn(),
    root: { current: <div>root</div> },
    target: { current: targetNode },
    entries: [
        { isIntersecting: false },
        { isIntersecting: true, target: <div>some other target</div> },
        { isIntersecting: false, target: targetNode },
        { isIntersecting: true, target: targetNode },
    ],
};

beforeEach(() => {
    global.IntersectionObserver = jest.fn(function IntersectionObserver() {
        this.observe = mocks.observe;
        this.unobserve = mocks.unobserve;
    });
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('useIntersectionObserver', () => {
  it('should do nothing if no valid target provided', () => {
    const { result } = renderHook(() => useIntersectionObserver({ onIntersect: mocks.onIntersect }));
    expect(result.current).toBeUndefined();
    expect(mocks.observe).not.toHaveBeenCalled();
    expect(mocks.unobserve).not.toHaveBeenCalled();
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should do nothing if onIntersect callback is not provided', () => {
    const { result } = renderHook(() => useIntersectionObserver({ targetRef: mocks.target }));
    expect(result.current).toBeUndefined();
    expect(mocks.observe).not.toHaveBeenCalled();
    expect(mocks.unobserve).not.toHaveBeenCalled();
    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });

  it('should instantiate intersectionObserver with right arguments', () => {
    renderHook(() => useIntersectionObserver({
      root: mocks.root,
      targetRef: mocks.target,
      onIntersect: mocks.onIntersect,
      threshold: 1,
      rootMargin: '100px',
    }));

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      root: mocks.root.current,
      threshold: 1,
      rootMargin: '100px',
    });
  })

  it('should set observer to observe provided target node', () => {
    renderHook(() => useIntersectionObserver({
      targetRef: mocks.target,
      onIntersect: mocks.onIntersect,
    }));

    expect(mocks.observe).toHaveBeenCalledTimes(1);
    expect(mocks.observe).toHaveBeenCalledWith(mocks.target.current);
  });

  it('should call provided callback on intersection', () => {
    renderHook(() => useIntersectionObserver({
      targetRef: mocks.target,
      onIntersect: mocks.onIntersect,
    }));

    const observerCallback = global.IntersectionObserver.mock.calls[0][0];
    expect(observerCallback).toEqual(expect.any(Function));
    expect(observerCallback.name).toEqual('cb');
    observerCallback(mocks.entries, new global.IntersectionObserver());

    expect(mocks.onIntersect).toHaveBeenCalledTimes(1);
    expect(mocks.onIntersect).toHaveBeenCalledWith(mocks.target.current);
    expect(mocks.unobserve).toHaveBeenCalledTimes(1);
    expect(mocks.unobserve).toHaveBeenCalledWith(mocks.target.current);
  });

  it('should not remove observer on intersection if `observeOnce` is false', () => {
    renderHook(() => useIntersectionObserver({
      targetRef: mocks.target,
      onIntersect: mocks.onIntersect,
      observeOnce: false,
    }));

    const observerCallback = global.IntersectionObserver.mock.calls[0][0];
    observerCallback(mocks.entries, new global.IntersectionObserver());

    expect(mocks.onIntersect).toHaveBeenCalledTimes(1);
    expect(mocks.unobserve).not.toHaveBeenCalled();
  });

  it('should return function that removes observer from provided target node', () => {
    const { unmount } = renderHook(() => useIntersectionObserver({
      targetRef: mocks.target,
      onIntersect: mocks.onIntersect,
    }));

    expect(mocks.unobserve).toHaveBeenCalledTimes(0);

    unmount();
    expect(mocks.unobserve).toHaveBeenCalledTimes(1);
    expect(mocks.unobserve).toHaveBeenCalledWith(mocks.target.current);
  });
});
