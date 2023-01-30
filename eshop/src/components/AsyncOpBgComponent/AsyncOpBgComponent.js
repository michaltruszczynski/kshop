import React from 'react';

import ErrorInformation from './ErrorInformation/ErrorInformation';
import BackgroundContent from '../BackgroundContent/BackgroundContent';
import Logo from '../Logo/Logo';

const AsyncOpBgComponent = ({ status, error, children, showErrorMessage }) => {
      switch (status) {
            case 'idle':
                  return (
                        <BackgroundContent>
                              <Logo />
                        </BackgroundContent>
                  )
            case 'success':
                  return children;
            case 'loading':
                  return (
                        <BackgroundContent>
                              Loading...
                        </BackgroundContent>
                  );
            case 'error':
                  return <ErrorInformation error={error} children={children} showErrorMessage={showErrorMessage} />
            default:
                  return (
                        <BackgroundContent>
                              <Logo />
                        </BackgroundContent>
                  )
      }
}

export default AsyncOpBgComponent;