export const ScheduleStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

export const ScheduleType = {
  DELIVERY: "DELIVERY",
  PICK_UP: "PICK_UP",
};

export const ScheduleDisplayType = {
  [ScheduleType.DELIVERY]: "delivery",
  [ScheduleType.PICK_UP]: "pickup",
};
