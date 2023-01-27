import React from 'react';
import ToggleSwitch from '../../Form/ToggleSwitch/ToggleSwitch'


import { inOfferInputConfig } from './InOfferInputConfig';

const InOffer = ({ inOfferData, inOfferDataChangeHandler, disabled }) => {

      const renderToggleInOffer = () => {
            return Object.values(inOfferInputConfig).map(formElement => (
                  <ToggleSwitch
                        key={formElement.elementName}
                        label={formElement.elementName}
                        elementType={formElement.elementType}
                        elementConfig={formElement.elementConfig}
                        value={inOfferData[formElement.elementConfig.name].value}
                        touched={inOfferData[formElement.elementConfig.name].touched}
                        isValid={inOfferData[formElement.elementConfig.name].isValid}
                        errors={inOfferData[formElement.elementConfig.name].errors}
                        disabled={disabled}
                        onInputChange={inOfferDataChangeHandler(formElement.elementConfig.name)}
                  />
            ))
      }
      return (renderToggleInOffer())
}

export default InOffer;