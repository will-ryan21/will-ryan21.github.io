import React from 'react';
import { Button } from './button';

export const TextButton = () => (
  <Button text="act through me" icon="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />
);

export const IconButton = () => (
  <Button text="act through me" icon="creation" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />
);

export const IconOnlyButton = () => (
  <Button icon="creation" text="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />
);

export const GhostButton = () => (
  <Button text="act through me" variance="ghost" icon="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />
);

export const GhostIconButton = () => (
  <Button text="act through me" variance="ghost" icon="creation" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />
);

export const GhostIconOnlyButton = () => (
  <Button variance="ghost" icon="creation" text="" disabled={false} disabledMsg="" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />
);

export const DisabledButton = () => (
  <Button variance="ghost" icon="" text="act through me" disabled={true} disabledMsg="test message" tabIndex={0} onclick={function (): {} {
    throw new Error('Function not implemented.');
  } } />
);