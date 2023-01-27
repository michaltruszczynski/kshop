import React from 'react';

import BrandNameInput from './BrandNameInput/BrandNameInput';
import FilePicker from '../Form/FilePicker/FilePicker';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { brandNameInputConfig } from './BrandNameInput/brandNameInputConfig';
import { brandLogoInputConfig } from './BrandLogoInputConfig/brandLogoInputConfig';

import { postNewBrand } from '../../services/productService';

import styles from './AddBrandForm.module.scss';

const AddBrandForm = () => {
      const [inputBrandNameData, inputBrandNameDataIsValid, inputBrandNameDataChangeHandler] = useForm(brandNameInputConfig)
      // const [inputBrandNameData, inputBrandNameDataChangeHandler] = useInput(brandNameInputConfig)
      const [inputBrandLogoData, inputBrandLogoDataisValid, inputBrandLogoDataChangeHandler] = useForm(brandLogoInputConfig)
      console.log(inputBrandLogoData);
      const filePickerConfiguration = {
            fileType: ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
            maxFileSize: 1000,
            allowDuplicate: false,
            minFileNumber: 0,
            maxFileNumber: 2
      }

      const submitHandler = async (event) => {
            event.preventDefault();
            const newData = new FormData();
            console.log(inputBrandNameData);
            console.log(inputBrandLogoData);

            const appendInputsData = inputsData => {
                  Object.entries(inputsData).forEach(data => {
                        newData.append(data[0], data[1].value)
                  });
            }

            const appendInputsDataImages = inputsDataImages => {
                  console.log(inputsDataImages)
                  Object.entries(inputsDataImages).forEach(data => {
                        data[1].value.forEach(image => {
                              console.log(data[0], image.file)
                              newData.append(data[0], image.file);
                        })
                  });
            }

            appendInputsData(inputBrandNameData);
            appendInputsDataImages(inputBrandLogoData);

            try {
                  const response = await postNewBrand(newData)
                  console.log(response);
            } catch (error) {
                  console.log(error.response);
                  console.log(error.request)
            }
      }
      const formIsValid = () => {
            console.log(inputBrandNameDataIsValid);
            console.log(inputBrandLogoDataisValid)
            return inputBrandNameDataIsValid && inputBrandLogoDataisValid
      }


      return (
            <form className={styles['form']}>
                  <BrandNameInput
                        inputBrandNameData={inputBrandNameData}
                        inputBrandNameDataChangeHandler={inputBrandNameDataChangeHandler}
                  />
                  <FilePicker
                        imageData={inputBrandLogoData.brandImage}
                        onChangeHandler={inputBrandLogoDataChangeHandler('brandImage')}
                        {...filePickerConfiguration}
                        inputName={brandLogoInputConfig.brandImage.elementName}
                  />
                  <Button buttonType="success" buttonStyle="standard" disabled={!formIsValid()} type="submit" onClick={submitHandler}>Save</Button>
            </form>
      )
}

export default AddBrandForm;