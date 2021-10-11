import React,{useState,useEffect} from 'react';
import {Row,Col,Button,Label,Input} from 'reactstrap';
import {Link } from 'react-router-dom';
import { Chart } from "react-google-charts";
import './components.css';

const renderHistory = (rid,blood,qty,name,date) => {
    return(
        <Row className = "grow" style={{margin:"1em",backgroundColor:"white"}}>
            <Col>
            <Link to={`/requests/${rid}`}>
                Req Id:{" "+rid}
            </Link>
            </Col>
            <Col>
                Requestee:{" "+name}
            </Col>
            <Col>
                Blood Group:{" "+blood}
            </Col>
            <Col>
                Amount: {" "+qty}
            </Col>
            <Col>
                Granted on:{" "+date.split('T')[0]}<br/>
                {/* At:{" "+date.split('.')[0].split('T')[1]} */}
            </Col>
        </Row>
    )
}


const History = ({historyData}) => {

    const [data,setData] = useState(["Blood Group","Qty"]);
    const [date,setDate] = useState("");
    const [filteredData,setFilteredData] = useState(historyData);


    const handleClick = () => {
        if(date !== "")
        {
            setFilteredData(historyData.filter(item => item.createdAt.split(" ")[0] === date));
        }
    }
    
    const fetchData  = async () => {
        fetch('http://localhost:5000/api/v1/history/graph', {
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
                        setData([[data].concat(d.map(item => [item.blood_grp,parseInt(item.qty)]))])
                    })
                    .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData(); 
    }, [fetchData]);
    
    if(sessionStorage.getItem("token"))
    {
        
        return(
            <div style={{padding:"20px"}}>
                <div style={{position:"relative"}}>
                <Chart
                    style={{backgroundColor:"transparent",margin:"auto"}}
                    width='80vw'
                    height='90vh'
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={data[0]}
                    options={{
                    title: 'Blood Group vs Qty',
                    chartArea: { width: '30%' },
                    hAxis: {
                        title: 'Blood Group',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Quantity',
                    },
                    }}
                    legendToggle
                />
                </div>
                    <div className="container" style={{height:"4em",width:"60vw",margin:"auto",marginTop:"2em",marginBottom:"2em"}}> 
                        <Row>
                           <Col>
                                <Label>Date</Label>
                                <Input onChange={(e) => setDate(e.target.value)} type="date"/>
                            </Col>
                            <Col style={{marginTop:"25px"}}>
                                <Button style={{marginRight:"5px"}} onClick={handleClick}>Search</Button>
                                <Button style={{border:"0px"}} onClick={()=>setFilteredData(historyData)}>View All</Button>
                            </Col>
                        </Row>
                </div>
                <div className={{marginTop:"2em"}}>
                 {(filteredData!== undefined)?filteredData.map(({req_id,blood_grp,qty,req_name,createdAt}) => renderHistory(req_id,blood_grp,qty,req_name,createdAt)):<div></div>}
                </div>
            </div>
        );
    }
    else{
        return(
            <div>
            <h1>Login to Continue</h1>
        </div>
        );
    }
}

export default History;