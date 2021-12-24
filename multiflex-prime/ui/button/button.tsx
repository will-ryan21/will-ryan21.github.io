import React from 'react';
import styles from './button.module.scss';
import "./button.css"
import {Icon} from '@my-scope/ui.icon';
import {Tooltip} from '@my-scope/ui.tooltip';


export type ButtonProps = {
  /**
   * Text of the button
   */
  text: string;

  /**
   * Icon ID for the icon
   */
  icon: string;

  /**
  * The button style options
  */
  variance?: 'filled'| 'ghost';

  /**
   * Disabled status
   */
  disabled: boolean;

  /**
   * Message to be displayed if disabled
   */
  disabledMsg: string;

  /**
   * This lets the button be a generic button, a form submit, or a form reset button
   */
  buttonType?: 'button'| 'submit'| 'reset';

  /**
   * This is the index of the button when tabbing through the interface
   */
  tabIndex: number;

  /**
   * Onclick callback function
   */
  onclick: () => void;
};

/* 
* 
*/
export function Button (
  { text='', 
    icon='',  
    variance='filled', 
    disabled=false, 
    disabledMsg="", 
    buttonType="button",
    onclick, 
    tabIndex=0, 
    ...rest} : ButtonProps) {

  /* 
  * Core on the disabled tooltip
  */
  function setDiabledTooltip(event) {
    if(disabledMsg) {
      const tt = event.currentTarget.parentNode.children[1];

      if(tt.hasAttribute("hidden"))
        tt.removeAttribute("hidden");
    }
  }

  /* 
  * Core off the disabled tooltip
  */
  function removeDiabledTooltip(event) {
      if(disabledMsg) {
        const tt = event.currentTarget.parentNode.children[1];

        tt.setAttribute("hidden","hidden");
      }
  }

  /* 
  * correctly routes the click as necessary
  */
  function routeClick(event) {

    createRipple(event);

    //if there is an onClick to execute
    if(onclick) {
      onclick();
    }
    
  }

  /* 
  * function to add a ripple upon press
  */
  function createRipple(event) {
    const button = event.currentTarget.children[0];

    // ripple icon
    const circle = document.createElement("span"); 
    //calculate max width for ripple
    const diameter = Math.max(button.clientWidth, button.clientHeight); 
    
    //set circle size, position, and style specified in button.css
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `0px`;
    circle.style.top = `${-1 * (button.clientHeight / 2)}px`;
    circle.classList.add("ripple");

    //once added and animated, remove it
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);

  }

  //set button color based on button variety
  var color=styles["brand-white"];
  if(!disabled) {
    if(variance=="ghost") color=styles["brand-primary"];
    else color=styles["brand-white"];
  } else{
    color=styles["brand-disabled"]
  }

  //set the button styling for icons
  const iconStyle= {
    paddingRight: styles["pad-icon"],
    paddingLeft: styles["pad-icon"]
  };
  const noStyle= {
  };
  let styleSelector = noStyle;
  if(text=="") styleSelector = iconStyle;
  
  //create a unique ID
  function uniqueID() {
    return Math.random().toString()+Math.random().toString()+Math.random().toString()+Math.random().toString();
  }
  let btnID = "button__"+uniqueID();

  return (
    <div>
      <span className={styles.disabledStyler} 
            child-disabled={disabled && disabledMsg!="" ? 'true' : 'false' } 
            onClick={routeClick} 
            onFocus={setDiabledTooltip}
            onMouseOver={setDiabledTooltip}
            onBlur={removeDiabledTooltip}
            onMouseOut={removeDiabledTooltip}
            tabIndex={disabled && disabledMsg!="" ? tabIndex : -1 }> 
        <button className={styles.button} 
              style={styleSelector}
              data-variation={variance} 
              type={buttonType}
              disabled={disabled}
              tabIndex={tabIndex}
              id={btnID}
              {...rest} 
              > 
          <span className={styles.label}><Icon id={icon} color={color} /> {text}</span>
        </button>
      </span>
      {(disabledMsg!="") ? <Tooltip text={disabledMsg} hidden={true} aria={btnID} /> : null }
    </div>
  );
}

