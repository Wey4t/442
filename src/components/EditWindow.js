import {Form,Col,Container,Row} from 'react-bootstrap/';
import "./EditWindow.css"
import UserImage from './UserImage';
import {useEffect, useState } from 'react';
import axios from "axios";
import bg_change from '../assets/images/bg_ch_icon.svg.svg'
import toast, { Toaster } from "react-hot-toast";
function EditWindow(props){
    const [post, setPost] = useState({});
    const [change_image, setChange_image] = useState(false)
    // const [username, setUsername] = useState("");
    const [profile_image, setProfile_image] = useState()
    const cfg = {
        withCredentials:true,
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    const submit_profile_image = (e) =>{
        e.preventDefault()
        const fd = new FormData()
        if(profile_image === undefined){
            toast.error("please select image");
            return;
        }
        let type = profile_image.name.split('.').at(-1)
        let size = profile_image.size
        if(!image_file_check(type,size)){
            return
        }
        fd.append('profile_image',profile_image)
        console.log(fd)
        axios.post(process.env.REACT_APP_BASENAME+"api/profile_image.php",fd,cfg)
        .then(res=>{
            toast.success("success")
            setTimeout(function () {
                window.location.reload();
            }, 1800);
        }).catch(function(error){
            toast.error(error)
        })
    }
    function image_file_check(file_type,size){
        let acceptable = ['jpg','jpeg','png']
        if(!acceptable.includes(file_type)){
            toast.error("Wrong image type, try jpg or png")
            return false
        }
        if( size > 2000000){
            toast.error("Too large, try image smaller than 2mb")
            return false
        }
        return true
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(Object.keys(post))
        let has_empty = Object.keys(post).length !== 3
        Object.keys(post).map( x =>{
            console.log(post[x])
            has_empty |= ( post[x] === "") | post[x].includes(' ')  
            }
        )
        if(has_empty){
            // props.onChange(false)
            toast.error("Invaild Input!!")
            return
        }
        console.log(post)
        axios.post(process.env.REACT_APP_BASENAME+"api/update_profile.php", JSON.stringify(post),{withCredentials:true}).then(res=>{
            toast.success("sent")
            setTimeout(function () {
                window.location.reload();
            }, 1800);
        }).catch(function(error){
            toast.error(error)
        });
        // props.onChange(false)
    }
    const handleChange = (event) => {   
        setPost(vals => ({ ...vals, [event.target.name]: event.target.value }));
    }
    return (

        <Container  className='window'>
            <Toaster
                position="top-center"
                reverseOrder={false}
                />
            <Row>
            <Col  className="edit_header_upper" >
                <Row>
                    <Col>
                        <UserImage >
                        </UserImage>
                    </Col>
                    <Col>
                        <img className='bg_change_icon' src={bg_change} onClick={()=>{setChange_image(!change_image)}}/>
                        {change_image?
                            <form className='form-group' onSubmit={submit_profile_image}>
                                <label>
                                    <input type="file" name="bg_images" id="images" onChange={(e)=>{setProfile_image(e.target.files[0])}}/>
                                    <div className="file-dummy UsernameFont" ><span> select your profile image</span>
                                    
                                    </div>
                                    <button className="editpost_button"> Upload Post</button>
                                </label>           
                            </form>
                        :
                            null}
                    </Col>
                </Row>
                

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
                            <button className='mt-5 mb-5 save_bot'  type="submit">
                            Save
                            </button>
                            </div>
                        </Form>
                </Container>
                
            </Row>
        </Container>
    )
}
export default EditWindow