import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

const Home = () => {
  return (
    <div className='page'>
      <Row>
        <Col xs={12}>
      <h1>Hello, Welcome to the Sawmill Go Frontend!</h1>
      <p>v1.3.3</p>
      </Col>
      <Col xs={12}>
   


    <Accordion defaultActiveKey="0" className='pb-4'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>What is Sawmill GO?</Accordion.Header>
        <Accordion.Body>
          <p>An online management tool for small sawmill owners. Our system enables you
          to manage your stock from tree to log; from log to blank and includes moisture checks
          to monitor the drying of your timber products. </p>
          <p>But there's more... Bookmatching at the click of a button, searching your trees, logs and planks 
            so that you can select the perfect timber for the project! 
          </p>
          <p>But there's even more... if you want to help educate others about the importance 
            of selective cut forestry then this system has another level to access.
          </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Selective Cut forestry?</Accordion.Header>
        
        <Accordion.Body>
        <p>If you do then then you can make use of the powerful additonal features in the system
          that create a truely personal, emotional and transpartent product for
          your customers.
        </p>
        <p>GPS locations and mapping of the tree in the forest, who removed the tree and why. 
          Information on the sawmill, the operator and his notes on the blanks. Then a detailed
          report on the mositure content from milling through to selling.  
        </p>
        <p>Each plank has a unique number - pass this onto your customer and they can 
          access the full story of the wood that they have purchased from you.
        </p>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Key Features</Accordion.Header>
        
        <Accordion.Body>
        DataBase Features
        <ul>
          <li>Cloud database</li>
          <li>Custom built system</li>
          <li>Easy to use data entry and retrival</li>
          <li>Detailed search (Trees, Logs and Planks)</li>
          <li>Moisture Control Tests</li>
          <li>Book-matching</li>
          <li>Add images of planks</li>
        </ul>
        Selective Cut Features
        <ul>
          <li>Pass on the story of your wood to the customer</li>
          <li>Promotes awarness of good forestry practices</li>
          <li>Creates a premium product</li>
        </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

      </Col>
      <Col>
      <h2>Who am I?</h2>
      <h5>I am a computer programmer and forest owner in
        North of Sweden.</h5>
      <p>
        I own a small forest of around 30 hectares with various sections
        and ages of forests. I came into this totally new five years ago when 
        I moved to a small village outside of Umeå, after living in Stockholm for 10 years.  
      </p>
      <p>
        I own a bandsaw mill and mill for my own projects. From learning about
        the forest industry and the price of wood and industry methods I really wanted to do 
        something to share the extra work, time and love that goes into selective forestry
        and the milling on wood on a small scale. 
      </p>
      <p>
        Selective cut forestry is the way most forest owners would want to management
        their forests, but it just isn't cost effect. So I wanted to find a way to 
        make a preimum product. 
      </p>
      </Col>
      </Row>
    </div>
  );
};

export default Home;
