import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';

import SliderContent from './SliderContent/SliderContent';
import Arrow from './Arrow/Arrow';
import Slide from './Slide/Slide';
import Dots from './Dots/Dots';

import useWindowSize from '../../hooks/useWindowSize';

import styles from './Carousel.module.scss';

const images = require.context('../../images/Products/Kites/OrbitBigAirFreeride', true, /^\.\/.*\.png$/);

const img = ['orbit_view', 'orbit_top', 'orbit_bottom', 'orbit_side', 'orbit_front'];

const Slider = ({ autoPlay }) => {
   const firstSlide = img[0];
   const secondSlide = img[1];
   const lastSlide = img[img.length - 1];
   const { width, height } = useWindowSize();
   const [state, setState] = useState({
      activeIndex: 0,
      translate: width,
      transition: 0.45,
      _slides: [lastSlide, firstSlide, secondSlide],
   });

   const autoPlayRef = useRef();
   const transitionRef = useRef();

   useEffect(() => {
      autoPlayRef.current = nextSlide;
      transitionRef.current = smoothTransition;
   });

   useLayoutEffect(() => {
      if (!width) return;

      const play = () => {
         autoPlayRef.current();
      };

      const smooth = () => {
         transitionRef.current();
      };

      const interval = setInterval(play, autoPlay * 1000);
      const transitionEnd = window.addEventListener('transitionend', smooth);

      return () => {
         if (!width) return;
         clearInterval(interval);
         window.removeEventListener('transitionend', smooth);
      };
   }, [width]);

   useEffect(() => {
      if (!width) return;
      setState({
         ...state,
         transition: 0,
         translate: width,
      });
   }, [width]);

   const { translate, transition, _slides, activeIndex } = state;

   useEffect(() => {
      if (transition === 0) setState({ ...state, transition: 0.45 });
   }, [transition, width]);

   const smoothTransition = () => {
      let _slides = [];

      //position at last slide
      if (activeIndex === img.length - 1) {
         _slides = [img[img.length - 2], lastSlide, firstSlide];
      } else if (activeIndex === 0) {
         _slides = [lastSlide, firstSlide, secondSlide];
      } else {
         _slides = img.slice(activeIndex - 1, activeIndex + 2);
      }

      setState({
         ...state,
         _slides,
         transition: 0,
         translate: width,
      });
   };

   const nextSlide = () => {
      setState({
         ...state,
         translate: translate + width,
         activeIndex: activeIndex === img.length - 1 ? 0 : activeIndex + 1,
      });
   };

   const prevSlide = () => {
      setState({
         ...state,
         activeIndex: activeIndex === 0 ? img.length - 1 : activeIndex - 1,
         translate: 0,
      });
   };

   return (
      <div className={styles['slider']}>
         <SliderContent
            translate={translate}
            transition={transition}
            width={width * _slides.length}
         >
            {_slides.map((slide, index) => {
               return (
                  <Slide
                     key={index + 1}
                     content={images(`./${slide}.png`)}
                  />
               );
            })}
         </SliderContent>
         <Arrow
            direction={'left'}
            handleClick={prevSlide}
         />
         <Arrow
            direction={'right'}
            handleClick={nextSlide}
         />
         <Dots
            activeIndex={activeIndex}
            slides={img}
         />
      </div>
   );
};

export default Slider;
