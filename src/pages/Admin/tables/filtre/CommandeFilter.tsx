import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';

const { RangePicker } = DatePicker;

interface CommandeFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

const CommandeFilter: React.FC<CommandeFilterProps> = ({ onFilter }) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const handleFilterClick = () => {
    if (selectedDates.length === 2) {
      onFilter(selectedDates[0], selectedDates[1]);
    }
  };

  const handleDateChange = (dates: any, dateStrings: string[]) => {
    setSelectedDates(dateStrings);
    
  };

  return (
    <>
      <RangePicker className='mb-3' onChange={handleDateChange} />
      <Button style={{marginLeft:10}} type="primary" onClick={handleFilterClick}>
        Filter
      </Button>
    </>
  );
};

export default CommandeFilter;