import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { useActivitySubscription, saveActivitySubs } from '../../hooks/api/useActivity';
dayjs.extend(weekday);

export default function RenderCalendar({ chosenDate, activities, activityLocation }) {
  const { activitySubscription: activitySubscription, getActivitySubscription } = useActivitySubscription();
  const { saveActivitySubscription } = saveActivitySubs();
  const [ userSubs, setUserSubs ] = React.useState(activitySubscription);

  function  handleClick(activityId, remainingVacancies) {
    if(remainingVacancies > 0) {
      saveActivitySubscription({ activityId });
      setInterval(() => {
        const update = getActivitySubscription().data;
        setUserSubs(update);
      }, 200);
    }
    //Se o numero de vagas = 0 não acontece nada
    //Se o numero de vagas > 0:
    //    Se activitySubscription.isSubscribed=false:
    //        Dar upsert em activitySubscription e deixar o isSubscribed em true
    //        Diminuir activity.vacancies em 1
    //        Mudar a cor pra verde e mudar o icone
    //        Se todos esses forem feitos com sucesso, dar o commit e fallback(?)
    //    Se activitySubscription.isSubscribed=true:
    //        Dar update em activitySubscription e deixar o isSubscribed em false
    //        Aumentar activity.vacancies em 1
    //        Mudar a cor pra cinza e mudar o icone
    //        Se todos esses forem feitos com sucesso, dar o commit e fallback(?)
  };

  return ( (!activities || !chosenDate || !activityLocation) ? <></> :
    <Content>
      {activityLocation.map(location => 
        <Calendar>
          <Local>
            {location.name}
          </Local>
          <Trail>
            {activities.map(activity => (activity.activityLocationId!==location.id) ? <></> : 
              !activitySubscription ? <></> :
                (dayjs(activity.startTime).format('YYYY-MM-DD')!==dayjs(chosenDate).format('YYYY-MM-DD') || dayjs(activity.endTime).format('YYYY-MM-DD')!==dayjs(chosenDate).format('YYYY-MM-DD')) ? <></> :
                  <Activity duration={String(dayjs(activity.endTime).diff(dayjs(activity.startTime), 'minutes'))} onClick={() => handleClick(activity.id, activity.remainingVacancies, activity.startTime, activity.endTime)} status={activitySubscription.filter(subscription => subscription.activityId===activity.id && subscription.isSubscribed).length>0 ? 'subscribed' : activity.remainingVacancies>0 ? 'available' : 'noVacancies'}>
                    <Left>
                      <h1>{activity.name}</h1>
                      <h2>{dayjs(activity.startTime).add(3, 'hour').format('HH:mm')} - {dayjs(activity.endTime).add(3, 'hour').format('HH:mm')}</h2>
                    </Left>
                    <Bar />
                    <Right status={activitySubscription.filter(subscription => subscription.activityId===activity.id && subscription.isSubscribed).length>0 ? 'subscribed' : activity.remainingVacancies>0 ? 'available' : 'noVacancies'}>
                      <ion-icon name={activitySubscription.filter(subscription => subscription.activityId===activity.id && subscription.isSubscribed).length>0 ? 'checkmark-circle-outline' : activity.remainingVacancies>0 ? 'enter-outline' : 'close-circle-outline'}></ion-icon>
                      <h3>{activitySubscription.filter(subscription => subscription.activityId===activity.id && subscription.isSubscribed).length>0 ? 'Inscrito' : activity.remainingVacancies>0 ? activity.remainingVacancies+' vagas' : 'Esgotado'}</h3>
                    </Right>
                  </Activity>
            )}
          </Trail>
        </Calendar>)}
    </Content>);
};

//Fazer a logica de mudar o duration de acordo com a duração da atividade

const Content = styled.div`

  display: flex;
`;

const Calendar = styled.div`

  display: flex;
  flex-direction: column;
`;

const Trail = styled.div`

  width: 288px;
  height: 390px;
  border: 1px solid #D7D7D7;
  box-sizing: border-box;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden
`;

const Activity = styled.div`

  width: 265px;
  height: ${(props) => (Number(props.duration)*80/60+'px')};
  background-color: ${(props) => (props.status==='available' ? '#F1F1F1' : props.status==='subscribed' ? '#D0FFDB' : '#E1E1E1')};
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px 0;
`;

const Left = styled.div`

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding-top: 10px;
  padding-left: 15px;

  h1{
    font-size: 12px !important;
    font-weight: 700;
    color: #343434;
    margin-bottom: -10px;
  }

  h2{
    font-size: 12px;
    font-weight: 400;
    color: #343434;
  }
`;

const Bar = styled.div`

  width: 1px;
  height: 100%;
  background-color: #CFCFCF;
`;

const Right = styled.div`

  width: 66px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ion-icon {
    color: ${(props) => (props.status==='noVacancies' ? '#CC6666' : '#078632')};;
    height: 25px;
    width: 25px;
    margin-bottom: 5px;
    --ionicon-stroke-width: 40px;
  }

  h3{
    color: ${(props) => (props.status==='noVacancies' ? '#CC6666' : '#078632')};
    font-size: 9px;
  }
`;

const Local = styled.div`

  height: 45px;
  width: 288px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7B7B7B;
  font-size: 19px;
  border-left: 1px solid #FFFFFF;
  font-family: 'Roboto', sans-serif;
`;
