import React from 'react';
import { Carousel } from 'react-bootstrap';
import carrousel1 from '../../assets/carrousel1.jpg';
import carrousel2 from '../../assets/carrousel2.jpg';
import carrousel3 from '../../assets/carrousel3.jpg';

function Home() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={carrousel1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carrousel2} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={carrousel3} alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
