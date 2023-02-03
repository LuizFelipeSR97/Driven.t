import styled from 'styled-components';
import { RenderHospitalityModalities } from './renderHospitalityModalities';
import { useTicketTypes } from '../../../hooks/api/useTicket';
import { usePostTicket } from '../../../hooks/api/useTicket';
import { Options } from './Option';
import { ChosenOptions } from './ChosenOption';

export function RenderTicketModalities({ ticketModality, setTicketModality, hospitalityModality, setHospitalityModality }) {
  const { saveTicket } = usePostTicket();
  const { ticketTypes } = useTicketTypes();

  function selectButton(option, alreadyClicked) {
    if (alreadyClicked === option) {
      setTicketModality({});
    } else {
      setTicketModality(option);
    }
    if (option.isRemote) {
      setHospitalityModality({});
    }
    return;
  };

  function clickButtonAction() {
    saveTicket({ ticketTypeId: ticketModality.id });
    window.location.reload();
  }

  return (ticketTypes ?
    <Content>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <Line>
        {ticketTypes.slice(0, 2).map((type, index) => (
          type === ticketModality ?
            <ChosenOptions selectButton={selectButton} type={type} key={index} price={type.price} name={type.name} ticketModality={ticketModality}/>
            :
            <Options selectButton={selectButton} type={type} key={index} price={type.price} name={type.name} ticketModality={ticketModality}/>
        )
        )}
      </Line>
      {ticketModality.isRemote === true ?
        <>
          <h2>Fechado! O total ficou em <strong>R$ {(ticketModality.price) / 100}</strong>. Agora é só confirmar:</h2>
          <Button onClick={clickButtonAction}>RESERVAR INGRESSO</Button>
        </> : ticketModality.isRemote === false ?
          <>
            <RenderHospitalityModalities ticketTypes={ticketTypes} ticketModality={ticketModality} setTicketModality={setTicketModality} hospitalityModality={hospitalityModality} setHospitalityModality={setHospitalityModality} />
          </> :
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
  width: 100%;
`;

const Button = styled.div`
  width: 162px;
  height: 37px;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;
