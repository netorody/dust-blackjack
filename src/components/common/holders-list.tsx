import { Stack, Text } from '@chakra-ui/layout';
import { Metadata, MetadataProgram } from '@metaplex/js';
import * as anchor from '@project-serum/anchor';
import React, { useState } from 'react';
import { owners } from '../../utils/get-owners';
import { Button as NoiaButton } from '../button';

// const { MetadataProgram } = programs.metadata;
const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);
export const MAX_NAME_LENGTH = 32;
export const MAX_URI_LENGTH = 200;
export const MAX_SYMBOL_LENGTH = 10;
export const MAX_CREATOR_LEN = 32 + 1 + 1;

export const HoldersList = () => {
  const [holders, setHolders] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const getHolderList = async (hash: string, setProgress: any) => {
    setLoading(true);

    const metadataAccounts = await MetadataProgram.getProgramAccounts(
      connection,
      {
        filters: [
          {
            memcmp: {
              offset:
                1 +
                32 +
                32 +
                4 +
                MAX_NAME_LENGTH +
                4 +
                MAX_URI_LENGTH +
                4 +
                MAX_SYMBOL_LENGTH +
                2 +
                1 +
                4 +
                0 * MAX_CREATOR_LEN,
              bytes: hash,
            },
          },
        ],
      }
    );

    const allHolders = [];

    for (let index = 0; index < metadataAccounts.length; index++) {
      const account = metadataAccounts[index];
      const accountInfo: any = await connection.getParsedAccountInfo(
        account.pubkey
      );

      const metadata = new Metadata(hash.toString(), accountInfo.value);
      const allTokenHolders: any = await connection.getTokenLargestAccounts(
        new anchor.web3.PublicKey(metadata.data.mint)
      );
      const onlyHolders = allTokenHolders.value.filter(
        (tokenHolder: any) => tokenHolder.uiAmount
      );
      const largestTokenHolder = onlyHolders[0];
      const tokenHolderAddress = largestTokenHolder.address;
      const tokenHolderOwner: any = await connection.getParsedAccountInfo(
        tokenHolderAddress
      );
      setProgress(index);

      allHolders.push(tokenHolderOwner.value.data.parsed.info.owner);
    }

    setHolders(JSON.stringify(allHolders));
    setLoading(false);
  };

  return (
    <>
      <NoiaButton
        isLoading={loading}
        onClick={async () =>
          await getHolderList(
            process.env.NEXT_PUBLIC_CANDY_MACHINE_ID as string,
            setProgress
          )
        }
      >
        GET HOLDERS
      </NoiaButton>
      <Text>{progress}/1000</Text>
      <Text>{holders}</Text>
    </>
  );
};
