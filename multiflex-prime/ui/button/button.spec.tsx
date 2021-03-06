import React from 'react';
import styles from './button.module.scss';

import { fireEvent, render } from '@testing-library/react';
//const {default: userEvent} = require('@testing-library/user-event');

import { TextButton, IconButton, GhostButton, DisabledButton } from './button.composition';
import { Button } from './button';

// TODO figure out how to test tabbing
// TODO accessibility testing

it('should render with the correct text', () => {
  const { getByText } = render(<TextButton />);
  const btnLabel = getByText('act through me');
  expect(btnLabel).toBeTruthy();
});

it('should allow an action on click', () => {

  //mock function
  const mockFn = jest.fn();
  
  const { getByText } = render(<Button onclick={function (): boolean {
    mockFn();
    return true;
  } } text="button test" icon="" disabled={false} disabledMsg="" tabIndex={0} />);
  const clickRouter = getByText('button test').parentElement.parentElement;

  fireEvent.click(clickRouter);

  expect(mockFn).toHaveBeenCalledTimes(1);
});

it('should ripple when clicked', () => {

  //mock function
  const mockFn = jest.fn();
  
  const { getByText } = render(<Button onclick={function (): boolean {
    mockFn();
    return true;
  } } text="button test" icon="" disabled={false} disabledMsg="" tabIndex={0} />);
  const clickRouter = getByText('button test').parentElement.parentElement;

  fireEvent.click(clickRouter);

  const ripple = clickRouter.getElementsByClassName("ripple")[0];

  expect(ripple).toBeVisible();
});

it('should have an id by default', () => {
  const { getByText } = render(<TextButton />);
  const btnElement = getByText('act through me').parentElement;

  expect(btnElement).toHaveAttribute('id');
});

it('should allow an icon to be rendered correctly', () => {
  const { getByText } = render(<IconButton />);
  const btnElement = getByText('act through me').parentElement;
  const path = btnElement.getElementsByTagName("path");

  expect(path[0]).toHaveAttribute("d","M16.8571 8.28571H11.7143V3.14286C11.7143 2.51179 11.2025 2 10.5714 2H9.42857C8.7975 2 8.28571 2.51179 8.28571 3.14286V8.28571H3.14286C2.51179 8.28571 2 8.7975 2 9.42857V10.5714C2 11.2025 2.51179 11.7143 3.14286 11.7143H8.28571V16.8571C8.28571 17.4882 8.7975 18 9.42857 18H10.5714C11.2025 18 11.7143 17.4882 11.7143 16.8571V11.7143H16.8571C17.4882 11.7143 18 11.2025 18 10.5714V9.42857C18 8.7975 17.4882 8.28571 16.8571 8.28571Z")
});


//are these actually working?
/*
it('should render primary button correctly by default', () => {
  const { getByText } = render(<TextButton />);
  const rendered = getByText('act through me');
  expect(rendered).toHaveStyle(`background-color: $styles["brand-primary"]`);
});

it('should render ghost button correctly', () => {
  const { getByText } = render(<GhostButton />);
  const rendered = getByText('act through me');
  expect(rendered).toHaveStyle(`background-color: $styles["brand-white"]`);
});*/

it('should render correctly when disabled', () => {
  const { getByText } = render(<DisabledButton />);
  const btnElement = getByText('act through me').parentElement;

  expect(btnElement).toBeDisabled();
});

it('should allow a message displayed on focus when disabled', () => {
  const { container } = render(<DisabledButton />);
  const coreBtn = container.querySelector('div');
  const disabledSpan = coreBtn.children[0];

  fireEvent.mouseEnter(disabledSpan);
  const disabledMsg = coreBtn.children[1];

  expect(disabledMsg).toBeVisible();
});

it('should allow a message displayed on hover when disabled', () => {
  const { container } = render(<DisabledButton />);
  const coreBtn = container.querySelector('div');

  const disabledSpan = coreBtn.children[0];

  fireEvent.mouseEnter(disabledSpan);
  const disMsg = coreBtn.children[1];

  expect(disMsg).toBeVisible();
});

it('should be a standard button by default', () => {
  const { getByText } = render(<Button text="button test" buttonType="button" icon="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />);
  const btnElement = getByText('button test').parentElement;
  expect(btnElement).toHaveAttribute('type','button');
});

it('should be configurable to be a submit button', () => {
  const { getByText } = render(<Button text="button test" buttonType="submit" icon="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />);
  const btnElement = getByText('button test').parentElement;
  expect(btnElement).toHaveAttribute('type','submit');
});

it('should be configurable to be a reset button', () => {
    const { getByText } = render(<Button text="button test" buttonType="reset" icon="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />);
  const btnElement = getByText('button test').parentElement;
  expect(btnElement).toHaveAttribute('type','reset');
});
/*
it('should enable tabbing through', () => {
  const { getByText } = render(
    <div>
      <Button text="button test 1" icon="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
        throw new Error('Function not implemented.');
      } } />
      <Button text="button test 2" icon="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
        throw new Error('Function not implemented.');
      } } />
    </div>);
  const one = getByText('button test 1').parentElement.parentElement;
  const two = getByText('button test 2').parentElement.parentElement;

  one.focus();
  expect(one).toHaveFocus();

  userEvent.tab();
  expect(two).toHaveFocus();
});

it('should respect the tab order', () => {
  const { getByText } = render(
    <div>
      <Button text="button test 1" icon="" disabled={false} disabledMsg="" tabIndex={1} onclick={function (): {} {
        throw new Error('Function not implemented.');
      } } />
      <Button text="button test 2" icon="" disabled={false} disabledMsg="" tabIndex={3} onclick={function (): {} {
        throw new Error('Function not implemented.');
      } } />
      <Button text="button test 3" icon="" disabled={false} disabledMsg="" tabIndex={2} onclick={function (): {} {
        throw new Error('Function not implemented.');
      } } />
    </div>);
  const one = getByText('button test 1');
  const two = getByText('button test 2');
  const three = getByText('button test 3');

  one.focus();
  expect(one).toHaveFocus();

  userEvent.tab();
  expect(three).toHaveFocus();

  userEvent.tab();
  expect(three).toHaveFocus();
});*/
/*
function findContrast(background: string, foreground: string) {
  const bgR = Number(background.charAt(0)) * 16 + Number(background.charAt(1));
  const bgG = Number(background.charAt(2)) * 16 + Number(background.charAt(3));
  const bgB = Number(background.charAt(4)) * 16 + Number(background.charAt(5));

  const fgR = Number(foreground.charAt(0)) * 16 + Number(foreground.charAt(1));
  const fgG = Number(foreground.charAt(2)) * 16 + Number(foreground.charAt(3));
  const fgB = Number(foreground.charAt(4)) * 16 + Number(foreground.charAt(5));

  //Luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B from W3C https://www.w3.org/WAI/GL/wiki/Relative_luminance
  const bgL = 0.2126 * bgR + 0.7152 * bgG + 0.0722 * bgB; 
  const fgL = 0.2126 * fgR + 0.7152 * fgG + 0.0722 * fgB; 
  const lighter = (bgL > fgL) ? bgL : fgL;
  const darker = (bgL > fgL) ? fgL : bgL; 


  // calculate contrast ratio https://www.accessibility-developer-guide.com/knowledge/colours-and-contrast/how-to-calculate/
  return (lighter + 0.05) / (darker + 0.05);
}

it('should have a primary button with sufficient color contrast for WCAG 2.1 standards', () => {
  const { getByText } = render(<TextButton />);
  const rendered = getByText('act through me');
  
  const style = window.getComputedStyle(rendered);
  const background = style.backgroundColor;
  const foreground = style.color;
  
  //font size and font weight are important for figuring which requirement to apply
  const fontsize = Number(style.fontSize.substring(0,style.fontSize.length-2));
  const fontweight = Number(style.fontWeight);

  const contrast = findContrast(background, foreground);

  if((fontsize >= 18.66 && fontweight >= 700) || fontsize >= 24) {
    expect(contrast).toBeGreaterThanOrEqual(3);
  } else {
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  }
});

it('should have a ghost button with sufficient color contrast for WCAG 2.1 standards', () => {
  const { getByText } = render(<GhostButton />);
  const rendered = getByText('act through me');

  const style = window.getComputedStyle(rendered);
  const background = style.backgroundColor;
  const foreground = style.color;
  
  //font size and font weight are important for figuring which requirement to apply
  const fontsize = Number(style.fontSize.substring(0,style.fontSize.length-2));
  const fontweight = Number(style.fontWeight);

  const contrast = findContrast(background, foreground);

  if((fontsize >= 18.66 && fontweight >= 700) || fontsize >= 24) {
    expect(contrast).toBeGreaterThanOrEqual(3);
  } else {
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  }
});

it('should show a borer on focus', () => {
  const { getByText } = render(<TextButton />);
  const rendered = getByText('act through me');

  fireEvent.focusIn(rendered);
  const style = window.getComputedStyle(rendered);
  const border = style.borderColor;

  expect(border).toBeTruthy();
});

it('should have focus border sufficient for WCAG 2.1 standards', () => {
  const { getByText } = render(<TextButton />);
  const rendered = getByText('act through me').parentElement;

  fireEvent.focusIn(rendered);
  const style = window.getComputedStyle(rendered);
  const background = style.getPropertyValue("background-color");
  const border = style.getPropertyValue("border-color");

  const contrast = findContrast(background, border);

  //Needs a 3:1 ratio
  expect(contrast).toBeGreaterThanOrEqual(3);

  //Needs to be at least 3 pixels
  const bordersize = Number(style.getPropertyValue("border-width").substring(0,style.getPropertyValue("border-width").length-2));
  
  expect(bordersize).toBeGreaterThanOrEqual(2);
});*/

