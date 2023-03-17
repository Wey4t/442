import {Form,Col,Container,Row} from 'react-bootstrap/';
import "./EditWindow.css"
import UserImage from './UserImage';
import {useEffect, useState } from 'react';
import axios from "axios";
function EditWindow(props){
    const [post, setPost] = useState({});
    // const [username, setUsername] = useState("");

    useEffect(() => {
        getUser();
    }, [])
    function getUser() {
        axios.post(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442m/api/update/user/`, post).then(function(response){
            console.log(response.data);
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442m/api/update/user/${props.id}`, post);
        props.onChange(false)
    }
    const handleChange = (event) => {
        
        // if(event.target.name === "username"){
        //     setUsername(event.target.value)
        // }
        setPost(vals => ({ ...vals, [event.target.name]: event.target.value }));
        console.log(post);
    }
    return (

        <div  className='window'>
            <Row>
            <Col className="edit_header_upper" >
                <UserImage >
                </UserImage>

            </Col>
            </Row>
            <Row>
                <Container fluid className="edit_header_lower d-flex justify-content-center">
                        <Form className='from_layout mt-3 mb-3' onSubmit={handleSubmit} >
                            <Row>
                            <Form.Group className="d-flex mt-5" controlId="formUserName">
                                        <Form.Label className='edit_txt'> User Name </Form.Label> 
                                        <Form.Control className='edit_input' type="txt" placeholder="Enter username" name='username' onChange={handleChange}/>
                                </Form.Group>
                            </Row>
                                
                            <Row>
                            <Form.Group  className='d-flex mt-3'controlId="formEmail">
                                    <Form.Label className='edit_txt'> Email  </Form.Label>
                                    <Form.Control className='edit_input' type="email" placeholder="Enter Email" name='email'  onChange={handleChange}/>
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group className="d-flex mt-3 mb-5" controlId="formPhoneNumer">
                                    <Form.Label className='edit_txt'> Phone Number </Form.Label>
                                    <Form.Control className='edit_input' type="txt" placeholder="Enter Phone Number" name='phoneNumber'  onChange={handleChange}/>
                            </Form.Group>
                            </Row>
                            <div className="d-flex justify-content-around">
                            <button className='mt-5 mb-5 cancel_bot'>
                            Close
                            </button>
                            <button className='mt-5 mb-5 save_bot'  type="submit">
                            Save
                            </button>
                            </div>
                        </Form>
                </Container>
                
            </Row>
        </div>
    )
}
export default EditWindow