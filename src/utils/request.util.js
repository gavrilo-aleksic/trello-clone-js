export const createQueryParams = (obj) => {
  const queryParams = new URLSearchParams(obj);
  queryParams.forEach((value, key) => {
    if (value === 'undefined') {
      queryParams.delete(key);
    }
  });
  return queryParams.toString();
};
