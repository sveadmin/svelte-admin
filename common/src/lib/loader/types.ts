export interface LoaderData {
   grace?: number;
   keys: {[key: string]: boolean};
   state: boolean;
}

export interface LoaderStore {
  state: boolean;
  registerTask: () => string;
  unregisterTask: (key: string) => void;
}