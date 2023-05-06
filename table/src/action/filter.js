import { modal } from '../../../../store/modal';

export const getFilter = function ({
  callback,
  component,
  field,
  parameters,
}) {
  parameters.setFocus = true
  return {
    label: 'filter',
    activeMetaField: `${field}FilterIsActive`,
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