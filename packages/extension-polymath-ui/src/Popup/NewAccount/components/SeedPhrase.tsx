import React, { FC, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Box, Flex, Icon, Text } from '@polymath/extension-ui/ui';
import { SeedWord } from './SeedWord';
import { SvgContentCopy, SvgCheckboxMarkedCircle } from '@polymath/extension-ui/assets/images/icons';

export interface Props {
  seedPhrase?: string;
}

export const SeedPhrase: FC<Props> = ({ seedPhrase }) => {
  const [isCopied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
  };

  return (
    <Box>
      <Flex alignItems='flex-start'
        flexDirection='column'
        flexWrap='wrap'
        height={200}
        mt='s'>
        {seedPhrase?.split(' ').map((word, index) => (
          <SeedWord key={index}
            seedWord={word}
            wordOrder={index} />
        ))}
      </Flex>
      { !isCopied &&
        <CopyToClipboard onCopy={onCopy}
          text={seedPhrase || ''}>
          <Flex alignItems='center'
            justifyContent='center'
            mt='m'
            style={{ cursor: 'pointer' }}>
            <Box>
              <Flex>
                <Icon Asset={SvgContentCopy}
                  color='gray.3'
                  height={15}
                  width={15} />
                <Box ml='s'>
                  <Text color='gray.1'
                    variant='b2'>Copy your recovery phrase</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </CopyToClipboard>
      }
      {
        isCopied &&
          <Flex alignItems='center'
            justifyContent='center'
            mt='m'>
            <Box>
              <Flex>
                <Icon Asset={SvgCheckboxMarkedCircle}
                  color='success'
                  height={15}
                  width={15} />
                <Box ml='s'>
                  <Text color='success'
                    variant='b2'>Your recovery phrase copied</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
      }
    </Box>
  );
};
