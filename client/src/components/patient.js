import React,{useState,useEffect} from 'react';
import {Card,Row,Col} from 'reactstrap';
import './components.css';

const Patient = ({item}) => {
    const [guardianData,setGuardianData] = useState();

    useEffect(() => {
      if(item !== undefined){
        fetch(`http://localhost:5000/api/v1/guardians/${item.id}`, {
          headers: {
              'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          }
      })
        .then(res => {
            if(res.ok)
              return res.json();
            
              throw res;
        })
        .then(data => setGuardianData(data))
        .catch(err => console.log("Guardian err: "+err));
      }

      },[]);

    if(sessionStorage.getItem("token") && item !== undefined)
    {
      return(
        <div className="patientContainer">
          <Card className="patientCard">
              <Row>
                <Row>
                  <Col>
                  <Row style={{justifyContent:"center",marginBottom:"1em"}}>
                    <Col>
                      <h2 className="patientTitles">Patient Details</h2>
                    </Col>
                  </Row>
                    <h3>Patient Name: {item.name}</h3>
                    <h3>Patient Address: {item.address}</h3>
                    <h3>Patient Phone: {item.phone}</h3>
                    <h3>Patient Sex: {item.sex}</h3>
                    <h3>Patient age: {item.age}</h3>
                    <h3>Hospital: {item.hospital}</h3>
                    <h3>Doctor: {item.doctor}</h3>    
                    <h3>Request Id: {item.req_id}</h3>
                    <Row style={{justifyContent:"center"}}>
                      <Col>
                        <h2 className="patientTitles">Guardian Details</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {
                          (guardianData !== undefined)?<div><h3>Name: {guardianData.name}</h3>
                          <h3>Phone: {guardianData.phone}</h3></div>:<div></div>}
                      </Col>
                      </Row>
                  </Col>
                </Row>
              </Row> 
          </Card>
        </div>
      );
    }
    else if(!sessionStorage.getItem("token"))
    {
      return(
        <div>
          <h1>Only Managers are allowed further access</h1>
        </div>
      );
    }
    else{
      return(
        <div>
          <h1>Unable to Fetch the data :-_(</h1>
        </div>
      );
    }
}

export default Patient;