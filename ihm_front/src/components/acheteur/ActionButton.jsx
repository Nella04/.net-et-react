import styled from "styled-components";

const StyledButton = styled.button `
    font-size : 0.9rem; 
    color : white; 
    margin-top : 15px; 
    padding : 8px 16px; 
    background-color : #7c3aed; 
    border : none; 
    border-radius : 8px; 
    cursor : pointer; 

    &:hover {
         background-color : #5b21b6; 
    }
`; 

const ActionButton = ({label, onclick}) => {
    return (
        <StyledButton onClick={onclick} >
            {label}
        </StyledButton>
    )
}
export default ActionButton; 