import React, { useState, useEffect } from 'react';

import DefinedSizeChartMenu from './FormElements/DefinedSizeChartMenu/DefinedSizeChartMenu';
import DynamicForm from './FormElements/DynamicForm/DynamicForm';
import ButtonSmall from './FormElements/ButtonSmall/ButtonSmall';

import styles from './SizeChartForm.module.scss';

const SizeChartForm = ({ sizeSystem, changeSizeSystem, sizeChart, changeSizeChart }) => {
      const [edit, setEdit] = useState(false);

      useEffect(() => {
            if (!edit) {
                  switch (sizeSystem) {
                        case 'predefined':
                              changeSizeChart([{ sizeDescription: '' }], false);
                              return;
                        case 'custom':
                              changeSizeChart([{ sizeDescription: '' }], false);
                              return;
                        default:
                  }
            }
            setEdit(false);
      }, [sizeSystem]);


      const handleEdit = () => {
            setEdit(true);
            changeSizeSystem('custom'); // to jest ok;
      }

      const { isValid } = sizeChart;

      return (
            sizeSystem &&
            <div>
                  {sizeSystem === 'predefined' && (
                        <>
                              <DefinedSizeChartMenu
                                    sizeChart={sizeChart}
                                    changeSizeChart={changeSizeChart}
                              />
                              {isValid &&
                                    <div className={styles['container']}>
                                          <p className={styles['instruction']}>You can customize defined sie chart.</p>
                                          <ButtonSmall
                                                type="button"
                                                clickHandler={handleEdit}
                                                buttonType={"success"}
                                          >
                                                Edit
                                          </ButtonSmall>
                                    </div>
                              }
                        </>
                  )}
                  {sizeSystem === 'custom' && (
                        <>
                              <DynamicForm
                                    sizeChart={sizeChart}
                                    changeSizeChart={changeSizeChart}
                              />
                        </>
                  )}
            </div>
      )
}

export default SizeChartForm;