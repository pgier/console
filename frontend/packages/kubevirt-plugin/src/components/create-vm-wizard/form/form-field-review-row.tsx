import * as React from 'react';
import { getFieldTitle } from '../utils/vm-settings-tab-utils';
import { iGetFieldValue } from '../selectors/immutable/vm-settings';
import { iGet } from '../../../utils/immutable';
import { getCheckboxReadableValue } from '../../../utils/strings';
import { FormFieldType } from './form-field';

type FormFieldReviewRowProps = {
  field: any;
  fieldType: FormFieldType;
};

export const FormFieldReviewRow: React.FC<FormFieldReviewRowProps> = ({ fieldType, field }) => {
  const fieldKey = iGet(field, 'key');
  const value = iGetFieldValue(field);
  const reviewValue = [FormFieldType.CHECKBOX, FormFieldType.INLINE_CHECKBOX].includes(fieldType)
    ? getCheckboxReadableValue(value)
    : value;
  if (!reviewValue) {
    return null;
  }
  return (
    <>
      <dt>{getFieldTitle(fieldKey)}</dt>
      <dd>{reviewValue}</dd>
    </>
  );
};
