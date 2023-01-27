import React from 'react';

import styles from './SelectedImagesPreview.module.scss';

const SelectedImagesPreview = ({imagesSelected, primaryImage, disabled, onDeleteImage, editable, imageData, onSelectPrimaryImage }) => {

      if (!imagesSelected.length) return null;
      console.log(primaryImage)

      const removeFileHandler = (event, index) => {
            onDeleteImage(event, index);
      }

      const getIconClasses = () => {
            let iconClasses = [styles['delete-icon']];

            if (disabled) {
                  iconClasses.push(styles['delete-icon--disabled']);
            }

            return iconClasses.join(' ');
      }
      console.log(imagesSelected)
      return imagesSelected.map((image, index) => (
            <div className={styles['preview-container']} key={image.name}>
                  <div className={styles['image-container']}>
                        <img src={image.url} className={styles['image']} alt={image.name} />
                        <div className={styles['icon-container']}>
                              <i
                                    className={`bx bx-trash ${getIconClasses()}`}
                                    onClick={(e) => removeFileHandler(e, index)} ></i>
                        </div>
                  </div>
                  {primaryImage !== null ? (
                        <div className={styles['button-container']}>
                              <input
                                    type="radio"
                                    id={image.name}
                                    value={image.name}
                                    name='primary-image'
                                    onChange={onSelectPrimaryImage}
                                    checked={primaryImage === image.name}
                                    disabled={editable ? disabled : true}
                                    className={styles['radio-button']} />
                              <label htmlFor={image.name}>Primary image</label>
                        </div>
                  ) :
                        null}
            </div>
      ));
}

export default SelectedImagesPreview;