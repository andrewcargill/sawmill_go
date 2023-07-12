import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const FilterSection = ({
  gradeFilter,
  minWidthFilter,
  maxWidthFilter,
  minDepthFilter,
  maxDepthFilter,
  logIdFilter,
  speciesFilter,
  handleGradeFilterChange,
  handleMinWidthFilterChange,
  handleMaxWidthFilterChange,
  handleMinDepthFilterChange,
  handleMaxDepthFilterChange,
  handleLogIdFilterChange,
  handleSpeciesFilterChange,
  handleClearFilters,
  handleSearchSubmit,
  handleGeneralFilterChange,
  generalFilter,
  handleLiveEdgeFilterChange,
  live_edgeFilter,
  handleSturcturalFilterChange,
  structuralFilter,
  handleFurnitureFilterChange,
  furnitureFilter,
}) => {
  return (
    <div className="filtersContainer">
      <h4>Filters</h4>

      <Form.Group as={Row} className="pb-4">
        <Form.Label column xs={6}>
          Grade
        </Form.Label>
        <Col xs={6}>
          <Form.Control
            type="text"
            placeholder="Enter Grade"
            value={gradeFilter}
            onChange={handleGradeFilterChange}
          />
        </Col>

        {/* Search width */}

        <Form.Label column xs={6}>
          Min Width
        </Form.Label>
        <Col xs={6}>
          <Form.Control
            type="number"
            placeholder="Enter Min Width"
            value={minWidthFilter}
            onChange={handleMinWidthFilterChange}
          />
        </Col>

        <Form.Label column xs={6}>
          Max Width
        </Form.Label>
        <Col xs={6}>
          <Form.Control
            type="number"
            placeholder="Enter Max Width"
            value={maxWidthFilter}
            onChange={handleMaxWidthFilterChange}
          />
        </Col>

        {/* Search depth */}
        <Form.Label column xs={6}>
          Min Depth
        </Form.Label>
        <Col xs={6}>
          <Form.Control
            type="number"
            placeholder="Enter Min Depth"
            value={minDepthFilter}
            onChange={handleMinDepthFilterChange}
          />
        </Col>

        <Form.Label column xs={6}>
          Max Depth
        </Form.Label>
        <Col xs={6}>
          <Form.Control
            type="number"
            placeholder="Enter Max Depth"
            value={maxDepthFilter}
            onChange={handleMaxDepthFilterChange}
          />
        </Col>
        <Form.Label column xs={6}>
          Log ID
        </Form.Label>
        <Col xs={6}>
          <Form.Control
            type="number"
            placeholder="Enter Log ID"
            value={logIdFilter}
            onChange={handleLogIdFilterChange}
          />
        </Col>
        {/* <Form.Label column xs={6}>
          Species
        </Form.Label>
        <Col xs={6}>
          <Form.Control
            type="text"
            placeholder="Select Species"
            value={speciesFilter}
            onChange={handleSpeciesFilterChange}
          />
        </Col> */}
        <Col xs={12}>
              <Form.Group controlId="species">
                <Form.Label>Species</Form.Label>
                <Form.Control
                  as="select"
                  value={speciesFilter}
                  onChange={handleSpeciesFilterChange}
                  className="form-control form-control-lg"
                  required
                >
                  <option value="">Select species</option>
                  <option value="Pine">Pine</option>
                  <option value="Spruce">Spruce</option>
                  <option value="Birch">Birch</option>
                </Form.Control>
              </Form.Group>
            </Col>
        <Col xs={6}>
          <Button
            variant={generalFilter ? "primary" : "secondary"}
            onClick={handleGeneralFilterChange}
          >
            {generalFilter ? "General" : "General"}
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            variant={live_edgeFilter ? "primary" : "secondary"}
            onClick={handleLiveEdgeFilterChange}
          >
            Live Edge
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            variant={furnitureFilter ? "primary" : "secondary"}
            onClick={handleFurnitureFilterChange}
          >
            Furniture
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            variant={structuralFilter ? "primary" : "secondary"}
            onClick={handleSturcturalFilterChange}
          >
            Structural
          </Button>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="pb-4">
        <Col xs={6}>
          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Col>
        <Col xs={6}>
          <Button onClick={handleSearchSubmit}>Search</Button>
        </Col>
      </Form.Group>
    </div>
  );
};

export default FilterSection;
