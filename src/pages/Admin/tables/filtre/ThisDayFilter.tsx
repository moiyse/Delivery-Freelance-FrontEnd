import React, { useState } from 'react';
import {Button } from 'antd';

interface ThisDayFilterProps {
  onFilterByDay: () => void;
}
const ThisDayFilter: React.FC<ThisDayFilterProps> = ({onFilterByDay}) => {

  return (
    <>
      <Button type="primary" onClick={onFilterByDay}>
        This Day
      </Button>  
    </>
  );
};

export default ThisDayFilter;