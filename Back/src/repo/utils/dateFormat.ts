const dateToString = () => {
  const today = new Date();
  const dd = parseInt(String(today.getDate()).padStart(2, '0'));
  const mm = parseInt(String(today.getMonth() + 1).padStart(2, '0')); //January is 0!
  const yyyy = today.getFullYear();

  // return yyyy + '-' + mm + '-' + dd;

  return new Date(yyyy, mm, dd);
};

export default dateToString;
