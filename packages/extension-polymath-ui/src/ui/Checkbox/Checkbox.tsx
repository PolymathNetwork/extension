import React, { FC, InputHTMLAttributes } from 'react';
import { InlineFlex } from '../InlineFlex';
import { SvgCheckmark, SvgMinusBox } from '../../assets/images/icons';
import * as typeHelpers from '../../typings/helpers';
import * as sc from './styles';
import { Label } from './Label';

export interface Props
  extends typeHelpers.Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (e: boolean) => void;
  /**
   * Specify whether the toggle should be on by default
   */
  defaultChecked?: boolean;
  /**
   * Specify whether the control is checked
   */
  checked?: boolean;
  name?: React.AllHTMLAttributes<HTMLInputElement>['name'];
  label?: React.ReactNode | string;
  indeterminate?: boolean;
}

export const Checkbox: FC<Props> = ({
  checked,
  defaultChecked,
  indeterminate,
  label,
  name,
  onChange,
  ...other
}) => {
  let checkedProps;

  if (typeof checked !== 'undefined') {
    checkedProps = { checked };
  } else {
    checkedProps = { defaultChecked };
  }

  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e.currentTarget.checked);
    }
  };

  return (
    <label>
      <InlineFlex>
        <sc.Input
          {...other}
          {...checkedProps}
          id={name}
          name={name}
          onChange={handleChange}
          type='checkbox'
        />
        <sc.CheckboxInput
          {...(indeterminate ? { className: 'indeterminate' } : {})}
        >
          <sc.CheckStateIcon
            Asset={SvgMinusBox}
            className='minusIcon'
            color='brandMain'
            height='1.3em'
            width='1.3em'
          />
          <sc.CheckStateIcon
            Asset={SvgCheckmark}
            className='checkIcon'
            color='white'
            height='0.9em'
            width='0.9em'
          />
        </sc.CheckboxInput>
        {label && (
          <InlineFlex ml={2}>
            <Label htmlFor={name}>{label}</Label>
          </InlineFlex>
        )}
      </InlineFlex>
    </label>
  );
};
