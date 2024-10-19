import { Types } from './types';

export function login(data) {
  return {
    type: Types.login,
    payload: data,
  };
}
export function logOut() {
  return {
    type: Types.logOut,
  };
}
export function checkOutInformation(data) {
  return {
    type: Types.checkOut,
    payload: data,
  };
}
