import Openfort from '@openfort/openfort-js';


const openfort = new Openfort({
  baseConfiguration: {
    publishableKey: import.meta.env.VITE_PUBLIC_OPENFORT_PUBLIC_KEY!,
  },
  shieldConfiguration: {
    shieldPublishableKey: import.meta.env.VITE_PUBLIC_SHIELD_API_KEY!,
  },
  overrides: {
    iframeUrl: "https://embedded.openfort.xyz",
  }
});

export default openfort;
