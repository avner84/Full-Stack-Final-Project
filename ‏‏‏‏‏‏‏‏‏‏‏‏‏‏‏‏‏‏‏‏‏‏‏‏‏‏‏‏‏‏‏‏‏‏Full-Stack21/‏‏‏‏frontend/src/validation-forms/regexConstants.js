export const FIRST_NAME_REGEX = /^[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30}$/;
export const LAST_NAME_REGEX = /^[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30}(\s[\u0590-\u05FF\uFB1D-\uFB4F\w']{2,30})?$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,24}$/;