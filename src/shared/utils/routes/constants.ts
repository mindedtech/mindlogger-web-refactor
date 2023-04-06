export const ROUTES = {
  // Public routes
  login: {
    path: "/login",
  },
  signup: {
    path: "/signup",
  },
  forgotPassword: {
    path: "/forgotpassword",
  },
  changePassword: {
    path: "/password-recovery",
  },
  invitation: {
    path: "/invitation/:inviteId",
  },
  publicJoin: {
    path: "/public/:joinLinkKey",
  },
  privateJoin: {
    path: "/join/:joinLinkKey",
  },

  // Protected routes
  profile: {
    path: "/protected/profile",
  },
  settings: {
    path: "/protected/settings",
  },
  applets: {
    path: "/protected/applets",
  },
  activityList: {
    path: "/protected/applets/:appletId",
    navigateTo: (appletId: string | number) => `/protected/applets/${appletId}`,
  },
  activityDetails: {
    path: "/protected/applets/:appletId/activity/:activityId/event/:eventId",
    navigateTo: (appletId: string, activityId: string, eventId: string) =>
      `/protected/applets/${appletId}/activity/${activityId}/event/${eventId}`,
  },
  invitationAccept: {
    path: "/protected/invite/accepted",
  },
  invitationDecline: {
    path: "/protected/invite/declined",
  },
  thanks: {
    path: "/protected/thanks/:appletId",
    navigateTo: (appletId: string) => `/protected/thanks/${appletId}`,
  },
}
