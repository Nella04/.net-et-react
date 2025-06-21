import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import SecurityIcon from "@mui/icons-material/Security"
import DashboardIcon from "@mui/icons-material/Dashboard"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LogoutIcon from "@mui/icons-material/Logout"

// ---  S T Y L E S ---

const SidebarWrapper = styled.div `
    width: 250px;
  background-color: #6A0DAD;
  padding: 20px;
  box-sizing : border-box; 
  border-right : 2px solid #ddd; 
  height : 100vh;   
`; 

const Title = styled.h2 `
    color: #6A0DAD; 
    font-size : 25px; 
    margin-bottom : 25px;  
    margin-top : 60px; 
    border-radius : 4px; 
    background-color : #FFD700;
    height : 6vh; 
`; 

const NavList = styled.ul `
    list-style : none; 
    padding : 0; 
`; 

const NavItem = styled.li`
    margin-bottom : 16px;  
    align-items : center; 
    line-height : 2.5; 
    gap : 12px; 
    background-color : ${({$active}) => ($active ? '#FFD700' : 'transparent')}; 
    color : ${({$active}) => ($active ? '#4c1d95' : 'white')}; 
    cursor : pointer; 
    padding : 10px 15px; 
    border : 1px solid rgb(127, 106, 248); 
    border-radius : 8px; 
    transition : all 0.2s ease; 
    &:hover {
    background-color : #FFD700; 
    color : #4c1d95;  
    }
    svg {
        vertical-align : middle; 
    }
    span {
        display : inline-block; 
        line-height : 1; 
    }
`; 

const SidebarAcheteur = ({onNavigate, activePage}) => {
    return (
        <SidebarWrapper>
            <Title>Mon compte</Title>
            <NavList>

                <NavItem
                $active = {activePage === 'dashboard'}
                onClick={() => onNavigate('dashboard')} > 
                    <DashboardIcon/> 
                    Tableau
                </NavItem>

                <NavItem
                $active = {activePage === 'orders'}
                onClick={() => onNavigate('orders')} > 
                    <ReceiptLongIcon/> 
                    Historique
                </NavItem>

                <NavItem
                $active = {activePage === 'info'} 
                onClick={() => onNavigate('info')} > 
                    <AccountCircleIcon/>
                    Information
                </NavItem>

                <NavItem
                $active = {activePage === 'address'}
                onClick={() => onNavigate('address')} > 
                    <LocationOnIcon/> 
                    Adresse
                </NavItem>

                <NavItem
                $active = {activePage === 'paiement'}
                onClick={() => onNavigate('paiement')} > 
                    <CreditCardIcon/> 
                    Paiement
                </NavItem>

                <NavItem
                $active = {activePage === 'security'}
                onClick={() => onNavigate('security')} > 
                    <SecurityIcon/> 
                    Securité
                </NavItem>

                <NavItem
                $active = {activePage === 'logout'}
                onClick={() => onNavigate('logout')} > 
                    <LogoutIcon/> 
                    Deconnexion
                </NavItem>

            </NavList>
        </SidebarWrapper>
    ); 
}
export default SidebarAcheteur; 