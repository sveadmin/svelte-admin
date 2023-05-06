import {
  SETTING_FIELD,
  SETTING_ID,
  SettingsData
} from "../types.js"

export const orderColumns = function (columns: SettingsData) : {[key: string] : number} {
  return columns.reduce(
    function (aggregator, column, columnIndex) {
      aggregator[column[SETTING_FIELD] ?? column[SETTING_ID]] = columnIndex;
      return aggregator
    },
    {}
  )
}