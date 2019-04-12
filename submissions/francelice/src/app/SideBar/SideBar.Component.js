import React,  { Component, Fragment } from "react"
import Button from '../../common/components/button';

const rootStyle = 'css-scroll-buttons';
const upButtonStyle = "scroll-up css-button-up";
const downButtonStyle = "scroll-down css-button-down";
const disabledButtonStyle = "css-button-disabled";

export default (props) => {

    const {scrollUpEnabled, scrollDownEnabled, scrollUp, scrollDown, allBlocked} = props;
    const disabledUpClass = scrollUpEnabled || allBlocked? "" : disabledButtonStyle;
    const disabledDownClass = scrollDownEnabled || allBlocked? "": disabledButtonStyle;
    const up = scrollUpEnabled || allBlocked? scrollUp : null;
    const down = scrollDownEnabled || allBlocked? scrollDown: null;


    return (
      <div className={rootStyle}>
        <Button className={`${upButtonStyle} ${disabledUpClass}`} onClick={up}/>
        <Button className={`${downButtonStyle} ${disabledDownClass}`} onClick={down}/>
      </div>
    );
}

