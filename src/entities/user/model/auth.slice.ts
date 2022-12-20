import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "~/app/store"

import { Authorization } from "./interface"

export type TAuthUserState = Authorization

export const initialState: Authorization = {
  token: undefined,
  expires: undefined,
  scope: [],
}

export const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<TAuthUserState>) => {
      return { ...state, ...action.payload }
    },
    clearAuth: () => {
      return initialState
    },
  },
})

export const userAuthSelector = (state: RootState) => state.auth
export const authToken = createSelector(userAuthSelector, auth => auth.token)
export const authTokenScope = createSelector(userAuthSelector, auth => auth.scope)
export const authTokenExpires = createSelector(userAuthSelector, auth => auth.expires)

export const { setAuth, clearAuth } = authUserSlice.actions

export default authUserSlice.reducer
