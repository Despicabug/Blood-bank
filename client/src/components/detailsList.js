import React,{useState} from 'react';
import DetailsItem from './detailsItem';
import { Row,Col,Input,Button,Label } from 'reactstrap';
import './components.css'

const DetailsList = ({donorData}) => {

    const [state,setState] = useState({
        state:"",
        city:"",
        blood:"",
        filteredData:donorData,
        updated:false
    });


    const capitalizeWords = (string) => {
        return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    const handleClick = () => {

        if(state.state !== '')
        {
            console.log("State if");
            
            setState({
                ...state,filteredData:state.filteredData.filter(item => item.state === state.state.trim())
            })

            if(state.city !== '')
            {
                console.log("State -> city");
                setState({
                    ...state,filteredData:state.filteredData.filter(item => item.city === state.city.trim())
                })

                if(state.blood !== '')
                {
                    console.log("State -> city -> blood");

                    setState({
                        ...state,filteredData:state.filteredData.filter(item => item.blood === state.blood.trim())
                    })
                }
            }
            else if(state.blood !== '')
            {
                console.log("State -> blood");
                setState({
                    ...state,filteredData:state.filteredData.filter(item => item.blood === state.blood.trim())
                })
            }
        }else if(state.city !== '' && state.state === '' && state.blood === '')
        {
            console.log("city if");
            setState({
                ...state,filteredData:state.filteredData.filter(item => item.city === state.city.trim())
            })

            if(state.blood !== '')
            {
                setState({
                    ...state,filteredData:state.filteredData.filter(item => item.blood === state.blood.trim())
                })
            }
        }else if(state.blood !== '')
        {

            console.log("blood if");
            setState({
                ...state,filteredData:state.filteredData.filter(item => item.blood === state.blood.trim())
            });

            if(state.state !== '')
            {
                setState({
                    ...state,filteredData:state.filteredData.filter(item => item.state === state.state.trim())
                })

                if(state.city !== '')
                {
                    setState({
                        ...state,filteredData:state.filteredData.filter(item => item.city === state.city.trim())
                    })
                }
            }
            else if(state.city !== '')
            {
                setState({
                    ...state,filteredData:state.filteredData.filter(item => item.city === state.city.trim())
                })
            }
        }
    }

    const handleChange = (e) => {
        setState({
            ...state,[e.target.name]:capitalizeWords(e.target.value)
        });
    }

    return(
        <div className="donor-container">
            <Row>
                <Col>
                    <Label htmlFor="state">
                       State: <Input onChange={handleChange} name="state" type="text" id="state" />
                    </Label>
                </Col>
                <Col>
                    <Label htmlFor="city">
                       City: <Input onChange={handleChange} name="city" type="text" id="city" />
                    </Label>
                </Col>
                <Col>
                    <Label htmlFor="blood">
                       Blood group: <Input onChange={handleChange} name="blood" type="text" id="blood" />
                    </Label>
                </Col>
                <Col>
                    <Button onClick={() => window.location.reload()} id="filterButton">Clear</Button>

                    <Button onClick={handleClick} id="filterButton">Search</Button>
                </Col>
            </Row>
            <Row>
                {state.updated || (state.filteredData !== undefined)?state.filteredData.map((item) => <DetailsItem key={item.id} item={item}/>):<div></div>}
            </Row>
        </div>
    );
}

export default DetailsList;

