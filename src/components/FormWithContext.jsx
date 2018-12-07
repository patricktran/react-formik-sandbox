import React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//example using React Context

const initialValues = {
    friends: [
        {
            name: '',
            email: '',
            comment: ''
        }
    ]
};

const FormikContext = React.createContext();

class MyForm extends React.Component {
    static contextType = FormikContext;
    render() {

        const { values, arrayHelpers } = this.context;

        return <React.Fragment>
            {values["friends"] && values["friends"].length > 0 &&
                values["friends"].map((friend, index) => (
                    <div className="row" key={index}>
                        <div className="col">
                            <Field name={`friends.${index}.name`} type="text" placeholder="John Doe" />
                            <ErrorMessage name={`friends.${index}.name`} />
                        </div>
                        <div className="col">
                            <Field name={`friends.${index}.email`} type="email" placeholder="john@example.com" />
                            <ErrorMessage name={`friends.${index}.email`} />
                        </div>
                        <div className="col">
                            {/* render own field */}
                            <Field name={`friends.${index}.comment`} render={innerProps => {
                                return <input index={index} type="text" {...innerProps.field} />
                            }} />
                        </div>
                        <div className="col">
                            <button type="button" onClick={() => arrayHelpers.remove(index)}>X</button>
                        </div>
                    </div>))
            }
        </React.Fragment>
    }
}

const FormWithContext = () => (
    <div>
        <h1>Invite Friends</h1>
        <Formik initialValues={initialValues}
            onSubmit={(values, formikBag) => {
                console.log(formikBag);
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 500)
            }}
            validationSchema={
                Yup.object({
                    friends: Yup.array().of(Yup.object({
                        name: Yup.string().required('Required'),
                        email: Yup.string().email('Invalid email').required('Required'),
                        comment: Yup.string()
                    }))
                })
            }
            render={props => {
                const { values, isSubmitting } = props;  //formik props

                return <Form>
                    <FieldArray
                        name="friends"
                        render={arrayHelpers => (
                            <React.Fragment>
                                <FormikContext.Provider
                                    value={{
                                        values,
                                        isSubmitting,
                                        arrayHelpers
                                    }}>
                                    <MyForm />
                                </FormikContext.Provider>
                                <button type="button" disable={isSubmitting.toString()} onClick={() => arrayHelpers.push({ name: 'test', email: 'test@example.com', comment: '' })}>Add Friend</button>
                            </React.Fragment>
                        )}
                    />
                    <button type="submit" disable={isSubmitting.toString()}>Invite</button>
                    <pre>
                        {JSON.stringify(props, null, 2)}
                    </pre>
                </Form>
            }}></Formik>
    </div>
)

export default FormWithContext;