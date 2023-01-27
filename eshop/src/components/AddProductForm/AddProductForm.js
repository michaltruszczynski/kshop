import React from 'react';
import { useDispatch } from 'react-redux';

import ProductDescriptionInputs from './ProductDescriptionInputs/ProductDescriptionInputs';
import SizeChart from './SizeChart/SizeChart';
import FilePicker from './ProductFilePicker/FilePicker';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { productDescriptionInputsConfig } from './ProductDescriptionInputs/productDescriptionInputsConfig';
import { sizeChartSystemInputConfig } from './SizeChart/sizeChartSystemInputConfig';
import { sizeChartInputConfig } from './SizeChart/CustomSizeChart/sizeChartInputConfig';
import { productImageInputConfig } from './ProductFilePicker/productImageInputConfig';

import { addNewProduct } from '../../services/productService';

import styles from './AddproductForm.module.scss';

const AddProductForm = () => {
      const dispatch = useDispatch();
      const [inputsDescriptionData, inputsDescriptionDataAreValid, inputsDescriptionDataChangeHandler] = useForm(productDescriptionInputsConfig);
      const [inputSizeSystemData, inputSizeSystemIsValid, inputSizeSystemChangeHandler] = useForm(sizeChartSystemInputConfig)
      const [inputSizeChartData, inputSizeChartDataIsValid, inputSizeChartDataChangeHandler] = useForm(sizeChartInputConfig)
      const [inputImageData, inputImageDataIsValid, inputImageDataChangeHandler] = useForm(productImageInputConfig);

      // console.log('inputsDescriptionDataAreValid',inputsDescriptionDataAreValid)
      // console.log('inputSizeSystemIsValid', inputSizeSystemIsValid)
      // console.log('inputSizeChartDataIsValid', inputSizeChartDataIsValid)
      // console.log('inputImageDataIsValid', inputImageDataIsValid)


      const checkIsFormValid = () => {
            return inputsDescriptionDataAreValid && inputSizeSystemIsValid && inputSizeChartDataIsValid && inputImageDataIsValid;
      }
      const getValuesFromInput = (inputsData) => {
            return Object.entries(inputsData)
      }
      const submitForm = async (event) => {
            event.preventDefault();
            // if (!(inputsDescriptionDataAreValid && inputSizeSystemIsValid && inputSizeChartDataIsValid && inputImageDataIsValid)) return;
            const newProductData = new FormData();

            const appendInputsData = inputsData => {
                  Object.entries(inputsData).forEach(data => {
                        newProductData.append(data[0], data[1].value)
                  });
            }

            const appendInputsDataJSON = inputsDataJSON => {
                  Object.entries(inputsDataJSON).forEach(data => {
                        newProductData.append(data[0], JSON.stringify(data[1].value))
                  });
            }

            const appendInputsDataImages = inputsDataImages => {
                  console.log(inputsDataImages)
                  Object.entries(inputsDataImages).forEach(data => {
                        data[1].value.forEach(image => {
                              console.log(data[0], image.file)
                              newProductData.append(data[0], image.file);
                        })
                  });
            }

            appendInputsData(inputsDescriptionData);
            appendInputsData(inputSizeSystemData);
            appendInputsDataJSON(inputSizeChartData);
            appendInputsDataImages(inputImageData);

            try {
                  const respond = await addNewProduct(newProductData);
                  console.log(respond)
            } catch (error) {
                  console.log(error)
            }

      }
      // console.log(getValuesFromInput(inputsDescriptionData))

      return (
            <form className={styles['form']}>
                  <ProductDescriptionInputs
                        inputsDescriptionData={inputsDescriptionData}
                        inputsDescriptionDataChangeHandler={inputsDescriptionDataChangeHandler} />
                  <SizeChart
                        inputSizeSystemData={inputSizeSystemData}
                        inputSizeSystemChangeHandler={inputSizeSystemChangeHandler}
                        inputSizeChartData={inputSizeChartData}
                        inputSizeChartDataChangeHandler={inputSizeChartDataChangeHandler} />
                  <FilePicker
                        inputImageData={inputImageData}
                        inputImageDataChangeHandler={inputImageDataChangeHandler('productImage')} />
                  <Button buttonType={'success'} onClick={submitForm} disabled={!true}>
                        Save product
                  </Button>
            </form>

      )
}

export default AddProductForm