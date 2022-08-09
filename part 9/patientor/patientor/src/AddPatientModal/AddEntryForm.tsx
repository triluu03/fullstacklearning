import { HealthCheckEntry, HealthCheckRating } from '../types';

import { Formik, Form, Field } from 'formik';
import { Grid, Button } from '@material-ui/core';

import {
    DiagnosisSelection,
    HealthCheckOption,
    SelectField,
    TextField,
} from './FormField';

import { useStateValue } from '../state';

export type HealthCheckFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
    onSubmit: (values: HealthCheckFormValues) => void;
    onCancel: () => void;
}

const healthRateOptions: HealthCheckOption[] = [
    { value: HealthCheckRating.Healthy, label: 'Healthy' },
    { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
    { value: HealthCheckRating.HighRisk, label: 'High Risk' },
    { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                type: 'HealthCheck',
                healthCheckRating: HealthCheckRating.Healthy,
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Field is required';
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className='form ui'>
                        <Field
                            label='Description'
                            placeholder='Description'
                            name='description'
                            component={TextField}
                        />
                        <Field
                            label='Date'
                            placeholder='YYYY-MM-DD'
                            name='date'
                            component={TextField}
                        />
                        <Field
                            label='Specialist'
                            placeholder='Specialist'
                            name='specialist'
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <SelectField
                            label='Health Rates'
                            name='healthRates'
                            options={healthRateOptions}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color='secondary'
                                    variant='contained'
                                    style={{ float: 'left' }}
                                    type='button'
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: 'right',
                                    }}
                                    type='submit'
                                    variant='contained'
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
