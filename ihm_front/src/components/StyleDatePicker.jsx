import DatePicker from 'react-datepicker'; 
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css'; 

const StyleDatePicker = styled(DatePicker)`
    background : white;
    border : 1px solid #ccc; 
    border-radius : 8px; 
    color : #333; 
    font-family : inherit; 
    font-size : 1rem; 
    padding : 0.6rem; 
    width : 100%; 

    &:focus {
        border-color : #4e4cb8; 
        box-shadow : 0 0 0 2px rgba(78, 76, 184, 0.3); 
        outline : none; 
    }

    .react-datepicker {
        background : #fff;
        border : 1px solid #ccc; 
        border-radius : 12px; 
        box-shadow : 0 8px 24px rgba(0, 0, 0, 0.1); 
        font-family : inherit; 
        overflow : hidden; 
    }

    .react-datepicker__header {
        background : #f5f5ff;
        border-bottom : none; 
        padding-top : 1rem; 
    }

    .react-datepicker__day {
       border-radius : 50%; 
       color : #333; 
       font-weight : 500; 
       height : 2.2rem; 
       line-height : 2.2rem; 
       width : 2.2rem; 
    }

    .react-datepicker__day--selected, 
    .react-datepicker_day--keyboard-selected {
        background-color : #4e4cb8; 
        color : white; 
    }

    .react-datepicker__day:hover {
        background-color : #e6e6ff; 
        color : #4e4c8b; 
    }

    .react-datepicker__today-button {
        background-color : #4e4cb8; 
        border-radius : 6px; 
        color : white; 
        font-weight : bold; 
        margin-top : 0.5rem; 
        padding : 0.5rem; 
    }
`; 