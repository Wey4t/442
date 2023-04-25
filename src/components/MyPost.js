import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate , Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import {Col,Container,Row} from 'react-bootstrap/';
export default function MyPost() {
    const [myItem ,setMyItem] = useState([]);
    const get_items_history = () => {
        axios.get(process.env.REACT_APP_BASENAME+`api/my_items.php`,{withCredentials: true}).then(function(response) {
            console.log(response.data);
            setMyItem(response.data)
        }).catch(function (error) {
            console.log(error.response.status) // 401
            console.log(error.response.data.error) //Please Authenticate or whatever returned from server
            if(error.response.status==401){
            }
        });
    }
    useEffect(
        ()=>{
            get_items_history()
        },
        []
    )
    function rows(order1){
        return(
            <tr>
                {/* {order1['item_name']} */}
                <th className='table_header' key={order1['item_id']}>
                    <div className='box'>
                        <span className='view_history_name'>{order1['item_name']}<br></br>
                            <Link to={'/iteminfo?var='+order1['item_id']}>
                                <img className='history_item_image' src={process.env.REACT_APP_BASENAME+"uploads/"+order1['item_image_dir']} ></img>
                            </Link>
                        </span> 
                        <span className='view_history_time'>{order1['date_posted']}</span>
                    </div>
                    <button style={{backgroundColor:'red'}} onClick={()=>deleteHandler(order1['item_id'])}>Delete</button>
                </th>
                
            </tr>
        )
    }
    function deleteHandler(e){
        console.log(e)
        axios.post(process.env.REACT_APP_BASENAME+`api/delete.php`,{
            item_id: e
          }).then(function(response){
            if(response.status === 200){
              window.alert('Post remove successful')
            }
            else{
              window.alert('Bad connection')
            }
          })
      }
  
  return (
    <Container>
            <Row xs="auto">
                <Col>
                </Col>
            </Row>
            <table className='view_history_table'>
                <tbody>
                    <tr>
                        <th className='view_history_title'> Items posted</th>
                    </tr>
                        {myItem.map(item=>rows(item))}
                </tbody>
            </table>
        </Container>
  )
}
