import React from 'react';

const ButtonLink = ({ children, onClick }) => {
      return <div onClick={onClick}>
            {children}
      </div>
}

export default ButtonLink;

