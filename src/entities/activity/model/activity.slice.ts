import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidV4 } from "uuid"

import { ActivityPipelineType } from "../lib"
import {
  ActivityEventState,
  ClearActivityItemsProgresByIdPayload,
  CompletedEntitiesState,
  GroupsProgressState,
  InProgressActivity,
  InProgressEntity,
  InProgressFlow,
  ProgressState,
  SaveActivityItemAnswerPayload,
  SetActivityEventProgressStep,
  SetUserEventByItemIdPayload,
  UpdateActionPayload,
  UpdateUserEventByIndexPayload,
  UpsertActionPayload,
} from "./types"

type InitialActivityState = {
  groupsInProgress: GroupsProgressState
  activityEventProgress: ActivityEventState

  completedEntities: CompletedEntitiesState
}

const initialState: InitialActivityState = {
  groupsInProgress: {},
  activityEventProgress: {},
  completedEntities: {},
}

const activitySlice = createSlice({
  name: "activityProgress",
  initialState,
  reducers: {
    clearActivity: () => {
      return initialState
    },

    clearActivityItemsProgressById: (state, action: PayloadAction<ClearActivityItemsProgresByIdPayload>) => {
      delete state.activityEventProgress[action.payload.activityEventId]
    },

    insertGroupProgressByParams: (state, action: PayloadAction<UpsertActionPayload>) => {
      const { appletId, activityId, eventId, progressPayload } = action.payload

      state.groupsInProgress[appletId] = state.groupsInProgress[appletId] ?? {}
      state.groupsInProgress[appletId][activityId] = state.groupsInProgress[appletId][activityId] ?? {}
      state.groupsInProgress[appletId][activityId][eventId] = progressPayload
    },
    updateGroupProgressByParams: (state, action: PayloadAction<UpdateActionPayload>) => {
      const { appletId, activityId, eventId, progressPayload } = action.payload

      state.groupsInProgress[appletId] = state.groupsInProgress[appletId] ?? {}
      state.groupsInProgress[appletId][activityId] = state.groupsInProgress[appletId][activityId] ?? {}
      const group = state.groupsInProgress[appletId][activityId][eventId]
      const updatedProgress = {
        ...group,
        ...progressPayload,
      }

      state.groupsInProgress[appletId][activityId][eventId] = updatedProgress
    },

    saveActivityEventRecords: (state, action: PayloadAction<ActivityEventState>) => {
      state.activityEventProgress = { ...state.activityEventProgress, ...action.payload }
    },

    saveActivityEventAnswerById: (state, action: PayloadAction<SaveActivityItemAnswerPayload>) => {
      const activityEventProgressRecord = state.activityEventProgress[action.payload.activityEventId]

      if (!activityEventProgressRecord) {
        return state
      }

      const itemIndex = activityEventProgressRecord.activityEvents.findIndex(item => item.id === action.payload.itemId)

      activityEventProgressRecord.activityEvents[itemIndex].answer = action.payload.answer
    },
    insertUserEventById: (state, action: PayloadAction<SetUserEventByItemIdPayload>) => {
      const activityEventProgressRecord = state.activityEventProgress[action.payload.activityEventId]

      if (!activityEventProgressRecord) {
        return state
      }

      activityEventProgressRecord.userEvents.push(action.payload.userEvent)
    },
    updateUserEventByIndex: (state, action: PayloadAction<UpdateUserEventByIndexPayload>) => {
      const activityEventProgressRecord = state.activityEventProgress[action.payload.activityEventId]

      if (!activityEventProgressRecord) {
        return state
      }

      if (!activityEventProgressRecord.userEvents[action.payload.userEventIndex]) {
        return state
      }

      activityEventProgressRecord.userEvents[action.payload.userEventIndex] = action.payload.userEvent
    },

    setActivityEventProgressStepByParams: (state, action: PayloadAction<SetActivityEventProgressStep>) => {
      const activityEventProgressRecord = state.activityEventProgress[action.payload.activityEventId]

      activityEventProgressRecord.step = action.payload.step
    },

    activityStarted: (state, action: PayloadAction<InProgressActivity>) => {
      const { appletId, activityId, eventId } = action.payload

      const activityEvent: ProgressState = {
        type: ActivityPipelineType.Regular,
        startAt: new Date().getTime(),
        endAt: null,
      }

      state.groupsInProgress[appletId] = state.groupsInProgress[appletId] ?? {}
      state.groupsInProgress[appletId][activityId] = state.groupsInProgress[appletId][activityId] ?? {}
      state.groupsInProgress[appletId][activityId][eventId] = activityEvent
    },
    flowStarted: (state, action: PayloadAction<InProgressFlow>) => {
      const { appletId, activityId, flowId, eventId, pipelineActivityOrder } = action.payload

      const flowEvent: ProgressState = {
        type: ActivityPipelineType.Flow,
        currentActivityId: activityId,
        startAt: new Date().getTime(),
        currentActivityStartAt: new Date().getTime(),
        endAt: null,
        executionGroupKey: uuidV4(),
        pipelineActivityOrder,
      }

      state.groupsInProgress[appletId] = state.groupsInProgress[appletId] ?? {}
      state.groupsInProgress[appletId][flowId] = state.groupsInProgress[appletId][flowId] ?? {}

      state.groupsInProgress[appletId][flowId][eventId] = flowEvent
    },

    entityCompleted: (state, action: PayloadAction<InProgressEntity>) => {
      const { appletId, entityId, eventId } = action.payload

      state.groupsInProgress[appletId][entityId][eventId].endAt = new Date().getTime()

      const completedEntities = state.completedEntities ?? {}

      completedEntities[entityId] = new Date().getTime()
    },
  },
})

export const actions = activitySlice.actions
export const reducer = activitySlice.reducer
