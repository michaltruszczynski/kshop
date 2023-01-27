import React from 'react';

import styles from './PreviewContainer.module.scss';

const PreviewContainer = ({ isValid, touched, children }) => {

      const getPreviewContainerClasses = () => {
            let previewContainerClasses = [styles['preview-container']];
            if (!isValid && touched) {
                  previewContainerClasses.push(styles['preview-container--error']);
            }

            return previewContainerClasses.join(' ')
      }

      return (
            <div className={getPreviewContainerClasses()}>
                  {children}
            </div>
      )
}

export default PreviewContainer;