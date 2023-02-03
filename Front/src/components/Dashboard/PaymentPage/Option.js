import styled from 'styled-components';

export function Options({ price, name, type, ticketModality, selectButton }) {
  return (
    <>
      <OptionsDiv onClick={() => selectButton(type, ticketModality)}>
        <h1>{name !== 'Online' ? 'Presencial' : name}</h1>
        <h2>R$ {price / 100}</h2>
      </OptionsDiv>
    </>
  );
};

const OptionsDiv = styled.div`
  height: 145px;
  width: 145px;
  margin-right: 25px;
  margin-bottom: 15px;
  border: 1px solid #CECECE;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  cursor: pointer;

  h1 {
    font-size: 16px !important;
    color: #454545 !important;
    margin-bottom: 5px !important;
  }

  h2 {
    font-size: 14px;
    color: #898989;
  }
`;
