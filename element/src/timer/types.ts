export interface TimerProps {
  callback: {(event: Event) : Promise<void>};
  interval: number;
  start?: boolean;
}

export const COMPONENT_TIMER = 'timer'