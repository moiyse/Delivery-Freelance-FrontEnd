import React, { useState } from 'react';
import {Button } from 'antd';
interface NexteekFilterProps {
  onFilterByThisMonth: () => void;
} 
const ThisMonthFilter: React.FC<NexteekFilterProps> = ({ onFilterByThisMonth }) => {
    return (
      <>
        <Button type="primary" onClick={onFilterByThisMonth}>
          Cette Mois
        </Button>
      </>
    );
  };
  export default ThisMonthFilter