import React, { useState,useEffect} from 'react';
import { FormFeedback, Col, Row, Button, Form, FormGroup, Label, Input,Modal,ModalBody,ModalHeader } from 'reactstrap';
import axios from 'axios';
import './components.css';


const DonorForm = () => {

    const [value,setValue] = useState({
                                        firstname: '',
                                        lastname: '',
                                        adhaar: '',
                                        phone: '',
                                        blood: '',
                                        address: '',
                                        city: '',
                                        state: '',
                                        zip: '',
                                        dob: '',
                                        age: 0,
                                        sex: '',
                                        lastdonation: '',
                                        complication: '',
                                        modal:false
                                    });

    const [error,setError] = useState({
                                        firstname: '',
                                        lastname: '',
                                        adhaar: '',
                                        phone: '',
                                        blood: '',
                                        address: '',
                                        city: '',
                                        state: '',
                                        zip: '',
                                        dob: '',
                                        age: '',
                                        sex: '',
                                        lastdonation: '',
                                        complication: ''
                                    });

    const toggle = () => setValue({
        modal:!value.modal
    })

    useEffect(() => {
        setValue({
            ...value,age:new Date(Date.now() - new Date(value.dob).getTime()).getFullYear() - 1970
        });
    }, [value.dob])

    const nameValidation = (fieldValue) => {
        if(fieldValue !== undefined){
            if (fieldValue.length === 0) {
              return `Name is required`;
            }
            else if (/[^a-zA-Z ]/.test(fieldValue)) {
              return 'Invalid characters';
            }
            else if (fieldValue.trim().length < 3) {
              return `At least three characters`;
            }
            return '';
        }
        else
          return '';

    };

    const addressValidation = (address) => {
        if(address !== undefined){
            if(address.length === 0)
                return 'Address cannot be left empty';
            else if(/[-*&^%$#@!=~`{}|\\''"":;?><./,]/.test(address))
                return 'invalid characters';
            else
                return '';
        }else
            return '';
    }

    const phoneValidation = (phone) => {
        if(phone !== undefined){
            if(phone.length === 0)
                return 'Phone no cannot be empty';
            else if(/[ ]+/.test(phone.trim()))
                return 'No spaces Allowed';
            else if(/[a-zA-z`~!@#$%^&*()\-+=}{\[\]|\\;:""'?\/><,.']/.test(phone))
                return 'Only numbers are allowed';
            else if(phone.trim().length !== 10)
                return 'Phone no should be 10 digit';
            else    
                return '';
                
        }
    }


    const sexValidation = (sex) => {
      
            if(sex !== undefined && sex.length === 0 )
                return 'Sex must be selected';
            else
                return ''
    
    }

    const stateValidation = (state) => {
        if(state !== undefined){
            if(state.length === 0)
                return 'State must be selected';
            else
                return ''
        }
        else
            return '';
    }

    const bloodValidate = (blood) => {
        if(blood !== undefined)
        {
            if(blood.trim().length === 0)
                return 'Blood Group must be entered';
            else if(!/^[A-Za-z]{1,2}[+-]$/.test(blood))
               return 'Invalid characters'
            else
                return '';
        }
    }

    const zipValidate = (zip) => {
        if(zip !== undefined)
        {
            if(zip.trim().length === 0)
                return 'Please enter the zip code';
            else if(/[a-zA-z`~!@#$%^&*()\-+=}{\[\]|\\;:""'?\/><,.']/.test(zip))
              return 'Only numbers allowed';
            else if(zip.trim().length !== 6)
             return 'Zip must be 6 digit exactly';
            else
                return '';
        }
    }


    const dobValidate = (dob) => {

        if(dob !== undefined)
        {
            let time_in_years = new Date(Date.now() - new Date(dob).getTime()).getFullYear() - 1970;
            
            if(dob === '')
                return 'Please enter your date of birth';
            else if(time_in_years<18)
                return 'Min age for donation is 18 years';
            else 
                return '';
        }

    }

    const lastdonationValidate = (lastdonation) => {
        if(lastdonation !== undefined)
        {
            let time_diff = Date.now() - new Date(lastdonation).getTime();
            let time_in_days = time_diff/(1000 * 3600 * 24);
            console.log("Time is: "+time_in_days);
           if( time_in_days<180)
                return 'Must wait 6 months before donating';
            else 
                return '';
        }
    }

    const adhaarValidate = (adhaar) => {
        if(adhaar !== undefined)
        {
            if(adhaar.trim().length === 0)
                return 'Please enter your adhaar number';
            else if(!/^[0-9]+$/.test(adhaar))
                return 'Only numbers'
            else if(adhaar.trim().length !== 12)
                return 'Adhaar should be 12 digits exactly';
            else
                return '';
        }
    }

    const complicationValidate = (complication) => {
        if(complication !== undefined)
        {
            if(/[^a-zA-Z ]/.test(complication))
                return 'Invalid Characters';
            else
                return '';
        }
            
    }

    const validate = {
        firstname: nameValidation(value.firstname),
        lastname: nameValidation(value.lastname),
        adhaar:adhaarValidate(value.adhaar),
        phone: phoneValidation(value.phone),
        blood: bloodValidate(value.blood),
        address: addressValidation(value.address),
        city: nameValidation(value.city),
        state: stateValidation(value.state) ,
        zip: zipValidate(value.zip),
        dob: dobValidate(value.dob),
        sex: sexValidation(value.sex),
        lastdonation: lastdonationValidate(value.lastdonation),
        complication: complicationValidate(value.complication)
    }

    const handleBlur = (e) => {
        setError({
            ...error,[e.target.name]:validate[e.target.name]
        })

    }

    const handleChange = (e) => {


        setValue({
            ...value,[e.target.name]: e.target.value
        })

        setError({
            ...error,[e.target.name]:validate[e.target.name]
        })

    }

    //Validate


    const capitalize = (string) => {
        if(string !== undefined)
            return string.replace(/[a-z]+/g, function(a) { return a.toUpperCase(); });
        else
         return null;
    };

    const capitalizeWords = (string) => {
        if(string !== undefined)
            return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase()});
        else
            return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(error.firstname !== ''||error.lastname !== ''||error.phone !== ''||error.blood !== ''||error.address !== ''||error.city !== ''||error.state !== ''||error.zip !== ''||error.dob !== ''||error.sex !== ''||error.lastdonation !== ''||error.complication !== ''||value.state === ''||value.sex === '')
        {
            alert('Fill the form properly');
        }
        else{
            console.log(value.age);
            
            let article = {
                firstname:capitalizeWords(value.firstname),
                lastname:capitalizeWords(value.lastname),
                adhaar:value.adhaar,
                phone:value.phone,
                blood:capitalize(value.blood),
                sex:value.sex,
                address:capitalizeWords(value.address),
                city:capitalizeWords(value.city),
                zip:value.zip,
                state:capitalizeWords(value.state),
                dob:value.dob,
                age:value.age,
                lastdonation:value.lastdonation === ''?null:value.lastdonation,
                complication:value.complication === ''?null:value.complication,
            }

            console.log(article);
    
            axios.post('http://localhost:5000/api/v1/donors',article,{
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then(res => alert("Donor Registered successfully!!"))
            .catch(err => alert(err))
            .finally(() => window.location.reload())
        }
        
    }



        if(sessionStorage.getItem('token'))
        {
            return (

                <div style={{width:"500px",margin:"auto",overflow:"hidden",height:"50%",backgroundColor:"black",padding:"2em",color:"white"}}>
                    <h4>Register Donor</h4>
                    <Form onSubmit={handleSubmit}>
                        <p style = {{ justifyContent: 'center' } } > Name </p> 
                        <Row>
                            <Col md = { 6 } >
                                <FormGroup >
                                    <Input 
                                    type = "text"
                                    name = "firstname"
                                    id = "firstname"
                                    placeholder = "First Name"
                                    value = {value.firstname}
                                    onBlur = { handleBlur }
                                    onChange = { handleChange }
                                    valid = { error.firstname === ' ' }
                                    invalid = { error.firstname !== ' '  }
                                    />
                                    <FormFeedback> {error.firstname}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col md = { 6 } >
                                <FormGroup>
                                    <Input 
                                    type = "text"
                                    name = "lastname"
                                    id = "lastname"
                                    placeholder = "Last Name"
                                    value = {value.lastname}
                                    onBlur = { handleBlur }
                                    onChange = { handleChange }
                                    valid = { error.lastname === '' }
                                    invalid = { error.lastname !== '' }
                                    />
                                    <FormFeedback> { error.lastname } </FormFeedback> 
                                </FormGroup>
                            </Col> 
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor = "adhaar" > Adhaar no </Label> 
                                    <Input 
                                        type = "text"
                                        name = "adhaar"
                                        id = "adhaar"
                                        placeholder = "123456789876"
                                        value = {value.adhaar}
                                        onBlur = { handleBlur}
                                        onChange = { handleChange }
                                        valid = { error.adhaar === '' }
                                        invalid = { error.adhaar !== '' }
                                    /> 
                                    <FormFeedback> { error.adhaar } </FormFeedback> 
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor = "phone" > Phone no </Label>
                                    <Input 
                                        type = "text"
                                        name = "phone"
                                        id = "phone"
                                        placeholder = "9606777684"
                                        value = {value.phone}
                                        onBlur = {handleBlur}
                                        onChange = { handleChange }
                                        valid = { error.phone === '' }
                                        invalid = { error.phone !== '' }
                                    /> 
                                    <FormFeedback> { error.phone } </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor = "blood" > Blood Group </Label>
                                    <Input 
                                        type = "text"
                                        name = "blood"
                                        id = "blood"
                                        placeholder = "A+"
                                        value = {value.blood}
                                        onChange = { handleChange }
                                        valid = {error.blood === ''}
                                        invalid = {error.blood !== ''}
                                    />
                                    <FormFeedback>{error.blood}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor = "address"> Address </Label> 
                                    <Input 
                                        type = "text"
                                        name = "address"
                                        id = "address"
                                        placeholder = "1234 Main St"
                                        value = {value.address}
                                        onChange = { handleChange }
                                        valid={error.address === ''}
                                        invalid={error.address !== ''}
                                    />
                                    <FormFeedback>{error.address}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md = { 4 } >
                                <FormGroup>
                                    <Label htmlFor = "city"> City </Label>
                                    <Input 
                                    type = "text"
                                    name = "city"
                                    id = "city"
                                    value = {value.city}
                                    onChange = { handleChange }
                                    valid={error.city === ''}
                                    invalid={error.city !== ''}
                                    />
                                    <FormFeedback>{error.city}</FormFeedback>
                                </FormGroup>
                            </Col> 
                            <Col md = { 4 }>
                                <FormGroup>
                                    <Label htmlFor="state"> State </Label>
                                    <Input 
                                    type = "select"
                                    name = "state"
                                    value = {value.state}
                                    onChange = { handleChange }
                                    valid={error.state === ''}
                                    invalid={error.state !== ''}
                                    id = "state">
                                        <option value="" default> </option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu And Kashmir">Jammu and Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </Input>
                                    <FormFeedback>{error.state}</FormFeedback>
                                </FormGroup>
                            </Col> 
                            <Col md = { 4 }>
                                <FormGroup>
                                    <Label htmlFor = "zip" > Zip </Label>
                                    <Input 
                                    value = {value.zip}
                                    onChange = { handleChange }
                                    valid={error.zip === ''}
                                    invalid={error.zip !== ''}
                                    type = "text"
                                    name = "zip"
                                    id = "zip" />
                                    <FormFeedback>{error.zip}</FormFeedback>
                                </FormGroup>   
                            </Col> 
                        </Row> 
                        <Row>
                            <Col sm = { 4 }>
                                <FormGroup>
                                    <Label htmlFor = "dob"> D.O.B. </Label>
                                    <Input 
                                        value = {value.dob}
                                        type = "date"
                                        name = "dob"
                                        id = "dob"
                                        onChange = { handleChange }
                                        valid={error.dob === ''}
                                        invalid = {error.dob !== ''}
                                        /> 
                                    <FormFeedback>{error.dob}</FormFeedback>
                                </FormGroup> 
                            </Col> 
                            <Col sm = { 4 }>
                                <FormGroup disabled>
                                    <Label htmlFor = "age" > Age </Label> 
                                    <Input 
                                        value = {value.age}
                                        type = "text"
                                        name = "age"
                                        disabled
                                        /> 
                                </FormGroup>
                            </Col> 
                            <Col sm = { 4 }>
                                <FormGroup>
                                    <Label htmlFor = "sex" > Sex </Label> 
                                    <Input 
                                        value = {value.sex}
                                        type = "select"
                                        name = "sex"
                                        id = "sex"
                                        valid={ error.sex === ''}
                                        invalid={error.sex !== ''}
                                        onBlur={handleBlur}
                                        onChange = { handleChange } >
                                        <option value="" default> </option>
                                        <option value = "M" > M </option> 
                                        <option value = "F" > F </option> 
                                        <option value = "O" > Other </option> 
                                    </Input> 
                                    <FormFeedback>{error.sex}</FormFeedback>
                                </FormGroup> 
                            </Col> 
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                <Label htmlFor = "lastdonation"> Last Donation </Label> 
                                <Input 
                                    value={value.lastdonation}
                                    onChange = { handleChange }
                                    type = "date"
                                    name = "lastdonation"
                                    id = "lastdonation" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                <Label for = "complication" > Any Complication ? </Label>
                                <Input 
                                    value = {value.complication} 
                                    type = "textarea"
                                    onChange = { handleChange }
                                    name = "complication"
                                    id = "complication" />
                                </FormGroup>  
                            </Col>
                        </Row>                     
                    <Button type = "submit"> Submit </Button>
                </Form>
    
                </div>
            );
        }
        else{
            return(
                <div>
                    <button className="donateBttn" onClick={toggle}>Be a donor</button>
                    <Modal isOpen={value.modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Register as donor</ModalHeader>
                        <ModalBody>
                        <Form onSubmit={handleSubmit}>
                        <p style = {{ justifyContent: 'center' } } > Name </p> 
                        <Row form >
                            <Col md = { 6 } >
                                <FormGroup >
                                    <Input 
                                        type = "text"
                                        name = "firstname"
                                        id = "firstname"
                                        placeholder = "First Name"
                                        value = {value.firstname}
                                        onBlur = { handleBlur}
                                        onChange = { handleChange }
                                        valid = { error.firstname === '' }
                                        invalid = { error.firstname !== '' }
                                    /> 
                                    <FormFeedback> { error.firstname } </FormFeedback>
                                </FormGroup> 
                            </Col> 
                            <Col md = { 6 }>
                                <FormGroup>
                                    <Input 
                                        type = "text"
                                        name = "lastname"
                                        id = "lastname"
                                        placeholder = "Last Name"
                                        value = {value.lastname}
                                        onBlur = { handleBlur}
                                        onChange = { handleChange }
                                        valid = { error.lastname === '' }
                                        invalid = { error.lastname !== '' }
                                        /> 
                                    <FormFeedback> { error.lastname } </FormFeedback> 
                                </FormGroup> 
                            </Col> 
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup >
                                    <Label htmlFor = "adhaar" > Adhaar no </Label> 
                                    <Input 
                                        type = "text"
                                        name = "adhaar"
                                        id = "adhaar"
                                        placeholder = "123456789876"
                                        value = {value.adhaar}
                                        onBlur = {handleBlur}
                                        onChange = { handleChange }
                                        valid = { error.adhaar === '' }
                                        invalid = { error.adhaar !== '' }
                                    /> 
                                    <FormFeedback> { error.adhaar } </FormFeedback> 
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                <Label htmlFor = "phone" > Phone no </Label>
                                <Input 
                                    type = "text"
                                    name = "phone"
                                    id = "phone"
                                    placeholder = "9606777684"
                                    value = {value.phone}
                                    onBlur = {handleBlur}
                                    onChange = { handleChange }
                                    valid = { error.phone === '' }
                                    invalid = { error.phone !== '' }
                                />
                                <FormFeedback> { error.phone } </FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                <Label htmlFor = "blood"> Blood Group </Label>
                                <Input 
                                    type = "text"
                                    name = "blood"
                                    id = "blood"
                                    placeholder = "A+"
                                    value = {value.blood}
                                    onBlur={handleBlur}
                                    onChange = { handleChange }
                                    valid = { error.blood === '' }
                                    invalid = { error.blood !== '' }
                                /> 
                                <FormFeedback>{error.blood}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor = "address" > Address </Label> 
                                    <Input 
                                        type = "text"
                                        name = "address"
                                        id = "address"
                                        placeholder = "1234 Main St"
                                        value = {value.address}
                                        onChange = { handleChange }
                                        valid={error.address === ''}
                                        invalid={error.address !== ''}
                                        onBlur={handleBlur}
                                    />
                                    <FormFeedback>{error.address}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md = { 4 } >
                                <FormGroup>
                                    <Label htmlFor = "city"> City </Label> 
                                    <Input 
                                        type = "text"
                                        name = "city"
                                        id = "city"
                                        value = {value.city}
                                        onChange = { handleChange }
                                        onBlur={handleBlur}
                                        valid={error.city === ''}
                                        invalid={error.city !== ''}
                                    /> 
                                    <FormFeedback>{error.city}</FormFeedback>
                                </FormGroup> 
                                
                            </Col> 
                            <Col md = { 4 }>
                                <FormGroup>
                                    <Label htmlFor = "state"> State </Label> 
                                    <Input 
                                        type = "select"
                                        name = "state"
                                        value = {value.state}
                                        onChange = { handleChange }
                                        onBlur={handleBlur}
                                        valid={error.state === ''}
                                        invalid={error.state !== ''}
                                        id = "state" 
                                    >
                                        <option value="" default> </option>
                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        <option value="Assam">Assam</option>
                                        <option value="Bihar">Bihar</option>
                                        <option value="Chandigarh">Chandigarh</option>
                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                        <option value="Daman and Diu">Daman and Diu</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Lakshadweep">Lakshadweep</option>
                                        <option value="Puducherry">Puducherry</option>
                                        <option value="Goa">Goa</option>
                                        <option value="Gujarat">Gujarat</option>
                                        <option value="Haryana">Haryana</option>
                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                        <option value="Jammu and Kashmir">Jammu And Kashmir</option>
                                        <option value="Jharkhand">Jharkhand</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Manipur">Manipur</option>
                                        <option value="Meghalaya">Meghalaya</option>
                                        <option value="Mizoram">Mizoram</option>
                                        <option value="Nagaland">Nagaland</option>
                                        <option value="Odisha">Odisha</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Rajasthan">Rajasthan</option>
                                        <option value="Sikkim">Sikkim</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                        <option value="Tripura">Tripura</option>
                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                        <option value="Uttarakhand">Uttarakhand</option>
                                        <option value="West Bengal">West Bengal</option>
                                    </Input>
                                    <FormFeedback>{error.state}</FormFeedback>
                                </FormGroup> 
                            </Col> 
                            <Col md = { 4 }>
                                <FormGroup>
                                    <Label htmlFor = "zip"> Zip </Label>
                                    <Input 
                                        value = {value.zip}
                                        onChange = { handleChange }
                                        type = "text"
                                        name = "zip"
                                        onBlur={handleBlur}
                                        valid={error.zip === ''}
                                        invalid={error.zip !== ''}
                                        id = "zip" 
                                    />                              
                                    <FormFeedback>{error.zip}</FormFeedback>
                                </FormGroup>   
                            </Col> 
                        </Row> 
                        <Row>
                            <Col sm = { 4 } >
                                <FormGroup>
                                    <Label htmlFor = "dob"> D.O.B. </Label>
                                    <Input 
                                        value = {value.dob}
                                        type = "date"
                                        name = "dob"
                                        id = "dob"
                                        onChange = { handleChange }
                                        onBlur = {handleBlur}
                                        valid={error.dob === ''}
                                        invalid={error.dob !== ''}
                                    /> 
                                    <FormFeedback>{error.dob}</FormFeedback> 
                                </FormGroup>
                            </Col> 
                            <Col sm = { 4 }>
                                <FormGroup disabled> 
                                    <Label htmlFor = "age" > Age </Label> 
                                    <Input 
                                        value = {value.age}
                                        type = "text"
                                        name = "age"
                                        disabled
                                    /> 
                                </FormGroup> 
                            </Col>
                            <Col sm = { 4 }>
                                <FormGroup>
                                    <Label htmlFor = "sex"> Sex </Label> 
                                    <Input 
                                        value = {value.sex}
                                        type = "select"
                                        name = "sex"
                                        id = "sex"
                                        onChange = { handleChange } 
                                        onBlur={handleBlur}
                                        valid={error.sex === ''}
                                        invalid={error.sex !== ''}
                                    >
                                    <option value="" default> </option> 
                                    <option value = "M" > M </option> 
                                    <option value = "F" > F </option> 
                                    <option value = "O" > Other </option> 
                                    </Input> 
                                    <FormFeedback>{error.sex}</FormFeedback>
                                </FormGroup> 
                            </Col> 
                        </Row>         
            
                        <Row>
                            <Col>
                                <FormGroup >
                                    <Label htmlFor = "lastdonation"> Last Donation </Label> 
                                        <Input 
                                            value={value.lastdonation}
                                            onChange = { handleChange }
                                            type = "date"
                                            name = "lastdonation"
                                            id = "lastdonation" 
                                            onBlur={handleBlur}
                                            valid={error.lastdonation === ''}
                                            invalid={error.lastdonation !== ''}
                                        />
                                        <FormFeedback>{error.lastdonation}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for = "complication" > Any Complication ? </Label>
                                    <Input 
                                        value = {value.complication} 
                                        type = "textarea"
                                        onChange = { handleChange }
                                        onBlur={handleBlur}
                                        valid={error.complication === ''}
                                        invalid={error.complication !== ''}
                                        name = "complication"
                                        id = "complication" 
                                    />
                                    <FormFeedback>{error.complication}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button color="primary" type = "submit" > Submit </Button>
                        </Form>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
};

export default DonorForm;