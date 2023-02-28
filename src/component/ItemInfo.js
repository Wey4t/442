import {Button,Col,Navbar,Container,Row} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ItemInfo.css"
import "./UserImage.css"
import SearchBar from './SearchBar';
import UserImage from './UserImage';
function ItemInfo(){
    return (
        
        <div>

    <Container fluid className="header " variant="light"  expand="lg">
        <Container  >
        <Row >
            <Col md={4}>
                <Container variant="dark" className='mt-4 mb-3'>
                    <Navbar.Brand href="#home"><img
                        alt=""
                        src="https://picsum.photos/100/100"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                        />
                    </Navbar.Brand> 
                </Container>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
                <Container className="d-flex mt-4 mb-3">
                    <SearchBar></SearchBar>  
                </Container>
            </Col>
            <Col >
            <Container className="d-flex mt-3 mb-3">
            <UserImage></UserImage> 
            </Container>
            </Col>
            
        </Row>
        </Container>
    </Container>
    <Container fluid className='main-wrapper'>
    </Container>
        </div>
    )
}
export default ItemInfo