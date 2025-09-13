import {QueueModel} from '../../models/queue.model';
import {createReducer, on} from '@ngrx/store';
import * as QueueActions from './queue.actions';

export const initialQueueState = {
  queueList: <QueueModel[]>[],
  queue: <QueueModel>{},
  isLoading: false,
  error: null,
};

export const queueReducer = createReducer(
  initialQueueState,

  on(QueueActions.addTrackToQueue, (state, {type, userId, trackId}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(QueueActions.addTrackToQueueSuccess, (state, {type, queue}) => {
    console.log(type);
    // const updatedQueueList = [...(state.queueList || []), queue];
    return {
      ...state,
      // queueList: updatedQueueList,
      queue: queue,
      isLoading: false,
      error: null,
    };
  }),

  on(QueueActions.addTrackToQueueFailure, (state, {type, error}) => {
    console.error(type, error);
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(QueueActions.getQueueByUser, (state, {type, userId}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(QueueActions.getQueueByUserSuccess, (state, {type, queueList}) => {
    console.log(type);
    return {
      ...state,
      queueList: queueList,
      isLoading: false,
      error: null,
    };
  }),

  on(QueueActions.getQueueByUserFailure, (state, {type, error}) => {
    console.error(type, error);
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(QueueActions.restoreQueue, (state, {type, queueList}) => {
    console.log(type);
    return {
      ...state,
      queueList: queueList,
      isLoading: false,
      error: null,
    };
  }),

  on(QueueActions.removeTrackFromQueue, (state, {type, userId, trackId}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(QueueActions.removeTrackFromQueueSuccess, (state, {type, message}) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: null,
    };
  }),

  on(QueueActions.removeTrackFromQueueFailure, (state, {type, error}) => {
    console.error(type, error);
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),

  on(QueueActions.addPlaylistToQueue, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(QueueActions.addPlaylistToQueueSuccess, (state, {queueList}) => ({
    ...state,
    queueList: queueList,
    isLoading: false,
    error: null,
  })),

  on(QueueActions.addPlaylistToQueueFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(QueueActions.playSongNow, (state, {type, userId, trackId}) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),

  on(QueueActions.playSongNowSuccess, (state, {type, message}) => {
    console.log(type);
    return {
      ...state,
      isLoading: false,
      error: null,
    };
  }),

  on(QueueActions.playSongNowFailure, (state, {type, error}) => {
    console.error(type, error);
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(QueueActions.addCategoryToQueue, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(QueueActions.addCategoryToQueueSuccess, (state, {queueList}) => ({
    ...state,
    queueList: queueList,
    isLoading: false,
    error: null,
  })),

  on(QueueActions.addCategoryToQueueFailure, (state, {error}) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
);
