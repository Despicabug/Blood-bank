import React,{ useState } from 'react';
import {Card,Input,Button,Modal,ModalBody,ModalHeader,Form,FormGroup,Row,Col,Label,FormFeedback} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './components.css';

const renderList = (blood,quantity,updated) => {
    return(
        <Col sm={6} md={3}>
            <Card className="grow" key={uuidv4()} style={{margin:"0.5em"}}>
                <h2 style={{color:"blue"}}>{blood+" : "+quantity}</h2>
                <h6>Updated: {updated.split('T')[0]}</h6>
                {/* <h6>Time: {updated.split('.')[0].split('T')[1]}</h6> */}
            </Card>
        </Col>
    );
}

const Inventory = ({inventoryData,className}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [cmodal,setCModal] = useState(false);
    const ctoggle = () => setCModal(!cmodal);

    const [value,setValue] = useState({
        blood_state:'',
        quantity_state:''
    })

    const [blur,setBlur] = useState({
        blood_state:false,
        quantity_state:false
    });

    const [error,setError] = useState({
        blood_state:'',
        quantity_state:''
    })


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
        else
            return '';
    }

    const validate = {
        blood_state:bloodValidate(value.blood_state),
        quantity_state:qtyValidate(value.quantity_state)
    }


    const handleBlur = ({target}) => {
        setBlur({
            ...blur,[target.name]:true
        });

       //Validate Input
       setError({
           ...error,[target.name]:validate[target.name]
       });

}

    const handleChange = (e) => {
        setValue({
            ...value,[e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
       e.preventDefault();

  
        if(error.blood_state !== ''||error.quantity_state !== ''){
            alert("Enter the details properly");
            console.log(error.blood_state+error.quantity_state);
       }else{
        let article = {
            qty:value.quantity_state
        };

        axios.put(`http://localhost:5000/api/v1/inventory/${value.blood_state}`,article, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(response => {
            alert("Updated Successfully");
            window.location.reload();
    })
    .catch(err => {
        alert('Unable to update');
        console.log('Inventory Err: '+ err);
    });
       }

       setValue({
           blood_state:'',
           quantity_state:''
       });
    }

    const capitalize = (string) => {
        return string.replace(/[a-z]+/g, function(a) { return a.toUpperCase(); });
    };

    const handleCSubmit = () => {

        let article = {
            blood_grp:capitalize(value.blood_state),
            qty:value.quantity_state
        }

        axios.post('http://localhost:5000/api/v1/inventory',article, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then((res) => console.log(res.data))
        .catch(err => alert(err));

        // setValue({
        //     blood_state:'',
        //     quantity_state:''
        // });
        window.location.reload();
    }

    if(sessionStorage.getItem("token"))
    {
        return(
            <div className="inventory-container">
                <Row>
                    {(inventoryData !== undefined)?inventoryData.map(({blood_grp,qty,updatedAt}) => renderList(blood_grp,qty,updatedAt)):<div> </div>}
                </Row>
                <Button color="success" style={{marginTop:"2em"}} onClick={ctoggle}>Create Stock</Button>
                <Button color="danger" style={{marginTop:"2em"}} onClick={toggle}>Update Stock</Button>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Update Stock</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="blood_state">Blood Group</Label>
                                        <Input
                                        type="text"
                                        name="blood_state"
                                        value={value.blood_state}
                                        onBlur={handleBlur}
                                        valid={error.blood_state === ''}
                                        invalid={error.blood_state !== ''}
                                        onChange={handleChange}
                                        id="blood_state"/>
                                        <FormFeedback>{error.blood_state}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="quantity_state">Qty(pint)</Label>
                                        <Input
                                        type="text"
                                        name="quantity_state"
                                        value={value.quantity_state}
                                        onBlur={handleBlur}
                                        valid={error.quantity_state === ''}
                                        invalid={error.quantity_state !== ''}
                                        onChange={handleChange}
                                        id="quantity_state"/>
                                        <FormFeedback>{error.quantity_state}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button type="submit" color="success">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={cmodal} toggle={ctoggle} >
                    <ModalHeader toggle={ctoggle}>Create Stock</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleCSubmit}>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="blood_state">Blood Group</Label>
                                        <Input
                                        type="text"
                                        name="blood_state"
                                        value={value.blood_state}
                                        onBlur={handleBlur}
                                        valid={error.blood_state === ''}
                                        invalid={error.blood_state !== ''}
                                        onChange={handleChange}
                                        id="blood_state"/>
                                        <FormFeedback>{error.blood_state}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="quantity_state">Qty(pint)</Label>
                                        <Input
                                        type="text"
                                        name="quantity_state"
                                        value={value.quantity_state}
                                        onBlur={handleBlur}
                                        valid={error.quantity_state === ''}
                                        invalid={error.quantity_state !== ''}
                                        onChange={handleChange}
                                        id="quantity_state"/>
                                        <FormFeedback>{error.quantity_state}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button type="submit" color="success">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
    else{
        return(
            <div>
                <h1>
                    Login to Continue
                </h1>
            </div>
        );
    }
}

export default Inventory;