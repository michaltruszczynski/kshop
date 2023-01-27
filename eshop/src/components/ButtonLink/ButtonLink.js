import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './ButtonLink.module.scss';

const ButtonLink = ({ linkPath, children, buttonStyle = 'square' }) => {

      let buttonLinkClassName = [styles['button-link']]

      switch (buttonStyle) {
            case 'square':
                  buttonLinkClassName.push(styles['button-link__square'])
                  break;
            case 'round':
                  buttonLinkClassName.push(styles['button-link__round'])
                  break;
            default:
                  break;
      }

      return (
            <NavLink to={linkPath} className={buttonLinkClassName.join(' ')}>
                  {children}
            </NavLink>
      )
}

export default ButtonLink;