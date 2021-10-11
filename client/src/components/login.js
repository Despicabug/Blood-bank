import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label,Input,FormFeedback, } from 'reactstrap';
import axios from 'axios';


const Login  = ({className,token,setToken}) => {
    
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
    
      const toggle = () => setModal(!modal);


      const nameValidation = (fieldName, fieldValue) => {
          if(fieldValue !== undefined){
            if (fieldValue.trim() === '') {
                return `Username is required`;
              }
              if (/[^a-zA-Z ]/.test(fieldValue)) {
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
      


      const submitLogin = (e) => {
        e.preventDefault();

        if(error.loginUsername !== ''||error.loginPassword !== '')
        {
            alert("Properly fill the data");
        }
        else{
            axios.post('http://localhost:5000/api/auth/signin',{
            "username":value.loginUsername,
            "hash":value.loginPassword
        })
        .then((res) => {
            if(res.status === 200){
                sessionStorage.setItem("token",res.data.token);
            }else{
                throw res;
            }
           
        })
        .catch((err) => {
            console.log("Login Error: "+ err);
            alert('Incorrect crediantials');
        })
        .finally(() =>
        {
            setToken(sessionStorage.getItem("token"));
            setValue({
                loginUsername:'',
                loginPassword:''
            })
            window.location.reload();
        })
        }


        }

        const logoutHandler = () => {
            setToken('');
            sessionStorage.removeItem("token");
            window.location.reload();
        }


      const handleChange = (field) => (e) => {
          setValue({...value,[field]:e.target.value});
      }

    
      if(!sessionStorage.getItem("token"))
      { 

        return (
            <div>
                <Button className="loginBtn" color="danger" style={{border:"1px solid white"}} onClick = { toggle } size = "lg"> Login </Button>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitLogin}>
                            <FormGroup>
                                <Label for="loginUsername">User Name  </Label>
                                <Input
                                type='text'
                                id='loginUsername'
                                name='loginUsername'
                                placeholder="Your User Name"
                                onBlur={handleBlur}
                                valid={error.loginUsername === ''}
                                invalid={error.loginUsername !== ''}
                                value = {value.loginUsername}
                                onChange = {handleChange('loginUsername')}
                                />
                                <FormFeedback>{error.loginUsername}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="loginPassword">Password  </Label>
                                <Input
                                type='password'
                                id='loginPassword'
                                name='loginPassword'
                                placeholder="Your Password"
                                onBlur={handleBlur}
                                valid={error.loginPassword === ''}
                                invalid={error.loginPassword !== ''}
                                value = {value.loginPassword}
                                onChange = {handleChange('loginPassword')}
                                />
                                <FormFeedback>{error.loginPassword}</FormFeedback>
                            </FormGroup>
                            <Button type='submit' color="primary" onClick={toggle}>Login</Button>{' '}
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
          );

      }
      else{
          return(
              <div>
                  <Button className="logoutBtn" onClick={logoutHandler} size = "lg"> Logout </Button>
              </div>
          )
      }
      
}

export default Login;