import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Portal from '../Portal/Portal';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../../Button/Button';

import * as actions from '../../../store/actions/index'
import styles from './ConfirmationDialog.module.scss';

const ConfirmDialog = () => {
      const { confirmationMessage, confirmationResolver} = useSelector(state => state.message);
      const dispatch = useDispatch();

      const confirmHandler = () => {
            confirmationResolver(true);
            dispatch(actions.clearMessage());
      }

      const cancelHandler = () => {
            confirmationResolver(false);
            dispatch(actions.clearMessage());
      }

      return (
            (confirmationMessage) ? (<Portal targetContainer={'modal'}>
                  <Backdrop show={true} onBackdropClick={() => { }}>
                        <div className={styles['modal']}>
                              <div className={styles['modal__header']}>
                                    <i className={`bx bx-x ${styles['modal__icon']}`} onClick={cancelHandler}></i>
                              </div>
                              <div className={styles['modal__message-container']}>
                                    <h1 className={styles['modal__message']}>{confirmationMessage}</h1>
                              </div>
                              <div className={styles['modal__button-container']}>

                                    <Button onClick={confirmHandler}>OK</Button>
                                    <Button onClick={cancelHandler}>Cancel</Button>
                              </div>
                        </div>
                  </Backdrop>
            </Portal>)
                  : null
      )
}

export default ConfirmDialog;