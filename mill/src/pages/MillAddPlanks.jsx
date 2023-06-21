import React, {useState} from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import css from '../styles/millAddPlank.module.css'
import axios from 'axios';



const MillAddPlanks = () => {
    const [log, setLog] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [wood_grade, setWood_grade] = useState('');
  const [success, setSuccess] = useState(false); // State variable for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/', {
        log,
        width,
        depth,
        wood_grade,
      });
      console.log('Data created:', response.data);
      
      // Reset form fields after successful submission
      setLog('');
      setWidth('');
      setDepth('');
      setWood_grade('');

      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };
  return (
    
    <div className={css.container}>

        <form onSubmit={handleSubmit}>
        <Row>
        
            <Col xs={6}>
            <label>N/A:</label>
            <input type="date" className="form-control form-control-lg" id="input1" />
            </Col>
            <Col xs={6}>
            <label htmlFor="input1">Log ID:</label>
            <input type="number" className="form-control form-control-lg" placeholder="Enter value for Input 1" 
            value={log} onChange={(e) => setLog(e.target.value)} required />
            </Col>
        </Row>
        <Row>
            <Col xs={6}>
            <label>Width</label>
            <input type="number" className="form-control form-control-lg" placeholder="Enter value for Input 1" 
            value={width} onChange={(e) => setWidth(e.target.value)} required />
            </Col>
            <Col xs={6}>

            <label>Depth</label>
            <input type="number" className="form-control form-control-lg" placeholder="Enter value for Input 1" 
            value={depth} onChange={(e) => setDepth(e.target.value)} required />
            </Col>
        </Row>
        <Row>
            <Col xs={6}>
            <label>Grade</label>
            <input type="text" className="form-control form-control-lg" placeholder="Enter value for Input 1" 
            value={wood_grade} onChange={(e) => setWood_grade(e.target.value)} required/>
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
        <Row>
            <Col xs={12}>
            <Button id={css.button} variant='dark' type="submit">save</Button>
            </Col>
           
        </Row>
        </form>

        {success && <Alert key="success" variant='success'>Success! Data Stored.</Alert>} {/* Display success message if success is true */}
     

    </div>
  );
};

export default MillAddPlanks;
