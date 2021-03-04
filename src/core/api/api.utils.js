export const parseResponse = (responsePromise) =>
  new Promise((resolve, reject) => {
    responsePromise
      .then((r) => r.json())
      .then((r) => resolve(r))
      .catch((e) => reject(e));
  });
