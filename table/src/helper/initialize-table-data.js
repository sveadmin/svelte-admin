import { getContext } from 'svelte'
import { externalData } from '../../../../store/external-data'
import { parsePagedResponse } from './parse-paged-response'

export async function initializeTableData(contextKey, tableName, asyncLoader) {
  const { data, pageDetails, pager } = getContext(contextKey)
  let response
  if (externalData.has(tableName)) {
    response = await parsePagedResponse(externalData.get(tableName, {}))
    data.set(response.data);
    pageDetails.setSize(response.size)
    pager.set(response.pager);
  } else {
    response = await asyncLoader()
  }
}