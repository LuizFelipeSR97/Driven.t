import api from './api';

export async function getActivitiesLocations(token) {
  const response = await api.get('/activities/locations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivities(token) {
  const response = await api.get('/activities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivitiesSubscriptions(token) {
  const response = await api.get('/activities/subscriptions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postActivitiesSubscriptions(body, token) {
  const response = await api.post('/activities/subscriptions', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
