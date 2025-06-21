import DashboardAdresses from "./DashboardAddresses";
import DashboardCommandes from "./DashboardCommandes";
import DashboardPaiements from "./DashboardPaiements";
import DashboardSecurity from "./DashboardSecurite";
import styled from "styled-components";


const Title = styled.h2 `
    font-size : 24px; 
    margin-top : 120px; 
    color : #333;
    margin-left : 30%;   
`; 

const DashboardMonCompte = () => {
    return (
      <div style={{ backgroundColor : '#FFF8DC'}}>
        <Title>Bienvenue sur votre tableau de bord</Title>
        <div
            initial = {{ opacity : 0, y :50}}
            animate = {{ opacity : 1, y :0}}
            transition = {{ duration : 0.5, ease :"easeOut"}}
            style = {{ padding :"20px", 
                display : "grid", 
                gridTemplateColumns : "repeat(auto-fit, minmax(250px, 1fr))", 
                gap : "20px", 
                marginTop : "30px"
            }}
        >
            <DashboardAdresses/>
            <DashboardCommandes/>
            <DashboardPaiements/>
            <DashboardSecurity/>
        </div>
      </div>
    ); 
}
export default DashboardMonCompte; 