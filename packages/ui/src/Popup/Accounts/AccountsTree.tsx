// Copyright 2019-2020 @polkadot/extension authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from "react";
import { AccountWithChildren } from "@polkadot/extension-base/background/types";
import { AccountView } from "./AccountView";

interface Props extends AccountWithChildren {
  parentName?: string;
}

export default function AccountsTree({ parentName, suri, ...account }: Props): React.ReactElement<Props> {
  return (
    <>
      <AccountView {...account} parentName={parentName} suri={suri} />
      {account?.children?.map((child, index) => (
        <AccountsTree key={`${index}:${child.address}`} {...child} parentName={account.name} />
      ))}
    </>
  );
}