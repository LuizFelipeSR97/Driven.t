import styled from 'styled-components';

export function HospitalityOptions({ type, selectButton, ticketModality }) {
  const HospitalityWords = type.name.split(' ');
  return(
    <>
      <HospitalityOptionDiv onClick={() => selectButton(type)}>
        <h1>{HospitalityWords[2] + ' ' + HospitalityWords[3]}</h1>
        <h2>+ R$ {(type.price - ticketModality.price) / 100}</h2>
      </HospitalityOptionDiv>
    </>
  );
};

const HospitalityOptionDiv = styled.div`
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
