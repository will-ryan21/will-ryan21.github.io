import React from 'react';
import { render } from '@testing-library/react';
import { Tooltip } from './tooltip';
import { BasicTooltip } from './tooltip.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicTooltip />);
  const rendered = getByText('hello from Tooltip');
  expect(rendered).toBeTruthy();
});

it('should be visible', () => {
  const { getByText } = render(<BasicTooltip />);
  const rendered = getByText('hello from Tooltip');
  expect(rendered).toBeVisible();
});

it('should be hidable', () => {
  const { getByText } = render(<Tooltip text="tip test" hidden aria='' />);
  const rendered = getByText('tip test');
  expect(rendered).not.toBeVisible();
});

it('should have a role of tooltip', () => {
  const { getByText } = render(<BasicTooltip />);
  const rendered = getByText('hello from Tooltip');
  expect(rendered).toHaveAttribute("role","tooltip");
});

it('should be associatable with other elements for WCAG compliance', () => {
  const { getByText } = render(<div><Tooltip text="tip test" hidden aria="subject" /><div id="subject"></div></div>);
  const rendered = getByText('tip test');
  expect(rendered).toHaveAttribute("aria-describedby","subject");
});
