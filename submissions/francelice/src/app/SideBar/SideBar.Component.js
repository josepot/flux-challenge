import React,  { Component, Fragment } from "react"
import Button from '../../common/components/button';

const rootStyle = 'css-scroll-buttons';
const upButtonStyle = "scroll-up css-button-up";
const downButtonStyle = "scroll-down css-button-down";
const disabledButtonStyle = "css-button-disabled";

export default props => {

    return (
      <div className={rootStyle}>
        <Button className={upButtonStyle} onClick={props.upButtonClick}/>
        <Button className={downButtonStyle} onClick={props.downButtonClick}/>
      </div>
    );
}

