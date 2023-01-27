import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Portal from '../Portal/Portal';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../../Button/Button';

import * as actions from '../../../store/actions/index'
import styles from './Modal.module.scss';

const Modal = () => {
      const { message, messageDetails, type } = useSelector(state => state.message);
      const dispatch = useDispatch()
      const renderMessage = () => {
            if (!message) return null;
            return message;
      }

      const renderMessageDetails = () => {
            if (!messageDetails.length) return null;
            return messageDetails.map((messageDetail, index) => (
                  <li key={`mesageDetail${index}`} className={styles['modal__text']}>{messageDetail}</li>
            ))
      }

      const closeModal = () => {
            dispatch(actions.clearMessage())
      }

      return (
            (message || messageDetails.length) ? (<Portal targetContainer={'modal'}>
                  <Backdrop show={true} onBackdropClick={() => { }}>
                        <div className={styles['modal']}>
                              <div className={styles['modal__header']}>
                                    <i className={`bx bx-x ${styles['modal__icon']}`} onClick={closeModal}></i>
                              </div>
                              <div className={styles['modal__message-container']}>
                                    <h1 className={styles['modal__message']}>{renderMessage()}</h1>
                                    <ul>
                                          {renderMessageDetails()}
                                    </ul>
                              </div>
                              <Button onClick={closeModal}>Close</Button>
                        </div>
                  </Backdrop>
            </Portal>)
                  : null
      )
}

export default Modal;