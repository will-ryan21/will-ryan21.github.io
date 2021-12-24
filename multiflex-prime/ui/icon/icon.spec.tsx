import React from 'react';
import { render } from '@testing-library/react';
import { Icon } from './icon';
import { Creation } from './icon.composition';

it('should allow an icon to be rendered correctly', () => {
  const { container } = render(<Creation />);
  const coreIcon = container.querySelector('svg');
  const path = coreIcon.getElementsByTagName("path");

  expect(path[0]).toHaveAttribute("d","M16.8571 8.28571H11.7143V3.14286C11.7143 2.51179 11.2025 2 10.5714 2H9.42857C8.7975 2 8.28571 2.51179 8.28571 3.14286V8.28571H3.14286C2.51179 8.28571 2 8.7975 2 9.42857V10.5714C2 11.2025 2.51179 11.7143 3.14286 11.7143H8.28571V16.8571C8.28571 17.4882 8.7975 18 9.42857 18H10.5714C11.2025 18 11.7143 17.4882 11.7143 16.8571V11.7143H16.8571C17.4882 11.7143 18 11.2025 18 10.5714V9.42857C18 8.7975 17.4882 8.28571 16.8571 8.28571Z")
});

it('should have the correct title', () => {
  const { container } = render(<Creation />);
  const coreIcon = container.querySelector('svg');
  const titleTag = coreIcon.getElementsByTagName("title");

  expect(titleTag[0]).toBeDefined();
  expect(titleTag[0]).toHaveTextContent("Create action");
});

it('should be sized correctly', () => {
  const { container } = render(<Creation />);
  const coreIcon = container.querySelector('svg');
  expect(coreIcon).toHaveAttribute("width", "16");
  expect(coreIcon).toHaveAttribute("height", "16");
  expect(coreIcon).toHaveAttribute("viewBox", "0 0 20 20");
});

it('should be screen reader accessible by default', () => {
  const { container } = render(<Creation />);
  const coreIcon = container.querySelector('svg');
  const titleTag = coreIcon.getElementsByTagName("title");

  expect(coreIcon).toHaveAttribute("role", "img");
  expect(coreIcon).toHaveAttribute("aria-describedby", titleTag.item(0).id);
});

it('should change colors correctly', () => {
  const { container } = render(<Icon id="creation"  color="#111111" />);
  const coreIcon = container.querySelector('svg');

  expect(coreIcon).toHaveAttribute("fill", "#111111");
});
