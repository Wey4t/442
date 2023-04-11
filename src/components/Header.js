import {Col,Navbar,Container} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import UserImage from './UserImage';
import brand_image from '../assets/images/exchange.png'
function Header(props) {
    return (
            <Navbar   className="header" variant="light"  expand="lg">
            <Container  fluid className="header">
                <Col md={2}>
                    <Container variant="dark" className='mt-4 mb-3'>
                        <Navbar.Brand href="/"><img
                            alt=""
                            src={brand_image}
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            />
                        </Navbar.Brand> 
                    </Container>
                </Col>
                <Col >
                    <Container fluid className="header d-flex flex-row-reverse mt-4 mb-3">
                        {!guest?<a href='/setting'>
                            <UserImage></UserImage> 
                        </a>  
                        <SearchBar setItemData={props.setItemData}></SearchBar>
                        </a> : <a href='/login'><h2>Welcome Guest</h2></a>}
                         
                        <SearchBar></SearchBar>
                    </Container>
                </Col>
                
                
            </Container>
            </Navbar>
    )
}
export default Header
