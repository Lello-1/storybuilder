import React, { useState, useEffect } from 'react';
import './Editable.css';

const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];
    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type !== 'textarea' && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section className="editable-section" {...props}>
      {isEditing ? (
        <div data-testid = "div handleKeyDown"
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div data-testid="editable" className={`editable-${type}`} onClick={() => setEditing(true)}>
          <span className={`${text ? 'text-black' : 'text-gray'}`}>
            {text || placeholder || 'Editable content'}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;
