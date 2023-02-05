import { useDispatch } from 'react-redux';

import { requestConfirmation } from '../store/actions';

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