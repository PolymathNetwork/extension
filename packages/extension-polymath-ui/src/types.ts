// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Theme } from './components/themes';
import { IdentifiedAccount } from '@polymath/extension/types';

export { Theme };

export interface ThemeProps {
  theme: Theme;
}

export type PolymeshContext = {
  selectedAccount?: string;
  polymeshAccounts?: IdentifiedAccount[];
  network?: string;
}
