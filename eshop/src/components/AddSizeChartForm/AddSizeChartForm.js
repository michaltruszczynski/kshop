import React from 'react';
import { useParams } from 'react-router-dom';

import SizeChartNameInput from './SizeChartNameInput/SizeChartNameInput';
import CustomSizeChart from '../Form/CustomSizeChart/CustomSizeChart';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { sizeChartNameInputConfig } from './SizeChartNameInput/sizeChartNameInputConfig';
import { sizeChartInputConfig } from '../Form/CustomSizeChart/sizeChartInputsConfig';

import { addNewSizeSystem } from '../../services/productService';

import styles from './AddSizeChartForm.module.scss';

const AddSizeChartForm = () => {
      const [inputSizeSystemNameData, inputSizeChartNameDataIsValid, inputSizeChartNameDataChangeHandler] = useForm(sizeChartNameInputConfig)
      const [inputSizeChartData, inputSizeChartDataIsValid, inputSizeChartDataChangeHandler] = useForm(sizeChartInputConfig)

      const { editing, id } = useParams();
      console.log(editing, id);
      const submitHandler = async (event) => {
            event.preventDefault();
            const newSizeSystem = {
                  sizeSystemName: inputSizeSystemNameData.sizeChartName.value,
                  sizeChart: inputSizeChartData.sizeChart.value
            }
            try {
                  const respond = await addNewSizeSystem(newSizeSystem);
                  console.log(respond)
            } catch (error) {
                  console.log(error);
            }
      }

      const isFormButtonDisabled = !(inputSizeChartNameDataIsValid && inputSizeChartDataIsValid)

      return (
            <form className={styles['form']}>
                  <SizeChartNameInput
                        inputSizeChartNameData={inputSizeSystemNameData}
                        inputSizeChartNameDataChangeHandler={inputSizeChartNameDataChangeHandler} />
                  <CustomSizeChart
                        sizeChart={inputSizeChartData['sizeChart']}
                        changeSizeChart={inputSizeChartDataChangeHandler('sizeChart')} />
                  <Button
                        onClick={submitHandler}
                        buttonType="success"
                        buttonStyle="standard"
                        disabled={isFormButtonDisabled} type="submit">
                        Save
                  </Button>
            </form>
      )
}

export default AddSizeChartForm;