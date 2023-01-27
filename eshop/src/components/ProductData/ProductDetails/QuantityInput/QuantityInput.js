import React from 'react';

import styles from './QuantityInput.module.scss';

const QuantityInput = ({ quantity = 1, onQuantityIncrement, onQuantityDecrement }) => {


      const decrementHandler = () => {
            onQuantityDecrement();
      }

      const incrementHanlder = () => {
            onQuantityIncrement();
      }

      return (
            <div className={styles['input']}>
                  <button
                        type="button"
                        className={styles['input__button']}
                        onClick={decrementHandler}
                        disabled={quantity <= 1 ? true : false}>
                        <i className={['bx', 'bx-minus',].join(' ')}></i>
                  </button>
                  <input
                        className={styles['input__quantity']}
                        type="text"
                        readOnly
                        value={quantity} />
                  <button
                        type="button"
                        className={styles['input__button']}
                        onClick={incrementHanlder}>
                        <i className={['bx', 'bx-plus'].join(' ')} ></i>
                  </button>
            </div>
      )
}

export default QuantityInput;