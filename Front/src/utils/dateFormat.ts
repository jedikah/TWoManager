/* eslint-disable @typescript-eslint/restrict-plus-operands */
export const dateToString = (myDate: Date =  new Date()) => {
  const dd = parseInt(String(myDate.getDate()).padStart(2, '0'));
  const mm = parseInt(String(myDate.getMonth() + 1).padStart(2, '0')); //January is 0!
  const yyyy = myDate.getFullYear();

  return yyyy + '-' + mm + '-' + dd;

  // return new Date(yyyy, mm, dd);
};
