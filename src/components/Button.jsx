import React from 'react';
import classNames from 'classnames'
import 'components/Button.scss';

export default function Button(props) {
  const { confirm, danger, disabled, warning, onClick } = props;
  // console.log(props);
  //base button class
  let buttonClass = 'button';
  // if (confirm) {
  //   buttonClass += ' button--confirm';
  // }
  // if (danger) {
  //   buttonClass += ' button--danger';
  // }


   buttonClass = (classNames(buttonClass,
    { 'button--confirm': confirm },
     { 'button--warning': warning },
     { 'button--danger': danger }))
  
  // console.log(buttonClass)


  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
}
