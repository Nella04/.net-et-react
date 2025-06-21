import styled from "styled-components";
import {FaLock, FaMapMarkedAlt} from "react-icons/fa"

const Card = styled.div `
    background : white; 
    border-radius : 12px; padding : 20px; 
    box-shadow : 0 4px 8px rgba(0, 0, 0, 0.1); 
    transition : transform 0.3s ease, box-shadow 0.3s ease; 
    text-align : center; 
    cursor : pointer; 

    &:hover {
        transform : translateY(-5px); 
        box-shadow : 0 8px 16px rgba(0, 0, 0, 0.2); 
    }
`; 

const IconWrapper = styled.div `
    font-size : 3rem; 
    color : #7c3aed; 
    margin-bottom : 10px; 
`; 

const Title = styled.h3 `
    font-size : 1.2rem;  
    margin-bottom : 10px; 
`; 

const Info = styled.p `
    font-size : 0.9rem; 
    color : #666;  
`; 

const ActionButton = styled.button `
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

const DashboardSecurity = () => {
    return (
        <Card>
            <IconWrapper>
                <FaLock/>
            </IconWrapper>
            <Title>
                Sécurité du compte
            </Title>
            <Info>
                Modifiez votre mot de passe
            </Info>
            <ActionButton>
                Modifier
            </ActionButton>
        </Card>
    ); 
}
export default DashboardSecurity; 