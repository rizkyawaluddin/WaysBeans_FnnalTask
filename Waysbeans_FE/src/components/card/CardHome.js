import {Link} from 'react-router-dom';
import {Card, Container,Row, Col} from 'react-bootstrap';
import DataDummy from '../datadummy/Marcoffe';
import { useQueries, useQuery } from 'react-query';
import { API } from '../../config/api';
// import Rp from "rupiah-format"

export default function Book() {

    let { data: products} = useQuery("productsCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
    })
    console.log(products)
    return (
        <Container className="" >
            <Row>
                {products?.map((items, index) => 
                 <Col className='mt-4'>
                 <Link to={`/detail-product/${items.id}`} className='text-decoration-none'>
                     <Card style={{width: '15.063rem', border:'0', borderRadius:'10', backgroundColor:'#F6DADA'}}>
                         <Card.Img variant='top' src={items.image} className='rounded' style={{ height: '19.5rem' }} />
                         <Card.Body>
                             <p className='fw-bold text-danger' style={{ fontSize:'18px', margin:'0' }}>{items.name}</p>
                             <p style={{ color:'#974A4A', margin:'0' }}>Rp:{items.price}</p>
                             <p style={{ color:'#974A4A', margin:'0' }}>Stock:{items.stock}</p>
                         </Card.Body>
                     </Card>
                 </Link>
             </Col>
             )}
               
            </Row>
        </Container>
    );
  }