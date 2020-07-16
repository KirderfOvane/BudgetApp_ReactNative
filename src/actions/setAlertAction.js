import uuid from 'uuid';

export const setAlertAction = (object) => {
  const id = uuid.v4();
  const { msg, type } = object;
  createresponse = { msg, type, id };
  return createresponse;
};
export default { setAlertAction };
