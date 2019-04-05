export class LayoutChangeEvent {
  eventType: LayoutChangeEventType;
  data: any;
}

export enum LayoutChangeEventType {
  FRAGMENT_INSTANCE_ADDED,
  FRAGMENT_INSTANCE_DELETED,
  FRAGMENT_INSTANCE_EDITED,
  FRAGMENT_INSTANCE_MOVED
}
