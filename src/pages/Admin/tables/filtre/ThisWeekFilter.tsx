import React, { useState } from 'react';
import {Button } from 'antd';

interface ThisDayFilterProps {
  onFilterByThisWeek: () => void;
}
const ThisWeekFilter: React.FC<ThisDayFilterProps> = ({onFilterByThisWeek}) => {

  return (
    <>
      <Button type="primary" onClick={onFilterByThisWeek}>
        Cette Semaine
      </Button>  
    </>
  );
};

export default ThisWeekFilter;