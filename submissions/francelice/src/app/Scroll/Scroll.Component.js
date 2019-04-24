import React from "react"

const disabledButtonStyle = "css-button-disabled";

export default ({scrollUpEnabled, scrollDownEnabled, scrollUp, scrollDown}) => {

    const disabledUpClass = scrollUpEnabled ? "" : disabledButtonStyle;
    const disabledDownClass = scrollDownEnabled ? "": disabledButtonStyle;
    const up = scrollUpEnabled ? scrollUp : null;
    const down = scrollDownEnabled ? scrollDown: null;

    return (
      <div className='css-scroll-buttons'>
        <button className={`scroll-up css-button-up ${disabledUpClass}`} onClick={up}/>
        <button className={`scroll-down css-button-down ${disabledDownClass}`} onClick={down}/>
      </div>
    );
}

