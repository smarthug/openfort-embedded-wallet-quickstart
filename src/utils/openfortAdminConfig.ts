import Openfort from '@openfort/openfort-node';

const openfort = (() => {
  if (!import.meta.env.VITE_OPENFORT_SECRET_KEY) {
    throw new Error("Openfort secret key is not set");
  }
  return new Openfort(import.meta.env.VITE_OPENFORT_SECRET_KEY);
})();

export default openfort;
