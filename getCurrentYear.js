const getCurrentYear = () => {
  const current_date = new Date();
  const cmm = current_date.getYear();
  const currentYear = '20' + cmm.toString().slice(1);
  return currentYear;
};

export default getCurrentYear;
