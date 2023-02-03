import styled from 'styled-components';
import { useTicket } from '../../../hooks/api/useTicket';
import RenderFilter from '../../../components/Activities/renderFilter';

export default function Activities() {
  const { ticket } = useTicket();
  return (
    <Content>
      <h1>Escolha de atividades</h1>
      {!ticket ? 
        <Error>
          <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</h1>
        </Error> 
        : ticket.status==='RESERVED' ? 
          <Error>
            <h1>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</h1>
          </Error>
          : ticket.TicketType.isRemote ?
            <Error>
              <h1>
                Sua modalidade de ingresso não necessita escolher
            atividade. Você terá acesso a todas as atividades.
              </h1>
            </Error>
            : <RenderFilter />}
    </Content>
  );
}

const Content = styled.div`
  h1 {
    font-size: 35px;
  }
  h2 {
    margin-bottom: 15px;
    color: #8E8E8E;
    font-size: 20px;
  }
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 580px;
  h1 {
    color: #8E8E8E;
    font-size: 20px;
    width: 530px;
    text-align: center;
  }
`;
