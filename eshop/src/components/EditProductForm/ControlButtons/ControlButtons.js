import React, { forwardRef } from 'react';

import Button from '../../Button/Button';

import styles from './ControlButtons.module.scss';

const ControlButtons = ({
      editing,
      isOwner,
      elementId,
      submitHandler,
      removeHandler,
      updateHandler,
      backToPreviousPageHandler,
      isFormValid,
      changeEditModeHandler
}) => {


      return (
            <div className={styles['form__buttons']} >
                  {(!editing && !elementId) && (
                        <>
                              <Button
                                    onClick={submitHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    disabled={isFormValid} type="button">
                                    Save
                              </Button>
                              <Button
                                    onClick={backToPreviousPageHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    type="button">
                                    Back to list
                              </Button>
                        </>
                  )
                  }
                  {(editing && elementId && isOwner) && (
                        <>
                              <Button
                                    onClick={updateHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    disabled={isFormValid} type="button">
                                    Update
                              </Button>
                              <Button
                                    onClick={submitHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    disabled={isFormValid} type="button">
                                    Save as new
                              </Button>
                              <Button
                                    onClick={changeEditModeHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    type="button">
                                    Cancel
                              </Button>
                        </>
                  )}
                  {(editing && elementId && !isOwner) && (
                        <>
                              <Button
                                    onClick={submitHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    disabled={isFormValid} type="button">
                                    Save as new
                              </Button>
                              <Button
                                    onClick={changeEditModeHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    type="button">
                                    Cancel
                              </Button>
                        </>
                  )}
                  {(!editing && elementId && isOwner) && (
                        <>
                              <Button
                                    onClick={changeEditModeHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    type="button">
                                    Edit
                              </Button>
                              <Button
                                    onClick={removeHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    type="button"
                              >
                                    Remove
                              </Button>
                              <Button
                                    onClick={backToPreviousPageHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    type="button">
                                    Back to list
                              </Button>
                        </>
                  )}
                  {(!editing && elementId && !isOwner) && (
                        <>
                              <Button
                                    onClick={changeEditModeHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    type="button">
                                    Edit
                              </Button>
                              <Button
                                    onClick={backToPreviousPageHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    type="button">
                                    Back to list
                              </Button>
                        </>
                  )}
            </div>
      )
}

export default ControlButtons;