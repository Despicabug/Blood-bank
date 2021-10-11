import React,{useState} from 'react';
import {Card,Button,CardText,Modal,Row,Col,ModalBody,ModalHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import axios from 'axios';
import './components.css';

const DonorDetail = ({item,className}) => {


      const [modal, setModal] = useState(false);

      const [firstname,setFirstName] = useState(item.firstname);
      const [lastname,setLastName] = useState(item.lastname);
      const [adhaar,setAdhaar] = useState(item.adhaar);
      const [phone,setPhone] = useState(item.phone);
      const [blood,setBlood] = useState(item.blood);
      const [address,setAddress] = useState(item.address);
      const [city,setCity] = useState(item.city);
      const [state,setState] = useState(item.state);
      const [zip,setZip] = useState(item.zip);
      const [dob,setDob] = useState(item.dob.split('T')[0]);
      const [age,setAge] = useState(item.age);
      const [sex,setSex] = useState(item.sex);
      const [lastdonation,setLastdonation] = useState(item.lastdonation?item.lastdonation.split('T')[0]:null);
      const [complication,setComplication] = useState(item.complication?item.complication:"N.A.");

    
      const toggle = () => setModal(!modal);

const handleDelete = async() => {
    
    axios.delete(`http://localhost:5000/api/v1/donors/${item.id}`,{
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    .then(response => {
        const data = response.json();

        // check for error response
        if (!response.ok) {
            return data.message;
        }

        alert('Delete successful');
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}

const handleSubmit = async(e) => {
    e.preventDefault();
    const article = {
        firstname: firstname,
        lastname: lastname,
        adhaar: adhaar,
        phone: phone,
        blood: blood,
        address: address,
        city: city,
        state: state,
        zip: zip,
        dob: dob,
        age: age,
        sex: sex,
        lastdonation: lastdonation,
        complication: complication
    }

    axios.put(`http://localhost:5000/api/v1/donors/${item.id}`, article,{
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
    })
        .then(response => {
                alert("Updated Successfully");
        })
        .catch(error => {
            alert(error);
        });

    window.location.reload();
}

const cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    if(sessionStorage.getItem("token"))
    {
        return (  
            <div className="positionContainer">
            <div className="donorContainer">
                <Card className="donorCard">
                <CardText>Name: {cap(item.firstname)+" "+cap(item.lastname)}</CardText>
                <CardText>Blood Group: {item.blood}</CardText>
                <CardText>Phone no: {item.phone}</CardText>
                <CardText>Adhaar: {item.adhaar}</CardText>
                <CardText>Address: {cap(item.address)}</CardText>
                <CardText>City: {cap(item.city)}</CardText>
                <CardText>State: {cap(item.state)}</CardText>
                <CardText>Zip: {item.zip}</CardText>
                <CardText>D.O.B: {item.dob.split('T')[0]}</CardText>
                <CardText>Age: {item.age}</CardText>
                <CardText>Sex: {item.sex}</CardText>
                <CardText>Last Donation: {item.lastdonation == null?"N.A.":item.lastdonation.split('T')[0]}</CardText>
                <CardText>Complications: {item.complication == null?"N.A.":item.complication}</CardText>
                <span><Button className="donorBtn" onClick={toggle} color='primary'>Update</Button><Button className="donorBtn" onClick={handleDelete} color="danger">Delete</Button></span>
            
            
                <div>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Update the fields</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="firstname">First Name</Label>
                                            <Input 
                                            type="text" 
                                            id="firstname"
                                            name="firstname"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                             />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="lastname">Last Name</Label>
                                            <Input 
                                            type="text" 
                                            id="lastname"
                                            name="lastname"
                                            value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                             />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                    <FormGroup>
                                        <Label for='adhaar'>Adhaar</Label>
                                        <Input
                                        type='text' 
                                        id='adhaar'
                                        name='adhaar'
                                        value={adhaar}
                                        onChange={(e) => setAdhaar(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                    <FormGroup>
                                        <Label for='phone'>Phone</Label>
                                        <Input
                                        type='text' 
                                        id='phone'
                                        name='adhaar'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                    <FormGroup>
                                        <Label for='blood'>Blood Group</Label>
                                        <Input
                                        type='text' 
                                        id='blood'
                                        name='blood'
                                        value={blood}
                                        onChange={(e) => setBlood(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                    <FormGroup>
                                        <Label for='address'>Address</Label>
                                        <Input
                                        type='text' 
                                        id='address'
                                        name='address'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                    <FormGroup>
                                        <Label for='city'>city</Label>
                                        <Input
                                        type='text' 
                                        id='city'
                                        name='city'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                    <FormGroup>
                                        <Label for='state'>State</Label>
                                        <Input
                                        type='text' 
                                        id='state'
                                        name='state'
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                    <FormGroup>
                                        <Label for='zip'>Zip</Label>
                                        <Input
                                        type='text' 
                                        id='zip'
                                        name='zip'
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                    <FormGroup>
                                        <Label for='dob'>Dob</Label>
                                        <Input
                                        type='date' 
                                        id='dob'
                                        name='dob'
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                    <FormGroup>
                                        <Label for='age'>Age</Label>
                                        <Input
                                        type='text' 
                                        id='age'
                                        name='age'
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>

                                    <Col md={4}>
                                    <FormGroup>
                                        <Label for='sex'>Sex</Label>
                                        <Input 
                                        type='text' 
                                        id='sex'
                                        name='sex'
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                    <FormGroup>
                                        <Label for='lastdonation'>Last Donation</Label>
                                        <Input 
                                        type='date' 
                                        id='lastdonation'
                                        name='lastdonation'
                                        value={lastdonation}
                                        onChange={(e) => setLastdonation(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                    <FormGroup>
                                        <Label for='complication'>Complication</Label>
                                        <Input 
                                        type='textarea' 
                                        id='complication'
                                        name='complication'
                                        value={complication}
                                        onChange={(e) => setComplication(e.target.value)}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>
                                <Button type="submit" color="success">Update</Button>

                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            
            </Card>
            </div>
            </div>
);
    }
    else{
        return(
            <div>
                <h1>Only Managers may access full details ....</h1>
            </div>
        );
    }
}

export default DonorDetail;