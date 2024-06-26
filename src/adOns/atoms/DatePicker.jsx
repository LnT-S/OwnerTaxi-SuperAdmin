import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = (props) => {

    const { initialDate, show, setSelectedDate, setShowDatePicker, mode } = props
    const [date, setDate] = useState((initialDate !== '') ? initialDate : new Date());
    console.log('||||||||||||||||',show)

    const onChange = (event, selectedDate) => {
        setShowDatePicker(false)
        if (mode === 'date') {
            setSelectedDate(new Date(selectedDate).toDateString())
            setDate(new Date(selectedDate)).toDateString()
        } else {
            if (mode === 'time') {
                setSelectedDate(new Date(selectedDate))
                setDate(new Date(selectedDate))
            }
        }
        console.log('selected date', selectedDate , selectedDate.toLocaleTimeString())
    };

    return (
        <>
            {show ? <DateTimePicker
                value={mode==='date' ? new Date(date) : new Date()}
                mode={mode}
                display="default"
                onChange={onChange}

            /> : ''}
        </>
    );
};

export default React.memo(DatePicker);