import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label,Input,FormFeedback, } from 'reactstrap';
import axios from 'axios';
import './components.css';

const Register = () => {

    const [value,setValue] = useState({
        loginUsername:'',
        loginPassword:'',
        regUsername:'',
        regPassword:'',
        email:'',
        confirmPassword:''
    });

    const [error,setError] = useState({
      loginUsername:'',
      loginPassword:'',
      regUsername:'',
      regPassword:'',
      email:'',
      confirmPassword:''
    })

    const [modal, setModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
  
    const toggle = () => setModal(!modal);

    const nameValidation = (fieldName, fieldValue) => {
        if(fieldValue !== undefined){
          if (fieldValue.trim() === '') {
              return `Username is required`;
            }
            if (/[^a-zA-Z -]/.test(fieldValue)) {
              return 'Invalid characters';
            }
            if (fieldValue.trim().length < 3) {
              return `Username needs to be at least three characters`;
            }
            return '';
        }
        else
          return '';

    };
    
    const emailValidation = email => {
        if(email !== undefined){
          if (
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                email,
              )
            ) {
              return '';
            }
            if (email.trim() === '') {
              return 'Email is required';
            }
            return 'Please enter a valid email';
        }
        else
          return '';
     
    };

    const passwordConfirmValidation = (pass,con) => {
        if(con !== undefined){
          if(con.trim().length===0)
              return 'Field cannot be empty';
          else if(pass !== con)
              return 'Passwords dont match';
          else
              return '';
        }
        else
          return '';

    }

    const passValidation = (pass) => {
        if(pass !== undefined)
        {
          if(pass.trim() === '')
              return 'Password is required';
          else if(pass.trim().length<6)
              return 'Password too short should be > 5 char';
          else 
              return '';
        }
        else
          return '';

    }

    const validate = {
        loginUsername:nameValidation('loginUsername',value.loginUsername),
        loginPassword:passValidation(value.loginPassword),
        regUsername:nameValidation('regUsername',value.regUsername),
        regPassword:passValidation(value.regPassword),
        email:emailValidation(value.email),
        confirmPassword:passwordConfirmValidation(value.regPassword,value.confirmPassword)
    }

    const handleBlur = ({target}) => {

      setError({
          ...error,[target.name]:validate[target.name]
      })
    }

    const submitRegister = (e) => {
        e.preventDefault();

       //Validate Input
       setError({
           ...error,regUsername:nameValidation('regUsername',value.regUsername),
           email:emailValidation(value.email),
           regPassword:passValidation(value.regPassword),
           confirmPassword:passwordConfirmValidation(value.regPassword,value.confirmPassword)
       });


       if(error.regUsername !== ''||error.regPassword !== ''||error.email !== ''||error.confirmPassword !== '')
       {
          alert("Properly fill the data");
       }
       else{
          let reg = {
              "email":value.email,
              "username":value.regUsername,
              "hash":value.regPassword
          }

          axios.post('http://localhost:5000/api/auth/signup',reg, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then((res) => {
            if(res.status === 200){
                alert("Registered Successfully");
            }else{
                throw res;
            }
        })
        .catch((err) => {
            alert("Err: "+err);
        })
        .finally(() => {
            setValue({
                regUsername:'',
                regPassword:'',
                confirmPassword:'',
                email:''
            })
            window.location.reload();
        })
       }   
    }

    const handleChange = (field) => (e) => {
        setValue({...value,[field]:e.target.value});
    }

    return (
        <div>
            <Button className="registerBttn" color="primary" onClick = { toggle } size = "lg"> Register </Button>
            <Modal isOpen={modal} toggle={toggle} onClosed={closeAll ? toggle : undefined}>
                <ModalHeader>Register</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitRegister}>
                        <FormGroup>
                            <Label for='regUsername'>User Name </Label>
                            <Input 
                                type="text"
                                id="regUsername"
                                placeholder='Your Name'
                                name="regUsername"
                                onBlur={handleBlur}
                                valid={error.regUsername === ''}
                                invalid={error.regUsername !== ''}
                                value={value.regUsername}
                                onChange={handleChange('regUsername')}
                            /> 
                            <FormFeedback>{error.regUsername}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for='email'>Email </Label>
                                        <Input 
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder='Your Email'
                                        onBlur={handleBlur}
                                        valid={error.email === ''}
                                        invalid={error.email !== ''}
                                        value={value.email}
                                        onChange={handleChange('email')}
                                        /> 
                                        <FormFeedback>{error.email}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='regPassword'>Password </Label>
                                        <Input 
                                        type="password"
                                        id="regPassword"
                                        name="regPassword"
                                        placeholder='Enter Your Password'
                                        onBlur={handleBlur}
                                        valid={error.regPassword === ''}
                                        invalid={error.regPassword!== ''}
                                        value={value.regPassword}
                                        onChange={handleChange('regPassword')}
                                        /> 
                                        <FormFeedback>{error.regPassword}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='confirmPassword'>Confirm Password </Label>
                                        <Input 
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        valid={error.confirmPassword === ''}
                                        invalid={error.confirmPassword !== ''}
                                        placeholder='Confirm Your Password'
                                        value={value.confirmPassword}
                                        onChange={handleChange('confirmPassword')}
                                        /> 
                                        <FormFeedback>{error.confirmPassword}</FormFeedback>
                                    </FormGroup>
                                    <Button type='submit' color="primary" onClick={toggle}>Register </Button>{' '}
                                </Form>
                            </ModalBody>
                        </Modal>
        </div>
    )
}

export default Register;
