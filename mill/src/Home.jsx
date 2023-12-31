import React from "react";
import { Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import treetops from "./media/images/treetops.png";
import treeview from "./media/images/forest_mountain.png";
import css from "./styles/home.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/about');
  };

  return (
    <div className="page-home">
      <div className={css.Container}>
        <div className={css.headimage}>
          <img className={css.images} src={treetops} alt="My Image" />
        </div>
        <div className={css.textContainer}>
          <h1>MUI Styling to Sawmill Go!</h1>
          <p>
            <strong>
              Empower Your Artisanal Sawmill with Sawmill Go - The Ultimate
              Database Solution!
            </strong>
          </p>
          <p>
            Seamlessly manage your inventory operations with ease. From start to
            finish, experience smooth and hassle-free management, allowing
            artisans to effortlessly oversee their operations.
          </p>
          <div className={css.buttonContainer}>
            <button onClick={handleButtonClick}>Find out More</button>
          </div>
        </div>
        <div className={css.headimage}>
          <img className={css.images} src={treeview} alt="My Image" />
        </div>
        <div className={css.textContainerOrange}>
          <h1>100% transparent forestry</h1>
          <p>
            <strong>
              Introducing "Transparent Forestry" - Revolutionizing the Industry!
            </strong>
          </p>
          <p>
            Discover complete information about sourced trees, from felling date
            to responsible individuals and precise locations. Experience
            unparalleled transparency and traceability for a truly distinctive
            offering.
          </p>
          <div className={css.buttonContainer}>
            <button onClick={handleButtonClick}>Find Out More</button>
          </div>
        </div>
        <div className={css.headimage}>
          <img className={css.images} src={treetops} alt="My Image" />
        </div>
        <div className={css.textContainerGreen}>
          <h1>Unleashing Cloud Computing's Power</h1>
          <p>
            <strong>
              Effortlessly search your inventory with custom-built filters for
              seamless organization.
            </strong>
          </p>
          <p>
            Input tree details for precise calculations. Add GPS locations,
            images, notes, moisture checks, from any device.
          </p>
          <div className={css.buttonContainer}>
            <button>Find out More</button>
          </div>
        </div>
      </div>

      <Row>
        {/* <Col xs={12}>
          <Accordion defaultActiveKey="0" className="pb-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Sawmill GO</Accordion.Header>
              <Accordion.Body>
                <p>
                  An online management tool for small sawmill owners. Our system
                  enables you to manage your stock from tree to log; from log to
                  blank and includes moisture checks to monitor the drying of
                  your timber products.{" "}
                </p>
                <p>
                  But there's more... Bookmatching at the click of a button,
                  searching your trees, logs and planks so that you can select
                  the perfect timber for the project!
                </p>
                <p>
                  But there's even more... if you want to help educate others
                  about the importance of selective cut forestry then this
                  system has another level to access.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Selective Cut forestry</Accordion.Header>

              <Accordion.Body>
                <p>
                  If you do then then you can make use of the powerful additonal
                  features in the system that create a truely personal,
                  emotional and transpartent product for your customers.
                </p>
                <p>
                  GPS locations and mapping of the tree in the forest, who
                  removed the tree and why. Information on the sawmill, the
                  operator and his notes on the blanks. Then a detailed report
                  on the mositure content from milling through to selling.
                </p>
                <p>
                  Each plank has a unique number - pass this onto your customer
                  and they can access the full story of the wood that they have
                  purchased from you.
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
        </Col> */}
        {/* <Col>
          <h2>Transparent Forestry</h2>
          <h5>
            I am a computer programmer and forest owner in North of Sweden.
          </h5>
          <p>
            I own a small forest of around 30 hectares with various sections and
            ages of forests.
          </p>
          <p>
            I own a bandsaw mill and currently mill for my own projects. From
            learning about the forest industry and the price of wood and
            industry methods I really wanted to do something to share the extra
            work, time and love that goes into selective forestry.
          </p>
          <p>
            I am sure that Selective cut forestry is the way most forest owners
            would want to management their forests, but it just isn't cost
            effect. So I wanted to find a way to make a preimum product.
          </p>
          <p>
            It's like with food. You can get a cheap egg from the local store or
            you can get a freerange egg, where you know the animal is treated
            well... and the customer is prepared to pay more for that preimum
            product.
          </p>
        </Col> */}
      </Row>
    </div>
  );
};

export default Home;
