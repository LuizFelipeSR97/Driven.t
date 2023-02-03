import styled from 'styled-components';
import { usePostTicket } from '../../../hooks/api/useTicket';
import { HospitalityChosenOptions } from './HospitalityChosenOption';
import { HospitalityOptions } from './HospitalityOption';

export function RenderHospitalityModalities({ ticketTypes, ticketModality, setTicketModality, hospitalityModality, setHospitalityModality }) {
  const { saveTicket } = usePostTicket();

  function selectButton(option) {
    setHospitalityModality(option);
    return;
  }

  function clickButtonAction() {
    saveTicket({ ticketTypeId: hospitalityModality.id });
    window.location.reload();
  }

  return (ticketTypes ?
    <Content>
      <h2>Ótimo! Agora escolha sua modalidade de hospedagem</h2>
      <Line>
        {ticketTypes.slice(1).map((type, index) => (
          type === hospitalityModality ?
            <HospitalityChosenOptions key={index} selectButton={selectButton} type={type} ticketModality={ticketModality} />
            :
            <HospitalityOptions key={index} selectButton={selectButton} type={type} ticketModality={ticketModality} />
        )
        )}
      </Line>
      {hospitalityModality.isRemote === false ?
        <>
          <h2>Fechado! O total ficou em <strong>R$ {(hospitalityModality.price) / 100}</strong>. Agora é só confirmar:</h2>
          <Button onClick={clickButtonAction}>RESERVAR INGRESSO</Button>
        </>
        :
        <></>}
    </Content>
    : <></>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 35px;
    font-size: 35px;
  }

  h2 {
    margin-bottom: 15px;
    color: #8E8E8E;
    font-size: 20px;
  }
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.div`
  width: 162px;
  height: 37px;
  background-color: #E0E0E0;
  color: #000000;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;
