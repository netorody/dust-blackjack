import {
  WalletDialogProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-material-ui';
import { useRef, forwardRef, useEffect } from 'react';
import { Button as NoiaButton } from '../button';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import constants from '../../utils/constants';

const { colors } = constants;
const { primaryBackground, secondaryBackground, objectBackground, accentColor } = colors;

const LoginButton = forwardRef((props: any, ref) => (
  <WalletMultiButton innerRef={ref} {...props} />
));

const Connect = () => {
  const loginRef: any = useRef(null);
  const wallet = useAnchorWallet();


  const handleClick = () => {
    loginRef?.current?.click();
  };

  return (
    <WalletDialogProvider>
      <WalletMultiButton
        style={{
          background: accentColor,
          color: primaryBackground,
          fontWeight: 'bold',
          borderRadius: '2px',
          paddingLeft: '2rem',
          fontFamily: 'Goldman',
          paddingRight: '2rem',
        }}
      />
    </WalletDialogProvider>
  );
};

export default Connect;
