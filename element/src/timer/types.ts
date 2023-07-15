export interface TimerProps {
  callback: {async () : void};
  interval: number;
  start?: boolean;
}

export const COMPONENT_TIMER = 'timer'