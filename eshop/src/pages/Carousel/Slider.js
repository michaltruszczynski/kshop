import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';

import SliderContent from './SliderContent/SliderContent';
import Arrow from './Arrow/Arrow';
import Slide from './Slide/Slide';
import Dots from './Dots/Dots';

import useWindowSize from '../../hooks/useWindowSize';
import useElementSize from '../../hooks/useElementSize';

import styles from './Carousel.module.scss';

const images = require.context('../../images/Products/Kites/OrbitBigAirFreeride', true, /^\.\/.*\.png$/)

const img = ['orbit_view', 'orbit_top', 'orbit_bottom', 'orbit_side', 'orbit_front']

const Slider = ({ autoPlay }) => {

      const firstSlide = img[0];
      const secondSlide = img[1];
      const lastSlide = img[img.length - 1];
      const refEl = useRef();
      const { width, height } = useWindowSize();
      const { width: e1, height: e2 } = useElementSize(refEl);
      const [state, setState] = useState({
            activeIndex: 0,
            translate: width,
            transition: 0.45,
            _slides: [lastSlide, firstSlide, secondSlide]
      });

      const { translate, transition, _slides, activeIndex } = state;

      useLayoutEffect(() => {
            let interval;
            if (autoPlay) {
                  interval = setInterval(nextSlide, autoPlay * 1000)
            };

            window.addEventListener('transitionend', smoothTransition);

            return () => {
                  clearInterval(interval);
                  window.removeEventListener('transitionend', smoothTransition);
            }
      }, [width, autoPlay, nextSlide, smoothTransition]);

      useLayoutEffect(() => {
            if (!width) return;
            setState({
                  ...state,
                  transition: 0,
                  translate: width
            });
      }, [width, state]);

      useEffect(() => {
            if (transition === 0) setState({ ...state, transition: 0.45 })
      }, [transition, state]);

      const smoothTransition = () => {
            setState((state) => {
                  let _slides = [];
                  const { activeIndex } = state;
                  if (activeIndex === img.length - 1) {
                        _slides = [img[img.length - 2], lastSlide, firstSlide]
                  } else if (activeIndex === 0) {
                        _slides = [lastSlide, firstSlide, secondSlide]
                  } else {
                        _slides = img.slice(activeIndex - 1, activeIndex + 2)
                  }

                  return ({
                        ...state,
                        _slides,
                        transition: 0,
                        translate: width
                  });
            });
      }

      const nextSlide = () => {
            setState((state) => {
                  const { translate, activeIndex } = state;
                  return ({
                        ...state,
                        translate: translate + width,
                        activeIndex: activeIndex === img.length - 1 ? 0 : activeIndex + 1
                  })
            });
      }

      const prevSlide = () => {
            setState({
                  ...state,
                  activeIndex: activeIndex === 0 ? img.length - 1 : activeIndex - 1,
                  translate: 0
            });
      }

      return (
            <div className={styles['slider']} ref={refEl}>
                  <SliderContent
                        translate={translate}
                        transition={transition}
                        width={width * _slides.length}>
                        {_slides.map((slide, index) => {
                              return <Slide key={index + 1} content={images(`./${slide}.png`)} />
                        })}
                  </SliderContent>
                  <Arrow direction={"left"} handleClick={prevSlide} />
                  <Arrow direction={"right"} handleClick={nextSlide} />
                  <Dots activeIndex={activeIndex} slides={img} />
            </div>
      )
}

export default Slider;