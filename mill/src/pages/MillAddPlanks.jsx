import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import css from '../styles/millAddPlank.module.css'
import axios from 'axios';



const MillAddPlanks = () => {
  const [log, setLog] = useState('');
  const [date, setDate] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [wood_grade, setWood_grade] = useState('');
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/', {
        log,
        width,
        depth,
        wood_grade,
        date,
      });
      console.log('Data created:', response.data);
      
      // Reset form fields after successful submission
      setLog('');
      setWidth('');
      setDepth('');
      setWood_grade('');
      setDate('');

      setPostId(response.data.id);
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  /// Navigation to Mill Home

  const navigate = useNavigate();
  
    const handleButtonClick = (route) => {
      navigate(route);
    };

  return (
    <div className={css.page}>
      <div>
        <h1>Sawmill Go - Add Plank</h1>
      </div>
    <div className={css.container}>

        

        <form onSubmit={handleSubmit}>
        <Row>
        
            <Col xs={6}>
            <label>Date:</label>
            <input 
            type="date" 
            className="form-control form-control-lg"
            value={date} 
            onChange={(e) => setDate(e.target.value)} required 
            />
            </Col>
            <Col xs={6}>
            <label htmlFor="input1">Log ID:</label>
            
            <input type="number" className="form-control form-control-lg" placeholder="Log ID number" 
            
            value={log} 
            
            onChange={(e) => setLog(e.target.value)} required 
            inputMode='numeric'
            />
            </Col>
        </Row>
        <Row>
            <Col xs={6}>
            <label>Width</label>
            <input type="number" className="form-control form-control-lg" placeholder="Width in cm" 
            value={width} onChange={(e) => setWidth(e.target.value)} required 
            inputMode='numeric'
            />
            </Col>
            <Col xs={6}>

            <label>Depth</label>
            <input type="number" className="form-control form-control-lg" placeholder="Depth in cm" 
            value={depth} onChange={(e) => setDepth(e.target.value)} required 
            inputMode='numeric'
            />
            </Col>
        </Row>
        <Row>
            <Col xs={6}>
            <label>Grade</label>
            <input type="text" className="form-control form-control-lg" placeholder="Grade number" 
            value={wood_grade} onChange={(e) => setWood_grade(e.target.value)} required
            inputMode='numeric'/>
            </Col>
            <Col xs={6}>
            <label htmlFor="input1">N/A</label>
            <input type="text" className="form-control form-control-lg" id="input1" placeholder="Enter value for Input 1" />
            </Col>
        </Row>
        <Row>
            <Col xs={12} >
            <label>N/A</label>
  <textarea className="form-control form-control-lg" id="largeTextInput" rows="6" placeholder='Enter additional information'></textarea>
            </Col>
           
        </Row>
        {success && <Alert key="success" variant='success'> 
        <p>Success! Data Stored.</p> 
        <div className={css.plankId}>
        Plank ID: {postId}
        </div> </Alert>}
        <Row>
            <Col xs={12}>
            <Button id={css.button} variant='dark' type="submit">save</Button>
            </Col>
           
        </Row>
        <Row>
            <Col xs={12}>
            <Button id={css.button} variant='primary'
            onClick={() => handleButtonClick('/mill_home')}
            >Mill Home</Button>
            </Col>
        </Row>
        </form>

       
     

    </div>
    </div>
  );
};

export default MillAddPlanks;