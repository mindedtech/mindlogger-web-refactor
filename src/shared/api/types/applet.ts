import { HourMinute } from "../../utils"
import { BaseSuccessListResponse, BaseSuccessResponse } from "./base"

export type GetAppletDetailsByIdPayload = {
  appletId: string
}

export type GetPublicAppletDetailsByIdPayload = {
  publicAppletKey: string
}

export type GetPublicAppletActivityByIdPayload = {
  publicAppletKey: string
  activityId: string
}

export type AppletListSuccessResponse = BaseSuccessListResponse<AppletDetailsDto>
export type AppletSuccessResponse = BaseSuccessResponse<AppletDetailsDto>

export type ActivityRecordDto = {
  id: string
  name: string
  description: string
  image: string
  isReviewable: boolean
  isSkippable: boolean
  ordering: boolean
  splashScreen: string
}

export type ActivityFlowRecordDto = {
  id: string
  name: string
  image: string
  description: string
  hideBadge: boolean
  isSingleReport: boolean
  ordering: boolean
  items: Array<{ activityId: string }>
}

export type AppletDetailsDto = {
  id: string
  displayName: string
  version: string
  description: string
  about: string
  image: string
  watermark: string
  activities: ActivityRecordDto[]
  activityFlows: ActivityFlowRecordDto[]
}

export type EventAvailabilityDto = {
  availabilityType: number
  oneTimeCompletion: boolean
  periodicityType: number
  timeFrom: HourMinute | null
  timeTo: HourMinute | null
  allowAccessBeforeFromTime: boolean
  startDate?: string | null
  endDate?: string | null
  selectedDate?: string | null
}

export type ScheduleEventDto = {
  entityId: string
  availability: EventAvailabilityDto
}

type AppletDto = {
  id: string
  image?: string
  displayName: string
  description: string
  numberOverdue?: number

  theme?: {
    logo?: string
    smallLogo?: string
  } | null
}

export type AppletsResponse = {
  result: AppletDto[]
}

export type AppletDetailsResponse = {
  result: AppletDetailsDto
}
