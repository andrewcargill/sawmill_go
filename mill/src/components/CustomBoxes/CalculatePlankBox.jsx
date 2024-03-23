import React from "react";


const CalculatePlankBox = ({width, height}) => {

    const calculateWidthPercentage = (width) => {
        const minWidth = 2;
        const maxWidth = 25;
        const minPercentage = 40;
        const maxPercentage = 250;
    
        if (width <= minWidth) return `${minPercentage}px`;
        if (width >= maxWidth) return `${maxPercentage}px`;
    
        const percentage =
          minPercentage +
          ((width - minWidth) / (maxWidth - minWidth)) *
            (maxPercentage - minPercentage);
        return `${percentage}px`;
      };
    
      const calculateHeight = (depth) => {
        const minDepth = 2;
        const maxDepth = 25;
        const minHeight = 40;
        const maxHeight = 250;
    
        if (depth <= minDepth) return `${minHeight}px`;
        if (depth >= maxDepth) return `${maxHeight}px`;
    
        const height =
          minHeight +
          ((depth - minDepth) / (maxDepth - minDepth)) * (maxHeight - minHeight);
        return `${height}px`;
      };

      useEffect(() => {
        const calculatedWidth = calculateWidthPercentage(width);
        const calculatedHeight = calculateHeight(height);
        onDimensionsCalculated(calculatedWidth, calculatedHeight);
      }, [width, height, onDimensionsCalculated]);
    
      // Render nothing or a placeholder, as this component's main job is calculation
      return null;
    };
    


export default CalculatePlankBox;