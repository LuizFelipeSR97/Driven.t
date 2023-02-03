import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export function useActivityLocation() {
  const token = useToken();
  
  const {
    data: activityLocation,
    loading: activityLocationLoading,
    error: activityLocationError,
    act: getActivityLocation
  } = useAsync(() => activityApi.getActivitiesLocations(token));

  return {
    activityLocation,
    activityLocationLoading,
    activityLocationError,
    getActivityLocation
  };
};

export function useActivity() {
  const token = useToken();
  
  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: getActivity
  } = useAsync(() => activityApi.getActivities(token));

  return {
    activity,
    activityLoading,
    activityError,
    getActivity
  };
};

export function useActivitySubscription() {
  const token = useToken();
  
  const {
    data: activitySubscription,
    loading: activitySubscriptionLoading,
    error: activitySubscriptionError,
    act: getActivitySubscription
  } = useAsync(() => activityApi.getActivitiesSubscriptions(token));

  return {
    activitySubscription,
    activitySubscriptionLoading,
    activitySubscriptionError,
    getActivitySubscription
  };
};

export function saveActivitySubs() {
  const token = useToken();
  
  const {
    loading: saveActivitySubscriptionLoading,
    error: saveActivitySubscriptionError,
    act: saveActivitySubscription
  } = useAsync((data) => activityApi.postActivitiesSubscriptions(data, token));

  return {
    saveActivitySubscriptionLoading,
    saveActivitySubscriptionError,
    saveActivitySubscription  
  };
};
