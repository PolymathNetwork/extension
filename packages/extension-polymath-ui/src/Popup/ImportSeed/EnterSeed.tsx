import React, { ChangeEvent, FC, useState } from 'react';
import { Box, Button, Flex, Header, Heading, Icon, Text, TextArea } from '@polymath/extension-ui/ui';
import { SvgClipboardListOutline } from '@polymath/extension-ui/assets/images/icons';
import { validateSeed } from '../../messaging';

export interface Props {
  onContinue: () => void;
  setPhrase: (phrase:string) => void;
}

export const EnterSeed: FC<Props> = ({ onContinue, setPhrase }) => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [validSeed, setValidSeed] = useState(false);

  const checkSeed = async (seed: string) => {
    try {
      const account = await validateSeed(seed);

      console.log(account);

      return true;
    } catch (error) {
      return false;
    }
  };

  const onChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSeedPhrase(e.target.value);

    setValidSeed(await checkSeed(e.target.value));
  };

  const nextStep = () => {
    setPhrase(seedPhrase);

    onContinue();
  };

  return (
    <>
      <Header>
        <Box pt='m'>
          <Box
            backgroundColor='brandLightest'
            borderRadius='50%'
            height={48}
            px={14}
            py={9}
            width={48}
          >
            <Icon Asset={SvgClipboardListOutline}
              color='brandMain'
              height={20}
              width={20} />
          </Box>
          <Box pt='m'
            width={220}>
            <Heading color='white'
              variant='h5'>
              Restore your account with your recovery phrase
            </Heading>
          </Box>
        </Box>
      </Header>
      <Box pt='m'>
        <Text color='gray.1'
          variant='b2m'>
          12–word recovery phrase
        </Text>
      </Box>
      <Box>
        <TextArea height={272}
          invalid={!validSeed && seedPhrase.length > 0}
          onChange={onChange}
          placeholder='Enter your 12-word recovery phrase. Separate each word with a single space.' />
      </Box>
      <Flex flex={1}
        flexDirection='column'
        justifyContent='flex-end'
        mb='s'
        mx='xs'>
        <Button disabled={!validSeed}
          fluid
          onClick={nextStep}>
          Continue
        </Button>
      </Flex>
    </>
  );
};
