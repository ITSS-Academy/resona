import {QueueModel} from '../../models/queue.model';

export interface QueueState {
  queueList: QueueModel[],
  queue: QueueModel,
  isLoading: boolean,
  error: any,
}
