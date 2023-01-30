import React from 'react';
import { useLocation } from 'react-router-dom';

import BackgroundContent from '../../components/BackgroundContent/BackgroundContent';
import ButtonLink from '../../components/ButtonLink/ButtonLink';

import styles from './ErrorRedirectPage.module.scss';

const ErrorRedirectPage = () => {

      const location = useLocation();
      const { state: { redirectFrom, errorMessage } } = location;

      let redirectButton = null;
      if (redirectFrom) {
            redirectButton = (
                  <div className={styles['button-container']}>
                        <ButtonLink linkPath={redirectFrom} >Try again</ButtonLink>
                  </div>
            )
      }

      return (
            <BackgroundContent>
                  {errorMessage ? (<h3>{errorMessage}</h3>) : null}
                  {redirectButton}
            </BackgroundContent>
      )
}

export default ErrorRedirectPage;