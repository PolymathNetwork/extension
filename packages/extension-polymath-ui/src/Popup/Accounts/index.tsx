// Copyright 2019-2020 @polkadot/extension-ui authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { AccountContext, Link, PolymeshContext } from '../../components';
import AddAccount from './AddAccount';
import { Text, Box, Header, TextEllipsis, Flex, Icon, Heading, LabelWithCopy } from '../../ui';
import { SvgCheckboxMarkedCircle,
  SvgAlertCircle,
  SvgViewDashboard,
  SvgDotsVertical,
  SvgPlus } from '@polymath/extension-ui/assets/images/icons';
import { formatters } from '../../util';
import { IdentifiedAccount, NetworkName } from '@polymath/extension/types';
import { AccountsContainer } from './AccountsContainer';
import { hasKey } from '@polymath/extension-ui/styles/utils';
import { networkNames } from '@polymath/extension/constants';
import { setPolyNetwork } from '@polymath/extension-ui/messaging';

export default function Accounts (): React.ReactElement {
  const [currentAccount, setCurrentAccount] = useState<IdentifiedAccount>();
  const { hierarchy } = useContext(AccountContext);
  const { network, polymeshAccounts, selectedAccount } = useContext(PolymeshContext);

  useEffect(() => {
    polymeshAccounts && setCurrentAccount(polymeshAccounts.find((account) => (account.address === selectedAccount)));
  },
  [polymeshAccounts, selectedAccount]
  );

  const renderStatus = (isVerified: boolean) => {
    const color = isVerified ? 'success' : 'alert';
    const statusText = isVerified ? 'Verified' : 'Not verified';
    const iconAsset = isVerified ? SvgCheckboxMarkedCircle : SvgAlertCircle;

    return (
      <Flex flexDirection='row'>
        <Box mr='1'>
          <Icon Asset={iconAsset}
            color={color}
            height={14}
            width={14} />
        </Box>
        <Box>
          <Text color={color}
            variant='b3m'>
            {statusText}
          </Text>
        </Box>
      </Flex>
    );
  };

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as NetworkName;

    setPolyNetwork(value).then(() => {
      // @TODO Handle this properly. Perhaps by showing a Loader until this promise has resolved?
    }).catch(console.error);
  };

  const groupAccounts = () => (array:IdentifiedAccount[]) =>
    array.reduce((groupedAccounts: Record<string, IdentifiedAccount[]>, account: IdentifiedAccount) => {
      const value = account.did ? account.did : 'unassigned';

      groupedAccounts[value] = (groupedAccounts[value] || []).concat(account);

      return groupedAccounts;
    }, {});

  const groupedAccounts = polymeshAccounts ? groupAccounts()(polymeshAccounts) : {};

  const getHeaderColor = (index: number) => {
    const colors = ['#DCEFFE', '#F2E6FF', '#F1FEE1', '#FFEBF1', '#FFEAE1', '#E6F9FE', '#FAF5FF', '#E6FFFA', '#EBF4FF'];

    return colors[index % (colors.length - 1)];
  };

  const networkOptions = Object.keys(networkNames).map((_network) => {
    return <option key={_network}
      value={_network}>{networkNames[_network as NetworkName]}</option>;
  });

  return (
    <>
      {hierarchy.length === 0 ? (
        <AddAccount />
      ) : (
        <>
          <Header>
            <Flex alignItems='center'
              flexDirection='row'
              justifyContent='space-between'
              mb='m'>
              <select onChange={handleNetworkChange}
                value={network}>
                {networkOptions}
              </select>
              <Flex flexDirection='row'
                justifyContent='center'>
                <Icon Asset={SvgViewDashboard}
                  color='gray.0'
                  height={24}
                  width={24} />
                <Icon Asset={SvgDotsVertical}
                  color='gray.0'
                  height={24}
                  width={24} />
              </Flex>
            </Flex>
            {
              currentAccount?.did &&
              <Box bg='brandLightest'
                borderRadius='2'>
                {currentAccount && (
                  <Flex flexDirection='row'
                    justifyContent='space-between'
                    mx='1'>
                    <Flex flexDirection='row'>
                      {
                        currentAccount.didAlias &&
                        <Box mr='1'>
                          <Text color='brandMain'
                            variant='c2m'>
                            Did Label
                          </Text>
                        </Box>
                      }
                      <Text color='gray.2'
                        variant='c2'>
                        <TextEllipsis size={29}>{currentAccount?.did}</TextEllipsis>
                      </Text>
                    </Flex>
                    {renderStatus(currentAccount.cdd !== undefined)}
                  </Flex>
                )}
              </Box>
            }
            {
              !currentAccount?.did &&
                <Text color='brandLighter'
                  variant='b2m'>Unassigned key</Text>
            }
            <Flex flexDirection='row'
              mt='s'>
              <Text color='gray.0'
                variant='b1m'>
                {currentAccount?.name}
              </Text>
            </Flex>
            <Box>
              <LabelWithCopy color='gray.0'
                text={currentAccount?.address || ''}
                textSize={30}
                textVariant='b3'
              />
            </Box>
            <Flex alignItems='flex-end'
              flexDirection='row'
              mt='1'>
              <Heading color='gray.0'
                variant='h5'>
                {formatters.formatAmount(new BigNumber(currentAccount?.balance || 0), 2, true)}
              </Heading>
              <Box ml='s'>
                <Text color='gray.0'
                  variant='b2'>
                  POLYX
                </Text>
              </Box>
            </Flex>
            <Box mt='m'>
              <Box borderColor='gray.0'
                borderRadius='3'
                borderStyle='solid'
                borderWidth={2}>
                <Flex alignItems='center'
                  height={32}
                  justifyContent='center'>
                  <Text color='gray.0'
                    variant='b2m'>
                    View details
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Header>
          <AccountsArea>
            <Flex justifyContent='space-between'
              pt='m'
              px='s'>
              <Text color='gray.1'
                variant='c2'>
                ACCOUNTS
              </Text>
              <Link to='/account/create'>
                <Flex justifyContent='center'>
                  <Box mx='s'>
                    <Icon Asset={SvgPlus}
                      color='brandMain'
                      height={14}
                      width={14} />
                  </Box>
                  <Text color='brandMain'
                    variant='b2'>
                    Add a key
                  </Text>
                </Flex>
              </Link>
            </Flex>
            {
              Object.keys(groupedAccounts).sort((a) => (a === 'unassigned' ? 1 : -1)).map((did: string, index) => {
                return <AccountsContainer
                  accounts={hasKey(groupedAccounts, did) ? groupedAccounts[did] : []}
                  headerColor={getHeaderColor(index)}
                  headerText={did}
                  key={index}
                  selectedAccount={selectedAccount || ''}
                />;
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
