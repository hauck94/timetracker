import React from 'react';
import { render } from '../../utils/tests';
import { Button } from './Button';

describe('Button', () => {
  it('does render', () => {
    render(<Button />);
  });
});
