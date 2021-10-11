import React,{ useState,useEffect } from 'react';
import {Row,Col,Card,CardBody,CardTitle,CardText,CardImg} from 'reactstrap';
import './components.css';
import CountUp from 'react-countup';
import VisibilitySensor from "react-visibility-sensor";
import Requests from './requests';
import DonorForm from './donorForm';

const Landing = () => {

    const [donorCount,setDonorCount] = useState(0);
    const [historyCount,setHistoryCount] = useState(0);

    const fetchDonorCount = () => {

        fetch('http://localhost:5000/api/v1/donors/count', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then(response => {
                if (response.ok)
                    return response.json();

                throw response;
            })
            .then((d) => {
                setDonorCount(d[0].donorCount);
            })
            .catch(err => console.log(err))
    }

    const fetchHistoryCount = () => {

        fetch('http://localhost:5000/api/v1/history/count', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then(response => {
                if (response.ok)
                    return response.json();

                throw response;
            })
            .then((d) => {
                setHistoryCount(d[0].historyCount);
            })
            .catch(err => console.log(err))
    }




    const [visible,setVisible] = useState(false);

    const toggleVisibility = () => {
        if(window.pageYOffset >300)
            setVisible(true);
        else
            setVisible(false);
    }

    useEffect(() => {
        document.addEventListener("scroll",toggleVisibility);
        fetchDonorCount();
        fetchHistoryCount();
    }, []);

    const gotoTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    };

    return (
        <div>
            <div id="firstSegment" className="firstSegment container">
                <Row style={{display:"flex",alignItems:"center"}}>
                    <Col xs={12} md={4}>
                        <span><span style={{fontWeight:"bold"}}>Donate Blood</span> Save a Life</span>
                    </Col>
                    <Col>
                        <a href="http://localhost:3000/donors"><button className="bttn">Find Donor</button></a>
                    </Col>
                    <Col>
                        <Requests/>
                    </Col>
                </Row>
            </div> 
            <div id="secondSegment" className="secondSegment container">
                <Row>
                    <Col xs={12} md={4}>
                        <img className="img-fluid" width="200" height="200" style={{margin:"1em 0"}} src="https://media.istockphoto.com/vectors/donate-blood-concept-with-blood-bag-and-heart-blood-donation-vector-vector-id1033906526?k=6&m=1033906526&s=612x612&w=0&h=9lAnC-__u0NM2Ua2J1PSsHE4JjXKE7sYECfed8QeYMY=" alt="why donate"/>
                    </Col>
                    <Col>
                        <h1>Why Donate?</h1>
                        <p>Our nation requires 4 Crore Units of Blood while only 40 lakh units are available,
                            Every two seconds someone needs Blood
                            There is no substitute for Human Blood. It cannot be manufactured
                            
                            Blood donation is an extremely noble deed, yet there is a scarcity of regular donors across India.
                            We focus on creating &amp; expanding a virtual army of blood donating volunteers who could be searched and contacted by family / care givers of a patient in times of need    
                        </p>
                    <div>
                        <DonorForm/>
                    </div>
                    </Col>
                </Row>
            </div> 
            <div className="countSegment container">
                <Row style={{width:"50%"}}>
                    <Col xs={6} >
                        <Row>
                            <Col>
                            <h6>Donors Registered</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
                            {({ isVisible }) => (
                                <div className="countBttn">
                                    {isVisible ? <CountUp end={donorCount} duration={2} startOnMount={false}/> : null}
                                </div>
                                )}
                            </VisibilitySensor>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        <Row>
                            <Col>
                                <h6>
                                    Requests Approved
                                </h6>
                            </Col>
                        </Row>
                       <Row>
                            <Col>
                            <VisibilitySensor partialVisibility offset={{ bottom: 200 }}>
                            {({ isVisible }) => (
                                <div className="countBttn">
                                    {isVisible ? <CountUp end={historyCount} duration={2} startOnMount={false}/> : null}
                                </div>
                                )}
                            </VisibilitySensor>
                            </Col>
                       </Row>
                    </Col>
                </Row>
            </div>
            <div className="thirdSegment container">
                <div className="locationContainer">
                    <h1>Our Location</h1><br />
                    <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.521635323221!2d77.5854701148237!3d13.12946269075242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae170d10bb559b%3A0x2bb3892a626cf9ba!2sNitte%20Meenakshi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1627206532113!5m2!1sen!2sin" width="100%" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>  
            <div className="sponsor container">
                <h1 style={{color:"",marginBottom:"2.5em"}}>Our Sponsors</h1>
                <Row>
                    <Col sm={12} md={4}>
                        <Card className="card">
                            <CardImg top width="100%" height="200px" src="data:image/jpeg;base64,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" alt="sponsor1" />
                            <CardBody>
                                <CardTitle tag="h5">Sponsor 1</CardTitle>
                                <CardText>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam fuga culpa aut deleniti nisi eos veritatis incidunt facere illum vel odio eius dignissimos, cupiditate labore natus fugit ratione exercitationem quaerat?</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm={12} md={4}>
                        <Card className="card">
                            <CardImg top width="100%" height="200px" src="data:image/jpeg;base64,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" alt="sponsor2" />
                            <CardBody>
                                <CardTitle tag="h5">Sponsor 2</CardTitle>
                                <CardText>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus eveniet commodi voluptas excepturi suscipit voluptatem amet, aspernatur, corrupti ipsam, architecto pariatur eaque beatae provident corporis obcaecati aliquid mollitia iure ad?</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm={12} md={4}>
                        <Card className="card">
                            <CardImg top width="100%" height="200px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpsY2kMqxuzUpQv6-VATmZsOM2JrCUN4RhGw&usqp=CAU" alt="sponsor3" />
                            <CardBody>
                                <CardTitle tag="h5">Sponsor 3</CardTitle>
                                <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ad velit delectus ab fuga libero nisi itaque quia doloremque? Dolores reprehenderit necessitatibus magnam laboriosam et quasi nam quisquam, expedita quos.</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>   
            <div className="contact container">
                <div style={{height:"90%"}}>
                <Row>
                    <Col>
                        <img height="200" width="200" src="https://st.depositphotos.com/1008836/1993/i/950/depositphotos_19931429-stock-photo-glass-blood-drop-isolated.jpg" alt="logo" />
                    </Col>
                    <Col style={{textAlign:"left"}}>
                        <h2>Contact Us:</h2><br />
                        <h6><a href="mailto:vjamwal2000@gmail.com"><i class="far fa-envelope"></i> Email: vjamwal2000@gmail.com</a></h6>
                        <h6><a href="tel:9606777684"><i class="fas fa-phone-square-alt"></i> Phone: +91 9606777684</a></h6>
                        <h6><i class="fas fa-home"></i> Address: <div style={{textAlign:"center"}}>6429, NITTE Meenakshi College Rd, BSF Campus, Yelahanka, Bengaluru, Karnataka 560064s</div></h6>
                    </Col>
                    <Col style={{textAlign:"left"}} id="links">
                        <h2>Links</h2><br />
                        <a href="http://localhost:3000/donors"><h6>Find Donor</h6></a>
                        <a href="#secondSegment"><h6>Register Donor</h6></a>
                        <a href="#firstSegment"><h6>Generate Request</h6></a>                       
                    </Col>
                </Row>
                </div>
                <div >
                    <Row>
                    <Col>
                        <hr style={{borderColor:"gray"}} />
                        <h5><i class="far fa-copyright"></i> All rights reserved </h5>
                        <h6>A website by despicabug</h6>
                    </Col>
                    </Row>
                </div>
            </div> 
            {visible && <button onClick={gotoTop} className="top"><i class="fas fa-chevron-up"></i></button>}
        </div>    
    )
}

export default Landing;