// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useContext, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { AccountContext, Link } from "../../components";
import AccountsTree from "./AccountsTree";
import AddAccount from "./AddAccount";
import { Text, Box, Header, TextEllipsis, Flex, Icon, Heading, Button, StatusBadge } from "../../ui";
import { showAccount } from "../../messaging";
import { AccountWithChildren } from "@polkadot/extension-base/background/types";
import {
  SvgCheckboxMarkedCircle,
  SvgAlertCircle,
  SvgViewDashboard,
  SvgDotsVertical,
  SvgPlus,
} from "@polymath/ui/assets/images/icons";
import { formatters } from "../../util";
import { IdentifiedAccount } from "@polymath/extension-core/types";
import { AccountsContainer } from "./AccountsContainer";
import { useHistory } from "react-router";

export default function Accounts(): React.ReactElement {
  const [currentAccountAddress, setCurrentAccountAddress] = useState('');
  const [currentAccount, setCurrentAccount] = useState<AccountWithChildren>();
  const { hierarchy, network, polymeshAccounts } = useContext(AccountContext);
  const history = useHistory();

  const select = (accounts: AccountWithChildren[], selectedAccount: string) => {
    setCurrentAccountAddress(selectedAccount);
    accounts.map((account) => {
      showAccount(account.address, account.address === selectedAccount).catch(console.error);
      if (account.children) {
        select(account.children, selectedAccount);
      }
    });
  };

  const selectAccount = (accountAddress: string) => {
    select(hierarchy, accountAddress);
  };

  const findSelected = useCallback((accounts: AccountWithChildren[]) => {
    return accounts.map((account) => {
      if (!account.isHidden) {
        return account;
      }

      if (account.children) {
        return findSelected(account.children);
      }
    })[0];
  });

  useEffect(() => {
    setCurrentAccount(findSelected(hierarchy));
  }, [currentAccountAddress, findSelected, hierarchy]);

  const renderStatus = (isVerified: boolean) => {
    const color = isVerified ? "success" : "alert";
    const statusText = isVerified ? "Verified" : "Not verified";
    const iconAsset = isVerified ? SvgCheckboxMarkedCircle : SvgAlertCircle;

    return (
      <Flex flexDirection="row">
        <Box mr="1">
          <Icon Asset={iconAsset} width={14} height={14} color={color} />
        </Box>
        <Box>
          <Text variant="b3m" color={color}>
            {statusText}
          </Text>
        </Box>
      </Flex>
    );
  };

  const groupAccounts = (key: string) => (array:IdentifiedAccount[]) =>
    array.reduce((groupedAccounts: IdentifiedAccount[], account: IdentifiedAccount) => {
      const value = account[key];
      groupedAccounts[value] = (groupedAccounts[value] || []).concat(account);
      return groupedAccounts;
    }, {});

  const groupedAccounts = groupAccounts('did')(polymeshAccounts);

  console.log(groupedAccounts);

  return (
    <>
      {hierarchy.length === 0 ? (
        <AddAccount />
      ) : (
        <>
          <Header>
            <Flex flexDirection="row" alignItems="center" justifyContent="space-between" mb="m">
              <StatusBadge variant="yellow">{network}</StatusBadge>
              <Flex flexDirection="row" justifyContent="center">
                <Icon color="gray.0" Asset={SvgViewDashboard} width={24} height={24} />
                <Icon color="gray.0" Asset={SvgDotsVertical} width={24} height={24} />
              </Flex>
            </Flex>
            <Box borderRadius="2" bg="brandLightest">
              {currentAccount && (
                <Flex flexDirection="row" mx="1" justifyContent="space-between">
                  <Flex flexDirection="row">
                    <Box mr="1">
                      <Text color="brandMain" variant="c2m">
                        Did Label
                      </Text>
                    </Box>
                    <Text color="gray.2" variant="c2">
                      <TextEllipsis size={12}>{currentAccount?.did || 'hrjekwohrjkhjkethjkewthejlk'}</TextEllipsis>
                    </Text>
                  </Flex>
                  {renderStatus(false)}
                </Flex>
              )}
            </Box>
            <Flex flexDirection="row" mt="s">
              <Text variant="b1m" color="gray.0">
                {currentAccount?.name}
              </Text>
            </Flex>
            <Flex flexDirection="row" mt="1" alignItems="flex-end">
              <Heading variant="h5" color="gray.0">
                {formatters.formatAmount(currentAccount?.balance, 2, true)}
              </Heading>
              <Box ml="s">
                <Text variant="b2" color="gray.0">
                  POLYX
                </Text>
              </Box>
            </Flex>
            <Box mt="m">
              <Box borderColor="gray.0" borderWidth={2} borderStyle="solid" borderRadius="3">
                <Flex alignItems="center" justifyContent="center" height={32}>
                  <Text variant="b2m" color="gray.0">
                    Manage your account
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Header>
          <AccountsArea>
            <Flex px="s" pt="m" justifyContent="space-between">
              <Text variant="c2" color="gray.1">
                ACCOUNTS
              </Text>
              <Link to="/account/create">
                <Flex justifyContent="center">
                  <Box mx="s">
                    <Icon Asset={SvgPlus} width={14} height={14} color="brandMain" />
                  </Box>
                  <Text color="brandMain" variant="b2">
                    Add a key
                  </Text>
                </Flex>
              </Link>
            </Flex>
            {
              Object.keys(groupedAccounts).sort((a) => (a === undefined ? 1 : -1)).map((did: string, index) => {
                return <AccountsContainer accounts={groupedAccounts[did]} headerText={did} key={index} />
              })
            }
          </AccountsArea>
        </>
      )}
    </>
  );
}

const AccountsArea = styled.div`
  height: 100%;
  overflow-y: scroll;
  margin-top: -25px;
  padding-top: 25px;
  padding-right: 0px;
  padding-left: 0px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
