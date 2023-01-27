import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { clearMessage, requestConfirmation } from '../store/actions';

const useConfirmationDialog = () => {
        const dispatch = useDispatch();

        const isConfirmed = (confirmationMessage) => {

                const promise = new Promise((resolve, reject) => {
                        dispatch(requestConfirmation(confirmationMessage, resolve))
                })
                return promise;
        }

        return { isConfirmed }

}

export default useConfirmationDialog;