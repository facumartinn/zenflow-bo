/* eslint-disable @typescript-eslint/explicit-function-return-type */

import axios from 'axios'
import type { HeaderTypes, ParamTypes } from '../types/orderTypes'

export const getFilteredOrders = async (params: ParamTypes, headers: HeaderTypes) => {
  return await axios.get('/api/orders/filtered', {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    params
  })
}
