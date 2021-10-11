import React,{useState,useEffect} from 'react';
import {Row,Col,Input,Button,Label} from 'reactstrap';
import './components.css';

const ViewLogins = () => {

    const [logins,setLogins] = useState();
    const [filteredData,setFilteredData] = useState();
    const [date,setDate] = useState("");

    const handleClick = () => {
        if(date !== "")
        {
            setFilteredData(logins.filter(item => item.createdAt.split(" ")[0] === date));
        }
    }

    const fetchLogins = () => {

        fetch('http://localhost:5000/api/v1/logins/name', {
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
                setLogins(d[0]);
                setFilteredData(d[0]);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchLogins();
    }, []);

    const res = (filteredData !== undefined)?filteredData.map((item) => {
        return(
            <Row className="loginRow">
                <Col>
                    {item.username}
                </Col>
                <Col>
                    {item.createdAt}
                </Col>
            </Row>
        );
    }):<div></div>

    return (
        <div className="container">
            <Row>
                <Col>
                    <Label>Date</Label>
                    <Input onChange={(e) => setDate(e.target.value)} type="date"/>
                </Col>
                <Col style={{marginTop:"25px"}}>
                    <Button style={{marginRight:"5px"}} onClick={handleClick}>Search</Button>
                    <Button style={{border:"0px"}} onClick={() => setFilteredData(logins)}>View All</Button>
                </Col>
            </Row>
            <Row className="container" style={{marginTop:"1em"}}>
                <Col>
                    <h4>User Name</h4>
                </Col>
                <Col>
                    <h4>Time of Login</h4>
                </Col>
            </Row>
            {res}
        </div>
    );
}

export default ViewLogins;