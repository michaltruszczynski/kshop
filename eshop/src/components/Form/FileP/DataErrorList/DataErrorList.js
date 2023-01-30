import React from 'react';
import InputError from '../../InpurtError/InputError';

import styles from './DataErrorList.module.scss';

const DataErrorList = ({ imageData, primaryImageData }) => {

      const renderSelectedImagesError = () => {
            const { touched: imageDataTouched, isValid: imageDataIsValid, errors: imageDataErrors } = imageData;
            return (!imageDataIsValid && imageDataTouched) ? (
                  <InputError
                        touched={imageDataTouched}
                        isValid={imageDataIsValid}
                        errors={imageDataErrors} />
            ) : null
      }

      const renderPrimaryImageError = () => {
            if (!primaryImageData) return null;
            const { touched: primaryImageTouched, isValid: primaryImageIsValid, errors: primaryImageErrors } = primaryImageData;

            return (!primaryImageIsValid && primaryImageTouched) ? (
                  <InputError
                        touched={primaryImageTouched}
                        isValid={primaryImageIsValid}
                        errors={primaryImageErrors} />
            ) : null
      }

      return (
            <div className={styles['field__error']}>
                  {renderSelectedImagesError()}
                  {renderPrimaryImageError()}
            </div>
      )
}

export default DataErrorList;

