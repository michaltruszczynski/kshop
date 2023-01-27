import React from 'react';

import SizeInput from '../SizeInput/SizeInput';
import Button from '../Button/Button';

import styles from './DynamicForm.module.scss';
import InputError from '../../../Form/InpurtError/InputError';

const DynamicForm = ({ sizeChart, changeSizeChart }) => {

      const { value, touched, isValid, errors } = sizeChart;

      const handleChange = (event, index) => {
            const values = [...value];
            values[index].sizeDescription = event.target.value;
            changeSizeChart(values, true);
      }

      const handleAddField = () => {
            const values = [...value];
            values.push({ sizeDescription: '' })
            console.log(values)
            changeSizeChart(values, true);
      }

      const handleRemoveField = (event, index) => {
            const values = [...value];
            values.splice(index, 1);
            changeSizeChart(values, true);
      }

      let dynamicForm = null;
      if (sizeChart) {
            dynamicForm = value.map((sizeInput, index) => (
                  <li key={`sizeInput${index}`}>
                        <SizeInput
                              index={index}
                              name={`sizeInput${index}`}
                              id={`sizeInput${index}`}
                              label={'Size description (dimensions)'}
                              editable={true}
                              touched={touched}
                              value={sizeInput.sizeDescription}
                              onInputChange={(e) => handleChange(e, index)}
                        >
                              {(index === 0) && <Button buttonType="success" onClick={handleAddField} disabled={false}>+</Button>}
                              {(index > 0) && <Button buttonType="danger" onClick={(e) => handleRemoveField(e, index)} >-</Button>}
                        </SizeInput>
                  </li>
            ))
      }
      return (
            <div>
                  <p>Please define custom size chart.</p>
                  <ul className={styles['input-list']}>
                        {dynamicForm}
                  </ul>
                  <InputError touched={touched} isValid={isValid} errors={errors} />
            </div>
      )
}

export default DynamicForm;