export const API_URLS = {
  REGISTER: "http://localhost:8080/api/v1/auth/register",
  AUTHENTICATE: "http://localhost:8080/api/v1/auth/authenticate",
  OCCUPY_FIRST_AVILABLE: "http://localhost:8080/api/v1/parking-slots/occupy",
  OCCUPY_SLOT: "http://localhost:8080/api/v1/parking-slots",
  RELEASE: "http://localhost:8080/api/v1/parking-slots/release", //to cza dorobic
  ALL_AVILABLE_SLOTS: "http://localhost:8080/api/v1/parking-slots/free-slots",
  ALL_BUSY_SLOTS:"http://localhost:8080/api/v1/parking-slots/busy-slots",
  USER_INFO:"http://localhost:8080/api/v1/users",
  GET_USERS_LIST:"http://localhost:8080/api/v1/users/all",
  DEACTIVATE_USER:"http://localhost:8080/api/v1/users",
  GET_USER_SLOT:"http://localhost:8080/api/v1/parking-slots/user-slot",
  SLOT_STATE:"http://localhost:8080/api/v1/parking-slots/state"
};
