import React, {useRef, useEffect} from 'react';
import styles from './tooltip.module.scss';

export type TooltipProps = {
  /**
   * a text to be rendered in the component.
   */
  text: string;

  /**
   * Show or hide the tooltip
   */
  hidden: boolean;

  /**
   * This will connect the aria-describedby accessibility
   */
  aria: string;
};

/* 
* Core React Tooltip specification
*/
export function Tooltip({ text, hidden=false, aria=""}: TooltipProps) {

  // reference to the 
  let ref= useRef<HTMLDivElement>(null);

  // determine the x, y, width, height of the tooltip
  let x, y, width, height;


  useEffect(() => {
    //reference to the computed tooltip this looks to a button element to properly move the tooltip appropriately above or below the button
    let target = ref.current?.parentNode.children[0].children[0];
    let new_style = styles.tooltip_bottom;
    
    if(!(typeof target === 'undefined')) {
      x = target.clientLeft;
      y = target.clientTop;
      width = target.clientWidth;
      height = target.clientHeight;

      //Set an 8 pixel gap between the objects unless that would push it above the window
      new_style = y <= 8 + ref.current.clientHeight ? styles.tooltip_bottom : styles.tooltip_top;
    }

    ref.current.classList.add(new_style);
  })

  return (
    <div ref={ref} className={styles.tooltip} hidden={hidden} aria-describedby={aria} role="tooltip" >
      {text}
    </div>
  );
}
