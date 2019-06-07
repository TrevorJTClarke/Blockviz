export const addCommas = (x) => {
  if (!x) return 0;
  const tmp = x.toString().split('.');
  tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return tmp.join('.');
};
