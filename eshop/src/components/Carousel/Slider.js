import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react';

import SliderContent from './SliderContent/SliderContent';
import Arrow from './Arrow/Arrow';
import Slide from './Slide/Slide';
import Dots from './Dots/Dots';

import useElementSize from '../../hooks/useElementSize';

import styles from './Slider.module.scss';

const Slider = ({ autoPlay, controls, imagesArray, imagesMaxNumber }) => {

      const refEl = useRef();
      const { width: containerWidth } = useElementSize(refEl);
      const [state, setState] = useState(() => {
            let slidesHelperArray = [];

            if (imagesArray.length >= 3) {
                  slidesHelperArray = [].concat(imagesArray[imagesArray.length - 1], imagesArray, imagesArray.slice(0, imagesMaxNumber + 1));
            }

            if (imagesArray.length === 2 ) {
                  slidesHelperArray = [].concat(imagesArray[imagesArray.length - 1], imagesArray, imagesArray[0] );
            }
            if (imagesArray.length === 1 ) {
                  slidesHelperArray = [].concat(imagesArray, imagesArray, imagesArray);
            }

            return {
                  activeSlide: 0,
                  translate: 0,
                  transition: 0.45,
                  arrowsActive: true,
                  slidesHelperArray,
                  slidesVisibleNumber: imagesMaxNumber,
                  slidesArray: slidesHelperArray.slice(0, imagesMaxNumber + 2)
            }
      });

      const { translate, transition, slidesArray, activeSlide, slidesHelperArray, slidesVisibleNumber, arrowsActive } = state;
      const nextSlide = useCallback(() => {
            if (!arrowsActive) return;
            setState((state) => {
                  const { translate, activeSlide, slidesVisibleNumber } = state;
                  return ({
                        ...state,
                        translate: translate + containerWidth / slidesVisibleNumber,
                        activeSlide: activeSlide === imagesArray.length - 1 ? 0 : activeSlide + 1,
                        arrowsActive: false
                  })
            });
      }, [arrowsActive, containerWidth, imagesArray]);

      useEffect(() => {
            let interval;
            if (autoPlay) {
                  interval = setInterval(nextSlide, autoPlay * 1000)
            };

            const changeSlidesArrayAfterSlideMove = () => {
                  setState((state) => {
                        const { activeSlide, slidesHelperArray, slidesVisibleNumber } = state;
                        let slidesArray = slidesHelperArray.slice(activeSlide, activeSlide + slidesVisibleNumber + 2);

                        return ({
                              ...state,
                              slidesArray,
                              transition: 0,
                              translate: containerWidth / slidesVisibleNumber
                        });
                  });
            }

            window.addEventListener('transitionend', changeSlidesArrayAfterSlideMove);

            return () => {
                  if (autoPlay) {
                        clearInterval(interval);
                  }
                  window.removeEventListener('transitionend', changeSlidesArrayAfterSlideMove);
            }
      }, [containerWidth, autoPlay, nextSlide]);

      useLayoutEffect(() => {
            const changeTranslateWidthOnContainerWidthChange = () => {
                  if (!containerWidth) return;
                  setState(state => {
                        const { slidesVisibleNumber } = state;
                        return {
                              ...state,
                              transition: 0,
                              arrowsActive: true,
                              translate: containerWidth / slidesVisibleNumber
                        }
                  });
            }
            changeTranslateWidthOnContainerWidthChange()
      }, [containerWidth, slidesVisibleNumber]);

      useLayoutEffect(() => {
            if (!containerWidth) return;

            const calculateSlidesNumberToDisplay = containerWidth => {
                  const sliderMaxWidth = 1240;
                  const slidesMaxNumber = 5;
                  const slideMaxWidth = sliderMaxWidth / slidesMaxNumber;
                  const slidesVisibleNumber = Math.floor(containerWidth / slideMaxWidth);
                  return slidesVisibleNumber;
            }

            let slidesVisibleNumber = 1

            if (imagesMaxNumber !== 1) {
                  slidesVisibleNumber = calculateSlidesNumberToDisplay(containerWidth) ? calculateSlidesNumberToDisplay(containerWidth) : 1;
            }

            setState(state => {
                  const { activeSlide, slidesHelperArray } = state;
                  const slidesArray = slidesHelperArray.slice(activeSlide, activeSlide + slidesVisibleNumber + 2);

                  return {
                        ...state,
                        transition: 0,
                        slidesVisibleNumber,
                        slidesArray,
                        translate: containerWidth / slidesVisibleNumber
                  }
            });
      }, [containerWidth, imagesMaxNumber]);

      useEffect(() => {
            if (transition === 0) {
                  setState(state => ({
                        ...state,
                        arrowsActive: true,
                        transition: 0.45
                  }))
            }
      }, [transition]);

      const prevSlide = () => {
            if (!arrowsActive) return;
            setState({
                  ...state,
                  activeSlide: activeSlide === 0 ? imagesArray.length - 1 : activeSlide - 1,
                  translate: 0,
                  arrowsActive: false
            });
      }

      let controlArrows = null
      if (controls) {
            controlArrows = (
                  <>
                        <Arrow direction={"left"} handleClick={prevSlide} />
                        <Arrow direction={"right"} handleClick={nextSlide} />
                  </>
            )
      }

      let dots = null;
      if (controls) {
            dots = (<Dots activeSlide={activeSlide} slides={imagesArray} />)
      }

      return (
            <div className={styles['slider']} ref={refEl}>
                  <SliderContent
                        translate={translate}
                        transition={transition}
                        width={containerWidth * slidesArray.length}>
                        {slidesArray.map((slide, index) => {
                              return <Slide key={index + 1} content={slide} width={containerWidth / slidesVisibleNumber} />
                        })}
                  </SliderContent>
                  {imagesArray.length !== 1 ? controlArrows : null}
                  {imagesArray.length !== 1 ? dots : null}
            </div>
      )
}

export default Slider;