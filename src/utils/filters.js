import R from 'ramda';
export const filterUserPrivateFields = R.omit(['access_token']);