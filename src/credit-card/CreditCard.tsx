import { useMemo, useState } from 'react';
import Cards, { Focused } from 'react-credit-cards-2';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  number: Yup.string().length(16).matches(/^\d+$/, 'Invalid').required(),
  name: Yup.string().required(),
  cvc: Yup.string().length(3).matches(/^\d+$/, 'Invalid').required(),
  exppiry: Yup.date().required(),
});

export interface CreditCardComponentProps {
  handleSubmit: (values: Cards) => Promise<void>;
}

export interface Cards {
  number: string;
  name: string;
  exppiry: string;
  cvc: string;
  focused?: Focused;
}

const CreditCard = ({ handleSubmit }: CreditCardComponentProps) => {
  const [submited, setSubmited] = useState<boolean>(false);
  const initialValues = useMemo<Cards>(
    () => ({
      number: '',
      exppiry: '',
      cvc: '',
      name: '',
      focused: '',
    }),
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values, { setSubmitting, ...actions }) => {
        const { name, number, exppiry, cvc } = values;
        handleSubmit({ name, number, exppiry, cvc }).then(() => {
          actions.resetForm();
          setSubmited(true);
        });
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => {
        const handleFocus = (e: React.BaseSyntheticEvent) => {
          setFieldValue('focused', e.target.name);
        };
        const handleCardNumberChange = (e: React.BaseSyntheticEvent) => {
          if (e.target.value > 0 && e.target.value.length <= 16) {
            setFieldValue('number', e.target.value.trim());
          } else if (e.target.value === '') {
            setFieldValue('number', '');
          }
        };
        const handleCvcChange = (e: React.BaseSyntheticEvent) => {
          if (e.target.value > 0 && e.target.value.length <= 3) {
            setFieldValue('cvc', e.target.value.trim());
          } else if (e.target.value === '') {
            setFieldValue('cvc', '');
          }
        };
        return (
          <Form>
            <Cards
              number={values.number}
              expiry={
                values.exppiry
                  ? values.exppiry.substring(2, 4) +
                    values.exppiry.substring(5, 7)
                  : ''
              }
              cvc={values.cvc}
              name={values.name}
              focused={values.focused}
            />
            <div className="form_container">
              <>
                <span className="field_lable">Card number</span>
                <Field
                  type="text"
                  name="number"
                  placeholder="xxxx xxxx xxxx xxxx"
                  onChange={handleCardNumberChange}
                  onFocus={handleFocus}
                  disabled={isSubmitting || submited}
                />
                <div className="field_error">
                  <ErrorMessage name="number" component="span" />
                </div>
              </>
              <>
                <span className="field_lable">Name</span>
                <Field
                  type="text"
                  name="name"
                  onFocus={handleFocus}
                  placeholder="Full name"
                  disabled={isSubmitting || submited}
                />
                <div className="field_error">
                  <ErrorMessage name="name" component="span" />
                </div>
              </>
              <>
                <span className="field_lable">Expiry</span>
                <Field
                  type="month"
                  name="exppiry"
                  onFocus={handleFocus}
                  disabled={isSubmitting || submited}
                />
                <div className="field_error">
                  <ErrorMessage name="exppiry" component="span" />
                </div>
              </>
              <>
                <span className="field_lable">CVC</span>
                <Field
                  type="text"
                  name="cvc"
                  onFocus={handleFocus}
                  placeholder="xxx"
                  onChange={handleCvcChange}
                  disabled={isSubmitting || submited}
                />
                <div className="field_error">
                  <ErrorMessage name="cvc" component="span" />
                </div>
              </>
              <button type="submit" disabled={isSubmitting || submited}>
                Submit
              </button>
              {submited && <p className="success_msg">The payment has been successfully processed</p>}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreditCard;
