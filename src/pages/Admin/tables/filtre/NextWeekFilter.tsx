import React, { useState } from 'react';
import {Button } from 'antd';
interface NexteekFilterProps {
  onFilterByNextWeek: () => void;
} 
const NextWeekFilter: React.FC<NexteekFilterProps> = ({ onFilterByNextWeek }) => {
    return (
      <>
        <Button type="primary" onClick={onFilterByNextWeek}>
          Next Week
        </Button>
      </>
    );
  };
  export default NextWeekFilter