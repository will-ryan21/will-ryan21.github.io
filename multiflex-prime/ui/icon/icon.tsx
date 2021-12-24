import React from 'react';
import icons from './iconSpecs';

export type IconProps = {
  /**
   * Select the icon desired
   */
   id: string
  
   /**
    * Choose a color for the icon
    */
    color: string;
};

/* 
* Core React Icon specifications
*/
export function Icon({ id='', color="#000000"}: IconProps) {

  var title: string = icons['creation'].alt;
  var svg: string = icons['creation'].svg;

  //locate the svg in the specs with this id
  for (var key in icons) {
    if(key == id) {
      title = icons[key].alt;
      svg = icons[key].svg;
    }
  }

  //create a unique ID
  function uniqueID() {
    return Math.random().toString()+Math.random().toString()+Math.random().toString()+Math.random().toString();
  }
  let titleID = "svg__"+uniqueID();

  if(id!='') {
    return (
      <svg className="icon" role="img" aria-describedby={titleID} width="16" height="16" viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
        <title id={titleID}>{title}</title>
        <g>
          <path d={svg}></path>
        </g>
      </svg>
    );
  } else {
    return null;
  }
}
