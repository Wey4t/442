import './Profile.css'
import {useState} from 'react'
import axios from 'axios'
import { React,useEffect } from 'react'
import {Container} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
function Profile(){
    const [user, setUser] = useState(undefined)
    const handlerGetUser = (event) => {
        
        axios.get(`https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442m/api/userinfo.php`, {withCredentials:true}).then(function(response) {
            setUser(response.data);
            console.log(user);
        });
    }
    useEffect(()=>{
        handlerGetUser()
        },
        []
    )
    if(user === undefined){
        return null;
    }
    
    return(
        <Container>
            <td className='information_font'>Username:{user.username}</td><tr/>
            <td className='information_font'>Email:{user.email}</td><tr/>
            <td className='information_font'>Phone Number:{user.phone_number}</td><tr/>
        </Container>
                 
    )
}

export default Profile