import { modal } from '../../../../store/modal';

export const getNewAction = function ({
  callback,
  component,
  parameters,
  }) {
  return {
    label: 'New',
    callback: async () => {
      modal.set({
        component,
        parameters,
        listeners: {
          submit: callback
        }
      })
    }
  }
}