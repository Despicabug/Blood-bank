import React,{ useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody,Form,FormGroup,Label,Input,Row,Col,Card,CardBody,FormFeedback } from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Requests = ({className,requestData,inventoryData}) => {

    const [value,setValue] = useState({
        pName:'',
        pAddress:'',
        pPhone:'',
        pSex:'',
        pAge:'',
        pDoctor:'',
        pHospital:'',
        gName:'',
        gPhone:'',
        bloodReq:'',
        qtyReq:''
    });

    const [error,setError] = useState({
        pName:'',
        pAddress:'',
        pPhone:'',
        pSex:'',
        pAge:'',
        pDoctor:'',
        pHospital:'',
        gName:'',
        gPhone:'',
        bloodReq:'',
        qtyReq:''
    });
        
    const [modal, setModal] = useState(false);
    
    const toggle = () => setModal(!modal);

    const capitalize = (string) => {
        return string.replace(/[a-z]+/g, function(a) { return a.toUpperCase(); });
    };

    const capitalizeWords = (string) => {
        return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    const nameValidation = (fieldValue) => {
        if(fieldValue !== undefined){
          if (fieldValue.length === 0) {
              return `Name is required`;
            }
            if (/[^a-zA-Z ]/.test(fieldValue)) {
              return 'Invalid characters';
            }
            if (fieldValue.trim().length < 3) {
              return `Name needs to be at least three characters`;
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

    const ageValidation = (age) => {
        if(age !== undefined){
            if(age.length === 0)
                return 'Age cannot be empty';
            else if(/[ ]+/.test(age))
                return 'No spaces Allowed';
            else if(!/[0-9]+/.test(age))
                return 'Only numbers are allowed';
            else if(parseInt(age)<0 || parseInt(age)>110)
                return 'Age must be between 0 and 110 years';
            else
                return '';
        }
        else
            return '';
    }

    const sexValidation = (sex) => {
        if(sex !== undefined){
            if(sex.length === 0)
                return 'Sex must be selected';
            else
                return ''
        }
        else
            return '';
    }

    const bloodValidate = (blood) => {
        if(blood.trim().length === 0)
            return 'Blood Group must be entered';
        else if(!/^[A-Za-z]{1,3}[+-]$/.test(blood))
            return 'Invalid characters'
        else
            return '';
    }

    const qtyValidate = (quantity) => {
        if(quantity.trim().length === 0)
            return 'Please enter the quantity';
        else if(!/[0-9]+/.test(quantity))
            return 'Only numbers allowed';
        else if(parseInt(quantity) > 5 || parseInt(quantity)<1)
            return 'Can only Request between 1 to 5 pint';
        else    
            return '';
    }

    const validate = {
        pName:nameValidation(value.pName),
        pAddress:addressValidation(value.pAddress),
        pPhone:phoneValidation(value.pPhone),
        pSex:sexValidation(value.pSex),
        pAge:ageValidation(value.pAge),
        pDoctor:nameValidation(value.pDoctor),
        pHospital:nameValidation(value.pHospital),
        gName:nameValidation(value.gName),
        gPhone:phoneValidation(value.gPhone),
        bloodReq:bloodValidate(value.bloodReq),
        qtyReq:qtyValidate(value.qtyReq)
    }

    const handleBlur = ({target}) => {
        setError({
            ...error,[target.name]:validate[target.name]
        })
    }

    const handleChange = (e) => {
        setValue({
            ...value,[e.target.name]:e.target.value
        })

        setError({
            ...error,[e.target.name]:validate[e.target.name]
        })
    }


    const handleClick = (reqId,blood,qty,hos) => {//Grant Request
        const item = inventoryData.filter((i) => i.blood_grp === blood);

        if(item[0] !== undefined)
        {
            if(item[0].qty < qty)
            {
                alert("Insufficient amount available");
            }
            else{
                //Delete request update inventory
                let newQty = item[0].qty - qty;
                let article = {
                    "qty":newQty
                }
    
                axios.put(`http://localhost:5000/api/v1/inventory/${blood}`, article, {//Update inventory
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .then(response => alert(response.data.updatedAt));
    
                axios.delete(`http://localhost:5000/api/v1/requests/${reqId}`, {//Delete Request
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .then(response => console.log(response.data))
    
                let newHistory = {
                    "req_id":reqId,
                    "blood_grp":blood,
                    "qty":qty,
                    "req_name":capitalizeWords(hos)
                }
    
                axios.post('http://localhost:5000/api/v1/history',newHistory, {//Create history
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .then(response => console.log(response.data))
    
                window.location.reload();
            }
        }else{
            alert("Unable to find inventory.\nRequest cannot be completed at the moment.\n\nSorry for the inconvenience");
        }
        
    } 

    const submitHandler = (e) => {//Request form submission
        e.preventDefault();

        if(error.pName !== ''||error.pAddress!== ''||error.pAge!== ''||error.pSex!== ''||error.pPhone!== ''||error.pDoctor!== ''||error.pHospital!== ''||error.gName!== ''||error.gPhone!== ''||error.bloodReq!== ''||error.qtyReq!== '')
        {  
            alert("Fill the form properly");
        }
        else{
            //Make Request
            let req = {
                blood_grp:capitalize(value.bloodReq),
                qty:value.qtyReq,
                hospital:capitalizeWords(value.pHospital)
            }

            axios.post('http://localhost:5000/api/v1/requests',req, {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                        }
                    })
                    .then((res) => {
                        console.log('Requests Response');
            
                        let patient = {
                            name:capitalizeWords(value.pName),
                            address:capitalizeWords(value.pAddress),
                            phone:value.pPhone,
                            sex:value.pSex,
                            age:value.pAge,
                            req_id:res.data.id,
                            doctor:capitalizeWords(value.pDoctor),
                            hospital:capitalizeWords(value.pHospital)
                        }

                        return axios.post('http://localhost:5000/api/v1/patients',patient, {
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                            }
                        })                      
                    })
                    .then((pat) => {
                        console.log("Patient created");

                            
                            let guardian = {
                                name:capitalizeWords(value.gName),
                                phone:value.gPhone,
                                p_id:pat.data.id
                            }
        
                    
                           return axios.post('http://localhost:5000/api/v1/guardians',guardian, {
                            headers: {
                                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                            }
                        })
                    })
                    .then((guard) => {
                        console.log("Guardian Created");
                    })
                    .catch(err => alert("Fill the data properly"))
                    .finally(() => window.location.reload());
        }
    }
        
    

    const deleteRequest = (reqId) => {
        axios.delete(`http://localhost:5000/api/v1/requests/${reqId}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => console.log(response.data))
        window.location.reload();
    }

    if(sessionStorage.getItem("token"))
    {
        return (
            <div>
                <Button color="primary" style={{marginBottom:"2em"}} onClick={toggle}>Generate Request</Button>
    
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader>Create Request</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitHandler}>
                            <Row style={{justifyContent:"center"}}>
                                <h5>Patient Details</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pName">Patient Name</Label>
                                        <Input
                                        type="text"
                                        id="pName"
                                        valid={error.pName === ''}
                                        invalid={error.pName !== ''}
                                        onBlur={handleBlur}
                                        name="pName"
                                        value={value.pName}
                                        onChange={handleChange}                                       
                                        />
                                        <FormFeedback>{error.pName}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pAddress">Patient Address </Label>
                                        <Input
                                        type="text"
                                        id="pAddress"
                                        valid={error.pAddress === ''}
                                        invalid={error.pAddress !== ''}
                                        value={value.pAddress}
                                        name="pAddress"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pAddress}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pPhone">Patient Phone No</Label>
                                        <Input
                                        type="text"
                                        id="pPhone"
                                        valid={error.pPhone === ''}
                                        invalid={error.pPhone !== ''}
                                        value={value.pPhone}
                                        name="pPhone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        />
                                        <FormFeedback>{error.pPhone}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pSex">Patient Sex</Label>
                                        <Input 
                                        type="select"
                                        id="pSex"
                                        valid={error.pSex === ''}
                                        invalid={error.pSex !== ''}
                                        value={value.pSex}
                                        name="pSex"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        >
                                            <option value=""></option>
                                            <option value="M">M</option>
                                            <option value="F">F</option>
                                            <option value="O">Other</option>
                                        </Input>
                                        <FormFeedback>{error.pSex}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pAge">Patient Age</Label>
                                        <Input
                                        type="text"
                                        id="pAge"
                                        valid={error.pAge === ''}
                                        invalid={error.pAge !== ''}
                                        value={value.pAge}
                                        name="pAge"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pAge}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pDoctor">Consulting Doctor</Label>
                                        <Input
                                        type="text"
                                        id="pDoctor"
                                        valid={error.pDoctor === ''}
                                        invalid={error.pDoctor !== ''}
                                        value={value.pDoctor}
                                        name="pDoctor"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pDoctor}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pHospital">Hospital Admitted</Label>
                                        <Input
                                        type="text"
                                        id="pHospital"
                                        valid={error.pHospital===''}
                                        invalid={error.pHospital !== ''}
                                        value={value.pHospital}
                                        name="pHospital"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pHospital}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={{justifyContent:"center"}}>
                                <h5>Guardian Details</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="gName">Guardian Name</Label>
                                        <Input
                                        type="text"
                                        id="gName"
                                        valid={error.gName === ''}
                                        invalid={error.gName !== ''}
                                        value={value.gName}
                                        name="gName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.gName}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="gPhone">Guardian Phone No</Label>
                                        <Input
                                        type="text"
                                        id="gPhone"
                                        value={value.gPhone}
                                        name="gPhone"
                                        valid={error.gPhone === ''}
                                        invalid={error.gPhone !== ''}
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.gPhone}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={{justifyContent:"center"}}>
                                <h5>Blood Request</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="bloodReq">Blood Group Required</Label>
                                        <Input
                                        type="text"
                                        id="bloodReq"
                                        valid={error.bloodReq === ''}
                                        invalid={error.bloodReq !== ''}
                                        value={value.bloodReq}
                                        name="bloodReq"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.bloodReq}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="qtyReq">Quantity Required</Label>
                                        <Input
                                        type="text"
                                        id="qtyReq"
                                        valid={error.qtyReq === ''}
                                        invalid={error.qtyReq !== ''}
                                        value={value.qtyReq}
                                        name="qtyReq"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.qtyReq}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button type="submit" color="success" onClick={toggle}>Submit Request</Button>{' '}
                        </Form>
                    </ModalBody>
                </Modal>
            <Row>
            {(requestData !== undefined)?requestData.map((item) => {
                    return(
                        <Col  sm={4} md={3} style={{margin:"10px 0"}}>
                            <Card style={{margin:"0em 2em"}} className="grow" key={item.id} md={4}>
                            <Row style={{justifyContent:"end"}}>
                                <Col sm={1}>
                                  <Button onClick={() => deleteRequest(item.id)}>X</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                <CardBody>
                                    <h5>Hospital: {item.hospital}</h5>
                                    <h5>Blood Group: {item.blood_grp}</h5>
                                    <h6>Quantity: {item.qty}</h6>
                                    <h6>Created on: {item.createdAt.split(" ")[0]}</h6>
                                    <h6>Time: {item.createdAt.split(" ")[1]}</h6>
                                    <Link to={`/requests/${item.id}`}>
                                        <h5>Patient Details</h5>
                                    </Link>
                                    {sessionStorage.getItem("token")?<Button onClick={() => handleClick(item.id,item.blood_grp,item.qty,item.hospital)} color="success">Grant Request</Button>:<div></div>}
                                </CardBody>
                                </Col>
                            </Row>
                        </Card>
                        </Col>
                        
                    );
                }):<div></div>}
            </Row>
    
            </div>
        )
    }else{
        return (
            <div>
                <button className="bttn" onClick={toggle}>Request</button>
    
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader>Create Request</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={submitHandler}>
                            <Row style={{justifyContent:"center"}}>
                                <h5>Patient Details</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pName">Patient Name</Label>
                                        <Input
                                        type="text"
                                        id="pName"
                                        valid={error.pName === ''}
                                        invalid={error.pName !== ''}
                                        onBlur={handleBlur}
                                        name="pName"
                                        value={value.pName}
                                        onChange={handleChange}
                                        />
                                        <FormFeedback>{error.pName}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pAddress">Patient Address </Label>
                                        <Input
                                        type="text"
                                        id="pAddress"
                                        valid={error.pAddress === ''}
                                        invalid={error.pAddress !== ''}
                                        value={value.pAddress}
                                        name="pAddress"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pAddress}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pPhone">Patient Phone No</Label>
                                        <Input
                                        type="text"
                                        id="pPhone"
                                        valid={error.pPhone === ''}
                                        invalid={error.pPhone !== ''}
                                        value={value.pPhone}
                                        name="pPhone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pPhone}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pSex">Patient Sex</Label>
                                        <Input 
                                        type="select"
                                        id="pSex"
                                        valid={error.pSex === ''}
                                        invalid={error.pSex !== ''}
                                        value={value.pSex}
                                        name="pSex"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        >
                                            <option value=""></option>
                                            <option value="M">M</option>
                                            <option value="F">F</option>
                                            <option value="O">Other</option>
                                        </Input>
                                        <FormFeedback>{error.pSex}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pAge">Patient Age</Label>
                                        <Input
                                        type="text"
                                        id="pAge"
                                        valid={error.pAge === ''}
                                        invalid={error.pAge !== ''}
                                        value={value.pAge}
                                        name="pAge"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pAge}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pDoctor">Consulting Doctor</Label>
                                        <Input
                                        type="text"
                                        id="pDoctor"
                                        valid={error.pDoctor === ''}
                                        invalid={error.pDoctor !== ''}
                                        value={value.pDoctor}
                                        name="pDoctor"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pDoctor}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="pHospital">Hospital Admitted</Label>
                                        <Input
                                        type="text"
                                        id="pHospital"
                                        valid={error.pHospital===''}
                                        invalid={error.pHospital !== ''}
                                        value={value.pHospital}
                                        name="pHospital"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.pHospital}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={{justifyContent:"center"}}>
                                <h5>Guardian Details</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="gName">Guardian Name</Label>
                                        <Input
                                        type="text"
                                        id="gName"
                                        valid={error.gName === ''}
                                        invalid={error.gName !== ''}
                                        value={value.gName}
                                        name="gName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.gName}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="gPhone">Guardian Phone No</Label>
                                        <Input
                                        type="text"
                                        id="gPhone"
                                        value={value.gPhone}
                                        name="gPhone"
                                        valid={error.gPhone === ''}
                                        invalid={error.gPhone !== ''}
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.gPhone}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={{justifyContent:"center"}}>
                                <h5>Blood Request</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="bloodReq">Blood Group Required</Label>
                                        <Input
                                        type="text"
                                        id="bloodReq"
                                        valid={error.bloodReq === ''}
                                        invalid={error.bloodReq !== ''}
                                        value={value.bloodReq}
                                        name="bloodReq"
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                                        <FormFeedback>{error.bloodReq}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="qtyReq">Quantity Required (PINT)</Label>
                                        <Input
                                        type="text"
                                        id="qtyReq"
                                        valid={error.qtyReq === ''}
                                        invalid={error.qtyReq !== ''}
                                        value={value.qtyReq}
                                        name="qtyReq"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="1"
                                        />
                                        <FormFeedback>{error.qtyReq}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button type="submit" color="success" onClick={toggle}>Submit Request</Button>{' '}
                        </Form>
                    </ModalBody>
                </Modal>
            <Row>
            {(requestData !== undefined)?requestData.map((item) => {
                    return(
                        <Col sm={4} md={3}>
                            <Card className="grow" style={{margin:"0em 2em"}} key={item.id} md={4}>
                            <Row>
                                <Col>
                                <CardBody>
                                    <h5>Hospital: {item.hospital}</h5>
                                    <h5>Blood Group: {item.blood_grp}</h5>
                                    <h6>Quantity: {item.qty}</h6>
                                    <h6>Created on: {item.createdAt.split('T')[0]}</h6>
                                    {/* <h6>Time: {item.createdAt.split('.')[0].split('T')[1]}</h6> */}
                                </CardBody>
                                </Col>
                            </Row>
                        </Card>
                        </Col>
                        
                    );
                }):<div></div>}
            </Row>
    
            </div>
        )
    }
    
    
}

export default Requests;
