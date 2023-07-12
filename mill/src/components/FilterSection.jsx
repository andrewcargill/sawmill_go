import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const FilterSection = ({
  gradeFilter,
  minWidthFilter,
  maxWidthFilter,
  minDepthFilter,
  maxDepthFilter,
  handleGradeFilterChange,
  handleMinWidthFilterChange,
  handleMaxWidthFilterChange,
  handleMinDepthFilterChange,
  handleMaxDepthFilterChange,
  handleClearFilters,
  handleSearchSubmit,
  handleGeneralFilterChange,
  generalFilter,
  handleLiveEdgeFilterChange,
  live_edgeFilter,
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
