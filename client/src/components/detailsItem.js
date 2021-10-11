import React from 'react';
import {Card,Col,Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import './components.css';

const DetailsItem = ({item}) => {

    const cap = (string) => {
        if(string !== undefined)
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
       
    if(sessionStorage.getItem("token"))
    {
        return(
            <Col style={{flex:"0 0 33.33%",margin:"10px 0px"}} >
                <Card className="grow" style={{border:"1px gray solid", padding:"2px" }}>
                    <Link to = {`/donors/${item.id}`} >
                        <Row>
                            <Col>
                                <h6>{cap(item.firstname)+" "+cap(item.lastname)}</h6>
                            </Col>
                            <Col>
                                <h4>{item.blood}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6><i class="fas fa-home"></i>{" "+cap(item.city)+", "+cap(item.state)}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5><i className="fas fa-phone"></i> {item.phone}</h5>
                            </Col>
                        </Row>
                    </Link>
                </Card>
            </Col>
        );
    }else{
        return(
            <Col  style={{flex:"0 0 33.33%",margin:"10px 0px"}} >
                <Card className="grow" style={{border:"1px gray solid", padding:"2px",color:"#0076d1" }}>
                        <Row>
                            <Col>
                                <h6>{cap(item.firstname)+" "+cap(item.lastname)}</h6>
                            </Col>
                            <Col>
                                <h4>{item.blood}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6><i class="fas fa-home"></i>{" "+cap(item.city)+", "+cap(item.state)}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5><i className="fas fa-phone"></i> {item.phone}</h5>
                            </Col>
                        </Row>
                </Card>
            </Col>
        );
    }
}

export default DetailsItem;