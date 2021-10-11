import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import DonorForm from './components/donorForm';
import DetailsList from './components/detailsList';
import DonorDetail from './components/donorDetail';
import Requests from './components/requests';
import Patient from './components/patient';
import Inventory from './components/inventory';
import History from './components/history';
import { Switch, Redirect, Route, BrowserRouter } from 'react-router-dom';
import Landing from './components/landing';
import ViewLogins from './components/viewLogins';

const App = () => {

        const [token, setToken] = useState('');

        const [donorData, setDonorData] = useState();
        const [requestData, setRequestData] = useState();
        const [inventoryData, setInventoryData] = useState();
        const [patientData, setPatientData] = useState();
        const [historyData, setHistoryData] = useState();

        useEffect(() => {
            fetchDonors();
            fetchRequests();
            fetchPatients();
            fetchInventory();
            fetchHistory();
        }, [])


        const fetchDonors = () => {

            fetch('http://localhost:5000/api/v1/donors', {
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
                    setDonorData(d);
                })
                .catch(err => console.log(err))
        }


        const fetchRequests = () => {

            fetch('http://localhost:5000/api/v1/requests', {
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
                    setRequestData(d);
                })
                .catch(err => console.log(err))
        }

        const fetchInventory = () => {

            fetch('http://localhost:5000/api/v1/inventory', {
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
                    setInventoryData(d);
                })
                .catch(err => console.log(err))
        }

        const fetchPatients = () => {

            fetch('http://localhost:5000/api/v1/patients', {
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
                    setPatientData(d);
                })
                .catch(err => console.log(err))
        }


        const fetchHistory = () => {

            fetch('http://localhost:5000/api/v1/history', {
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
                    setHistoryData(d);
                })
                .catch(err => console.log(err))
        }





        const donorWithId = ({ match }) => {
            return (
                (donorData !== undefined) ? < DonorDetail item = { donorData.filter((item) => item.id === parseInt(match.params.id, 10))[0] }
                />:<div></div >
            );
        }

        const patient = ({ match }) => {
            return (
                (patientData !== undefined) ? < Patient item = { patientData.filter((item) => item.req_id === parseInt(match.params.id, 10))[0] }
                />:<div></div >
            );
        }

        if(sessionStorage.getItem("token"))
        {
            return (
                <div className = "App" >
                <BrowserRouter>
                <Header setToken = {setToken} token = { token }/> 
                <Switch >
                    <Route path = '/home' component = {() => <DonorForm/>}/>
                    <Route exact path = '/donors' component = {() => <DetailsList donorData = { donorData }/>}/>
                    <Route path = '/donors/:id' component = {donorWithId}/> 
                    <Route exact path = '/requests' component = {() => <Requests requestData = {requestData} inventoryData = {inventoryData}/>} / >
                    <Route path = '/requests/:id' component = {patient}/> 
                    <Route path = '/inventory' component = {() => <Inventory inventoryData = {inventoryData}/>}/>
                    <Route path = '/history' component = {() => <History historyData = {historyData}/>}/>
                    <Route path='/logins' component={() => <ViewLogins/>}></Route>
                    <Redirect to = '/home'/>
                </Switch>
                </BrowserRouter>
                </div>

           );
        }else{
            return (
                <div className = "App" >
                <BrowserRouter>
                <Header setToken = {setToken} token = { token }/> 
                <Switch >
                    <Route path = '/home' component = {() => <Landing/>}/>
                    <Route exact path = '/donors' component = {() => <DetailsList donorData = { donorData }/>}/>
                    <Route exact path = '/donors/register' component = {() => <DonorForm/>}/>
                    {/* <Route exact path = '/requests' component = {() => <Requests requestData = {requestData} inventoryData = {inventoryData}/>} / > */}
                    <Redirect to = '/home'/>
                </Switch>
                </BrowserRouter>
                </div>

           );
        }    
}

export default App;