import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import InputField from '../../components/Form/InputField/InputField';
import SizeChartForm from '../../components/SizeChartForm/SizeChartForm';
import FilePicker from '../../components/Form/FilePicker/FilePicker';

import * as actions from '../../store/actions/index';

import { addNewProduct } from '../../services/productService';
import { validateInput, filePickerIsEmpty } from '../../utility/validators';
import { ErrorInformation } from '../../utility/helpers';
import { addProductForm } from './addProductForm';
import { addSizeChartForm } from './addSizeChartForm';

import useForm from './useForm';

import styles from './AddProduct.module.scss';
import ButtonSmall from '../../components/SizeChartForm/FormElements/ButtonSmall/ButtonSmall';

const AddProduct = () => {
      const dispatch = useDispatch();
      const [formInput, formIsValidT, inputChangeHandler] = useForm(addProductForm);
      const [sizeChart, formIsValidA, handleChangeSizeChart] = useForm(addSizeChartForm);

      const fileInputValidators = [
            { check: filePickerIsEmpty, message: 'Please select product image.' }
      ]

      const [selectedFiles, setSelectedFiles] = useState({
            value: [],
            touched: false,
            isValid: false,
            errors: []
      });

      const handleSelectFiles = value => {
            const { isValid: valid, errorMessages } = validateInput(fileInputValidators, value);
            setSelectedFiles(selectedFiles => ({
                  value: value,
                  touched: true,
                  isValid: valid,
                  errors: errorMessages
            }));
      }

      const [formIsValid, setFormIsValid] = useState(false);

      useEffect(() => {

            const checkIsFormValid = () => {
                  let isFormValid = true;
                  isFormValid = isFormValid && selectedFiles.isValid && selectedFiles.isValid && formIsValidT;
                  setFormIsValid(isFormValid);
            }
            checkIsFormValid();
      }, [formIsValidT, sizeChart, selectedFiles]);

      const handleSubmit = async (event) => {
            event.preventDefault();
            const formInputKeys = Object.keys(formInput);

            const newProductData = new FormData();
            for (const image of selectedFiles.value) {
                  newProductData.append('images', image.file)
            }

            formInputKeys.forEach(formInputKey => {
                  newProductData.append([formInputKey], formInput[formInputKey].value)
            });

            newProductData.append('sizeChart', JSON.stringify(sizeChart.value));

            try {
                  const response = await addNewProduct(newProductData);
                  console.log(response)
            }
            catch (error) {
                  const errorInformation = new ErrorInformation(error);
                  const { errorMessage, errorDetailsArray } = errorInformation.getErrorMessageData();
                  console.log(errorDetailsArray)
                  dispatch(actions.setMessage(errorMessage, errorDetailsArray, 'error'))
            }
      }

      const renderFormInputs = () => {
            return Object.values(addProductForm).map(formElement => (
                  <InputField
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={formInput[formElement.elementConfig.name].value}
                        touched={formInput[formElement.elementConfig.name].touched}
                        isValid={formInput[formElement.elementConfig.name].isValid}
                        errors={formInput[formElement.elementConfig.name].errors}
                        changeInput={inputChangeHandler(formElement.elementConfig.name)}
                  />
            ));
      }

      return (
            <section className={styles['section']}>
                  <div className={styles['section__container']}>
                        <div className={styles['title']}>
                              <h1 className={styles['title__text']}>Add Product</h1>
                        </div>
                        <div>
                              <form className={styles['form']}>
                                    {renderFormInputs()}
                                    <SizeChartForm
                                          sizeChart={sizeChart.sizeChart}
                                          changeSizeChart={handleChangeSizeChart('sizeChart')}
                                          sizeSystem={formInput.sizeSystem.value}
                                          changeSizeSystem={inputChangeHandler('sizeSystem')}
                                          productCategory={formInput.productCategory.value} />
                                    <FilePicker filesList={selectedFiles} onChangeHandler={handleSelectFiles} />
                                    <ButtonSmall buttonType={'success'} clickHandler={handleSubmit} disabled={!true}>
                                          Save product
                                    </ButtonSmall>
                              </form>
                        </div>
                  </div>
            </section>
      )
}

export default AddProduct;