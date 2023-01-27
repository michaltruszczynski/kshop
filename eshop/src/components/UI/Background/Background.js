import React from 'react';

import Portal from '../Portal/Portal';
import Backdrop from '../Backdrop/Backdrop';

const Background = ({ show, onBackgroundClick }) => {

      const backgroundClickHandler = () => {
            onBackgroundClick();
      }

      return (
            show ?
            <Portal targetContainer={'modal'} >
                  <Backdrop show={true} onBackdropClick={backgroundClickHandler} ></Backdrop>
            </Portal>
            : null
      )
}

export default Background;