import React from 'react';
import { Field } from 'formik';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function FormikAutocomplete(props) {
  return (
    <Field name={props.name}>
      {({ field, form, meta }) => {
        const autoCompleteDefaultProps = {
          freeSolo: false,
          onInputChange: () => {},
        };

        if (props.freeSolo) {
          autoCompleteDefaultProps.freeSolo = true;
          autoCompleteDefaultProps.onInputChange = (e, value, reason) =>
            reason === 'input'
              ? form.setFieldValue(field.name, value)
              : () => {};
        }

        return (
          <Autocomplete
            options={props.options}
            value={field.value}
            onChange={(e, value) => form.setFieldValue(field.name, value)}
            {...autoCompleteDefaultProps}
            renderInput={params => (
              <TextField
                {...params}
                label={props.label}
                variant={props.variant || 'outlined'}
                fullWidth
                margin={props.margin || 'normal'}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          />
        );
      }}
    </Field>
  );
}

export default FormikAutocomplete;
