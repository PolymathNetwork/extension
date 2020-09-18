import { network, networkUrl, selectedAccount } from './selectors';

import store from '.';
import { NetworkName } from '../types';

function getNetwork (): NetworkName {
  return network(store.getState());
}

function getNetworkUrl (): string {
  return networkUrl(store.getState());
}

function getSelectedAccount (): string | undefined {
  return selectedAccount(store.getState());
}

export {
  getNetwork,
  getNetworkUrl,
  getSelectedAccount
};
