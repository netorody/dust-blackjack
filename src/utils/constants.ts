const constants = {
  infos: {
    name: "Dust Blackjack",
    website: "",
    image: "",
    publicKey: "Bu5gKq6fDJUmhze2ke2n6x2SynJeinBUX6Rc8P1bz9fx",
    serverUrl: "https://new-back-games.herokuapp.com",
    //serverUrl: "http://localhost:3000",

    project: "Dust Blackjack",
  },
  colors: {
    primaryBackground: "#FFF",
    secondaryBackground: "#f0f0f0",
    objectBackground: "#000",
    objectText: "#393824",
    buttonText: "#FFF",
    accentColor: "#000",
    disabledColor: "grey",
  },
  objects: {
    logo: "Dust Blackjack",
    logoUrl: "",
    coins: [
      {
        label: "$SOL",
        imgSrc:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        value: "SOL",
        mintAddress: "11111111111111111111111111111111",
        multiplier: Math.pow(10, 9),
        firstBetValue: 0.05,
        secondBetValue: 0.1,
        thirdBetValue: 0.25,
        maxBetValue: 1,
        toTokenAccountAddress: "Bu5gKq6fDJUmhze2ke2n6x2SynJeinBUX6Rc8P1bz9fx",
      },
      /*{
        label: "$DUST",
        imgSrc:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ/logo.jpg",
        value: "DUST",
        mintAddress: "DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ",
        multiplier: Math.pow(10, 9),
        firstBetValue: 0.05,
        secondBetValue: 0.1,
        thirdBetValue: 0.25,
        maxBetValue: 1,
        toTokenAccountAddress: "725dUa8uS99WBTy41G3VTyDrEDqWp95TXe3Yzjrx6mcU",
      },
      {
        label: "$PUFF",
        imgSrc:
          "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/G9tt98aYSznRk7jWsfuz9FnTdokxS6Brohdo9hSmjTRB/logo.png",
        value: "PUFF",
        mintAddress: "G9tt98aYSznRk7jWsfuz9FnTdokxS6Brohdo9hSmjTRB",
        multiplier: Math.pow(10, 9),
        firstBetValue: 0.05,
        secondBetValue: 0.1,
        thirdBetValue: 0.25,
        maxBetValue: 1,
        toTokenAccountAddress: "4dox29cbMkQ3L6k69rVMfuuPTf4MoJXoySXT38H4uhKc",
      },*/
    ],
  },
};

export default constants;
