import React, { PropTypes } from 'react';
import classNames from 'classnames';

const ScrollButtons = ({
  onScrollUp, onScrollDown,
  isScrollUpDisabled, isScrollDownDisabled,
}) => {
  const upClass =
    classNames('css-button-up', { 'css-button-disabled': isScrollUpDisabled });

  const downClass =
    classNames('css-button-down', { 'css-button-disabled': isScrollDownDisabled });
  return (
      <div className="css-scroll-buttons">
        <button className={upClass}
                onClick={ (e) => isScrollUpDisabled ? e.preventDefault() :
                                                      onScrollUp() }>
        </button>
        <button className={downClass}
                onClick={ (e) => isScrollDownDisabled ? e.preventDefault() :
                                                        onScrollDown() }>
        </button>
      </div>
    );
}

ScrollButtons.propTypes = {
  onScrollUp: PropTypes.func.isRequired,
  onScrollDown: PropTypes.func.isRequired,
  isScrollUpDisabled: PropTypes.bool.isRequired,
  isScrollDownDisabled: PropTypes.bool.isRequired
};

export default ScrollButtons;
