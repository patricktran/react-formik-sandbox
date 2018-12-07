import React, { Component } from 'react';

class MiniFormik extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: this.props.initialValues || {},
            touched: {},
            errors: {}
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        //https://reactjs.org/docs/events.html
        //f you want to access the event properties in an asynchronous way, 
        //you should call event.persist() on the event, which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
        event.persist();

        //computed property
        /*this.setState({
            [name]: value
        });*/

        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value
            }
        }));
    }

    handleBlur = (event) => {

        const target = event.target;
        const name = target.name;

        event.persist();

        this.setState(prevState => ({
            touched: {
                ...prevState.touched,
                [name]: true
            }
        }));
    }

    handleSubmit = e => {

        e.preventDefault();
        //todo - validate
        this.props.onSubmit(this.state.values);
    }

    render() {

        //call render prop callback and pass in props/args
        return this.props.children({
            ...this.state,
            handleChange: this.handleChange,
            handleBlur: this.handleBlur,
            handleSubmit: this.handleSubmit
        });
    }

}

export default class Reservation extends Component {

    /*constructor(props) {
        super(props);
        
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        //this.handleInputChange = this.handleInputChange.bind(this);
    }*/

    //shared change handler - used for inputs and checkboxes
    //1) Orig
    /* handleInputChange(event) {
         const target = event.target;
         const value = target.type === 'checkbox' ? target.checked : target.value;
         const name = target.name;
 
         //computed property
         this.setState({
             [name]: value
         });
     }*/
    //2) abstracted out to MiniFormik

    render() {
        return (
            <MiniFormik initialValues={{
                isGoing: true,
                numberOfGuests: 2
            }} onSubmit={values => alert(JSON.stringify(values, null, 2))}>
                {/*render prop technique*/}
                {(props) => {

                    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props;

                    return <form onSubmit={handleSubmit}>
                        <label>
                            Is going:
            <input
                                name="isGoing"
                                type="checkbox"
                                checked={values.isGoing}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </label>
                        <br />
                        <label>
                            Number of guests:
            <input
                                name="numberOfGuests"
                                type="number"
                                value={values.numberOfGuests}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                        </label>
                        <pre>{JSON.stringify(props, null, 2)}</pre>
                    </form>
                }
                }
            </MiniFormik>
        );
    }
}