const RANKS = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const SUITS = ["♠", "♥", "♣", "♦"];

export const initializeUserCardList = ({
  setUserCardList,
  userCardsTotal,
  setUserCardsTotal,
  won,
  selected,
}) => {
  let cardList = [];
  let total = 0;
  for (let i of [1, 2]) {
    const suitsIndex = Math.floor(Math.random() * 4);
    const ranksIndex = Math.floor(Math.random() * 13);

    const suit = SUITS[suitsIndex];
    const rank = RANKS[ranksIndex];

    const newRankIndex = ranksIndex >= 9 ? 0 : ranksIndex + 1;

    total = total + newRankIndex;
    cardList = [...cardList, { suit, rank }];

    if (total > 9) {
      const temp = String(total).split("");
      total = Number(temp[1]);
    }
  }
  if (!won && (total === 8 || total === 9)) {
    return initializeUserCardList({
      setUserCardList,
      userCardsTotal,
      setUserCardsTotal,
      won,
    });
  } else if (!won && total <= 5) {
    const helper = RANKS.slice(0, 7 - total);

    const suitsIndex = Math.floor(Math.random() * 4);
    const ranksIndex = Math.floor(Math.random() * (helper.length - 1));

    const suit = SUITS[suitsIndex];
    const rank = RANKS[ranksIndex];

    const newRankIndex = ranksIndex >= 9 ? 0 : ranksIndex + 1;

    total = total + newRankIndex;
    cardList = [...cardList, { suit, rank }];

    setUserCardsTotal(total);
    setUserCardList(cardList);
    return total;
  } else if (won && total !== 8 && total !== 9) {
    return initializeUserCardList({
      setUserCardList,
      userCardsTotal,
      setUserCardsTotal,
      won,
      selected,
    });
  } else {
    setUserCardsTotal(total);
    setUserCardList(cardList);
  }
  return total;
};

export const initializeHouseCardList = ({
  setHouseCardList,
  houseCardsTotal,
  setHouseCardsTotal,
  won,
  selected,
  userCardsTotal,
}) => {
  let cardList = [];
  let total = 0;
  for (let i of [1, 2]) {
    const suitsIndex = Math.floor(Math.random() * 4);
    const ranksIndex = Math.floor(Math.random() * 13);

    const suit = SUITS[suitsIndex];
    const rank = RANKS[ranksIndex];

    const newRankIndex = ranksIndex >= 9 ? 0 : ranksIndex + 1;

    total = total + newRankIndex;
    if (total > 9) {
      const temp = String(total).split("");
      total = Number(temp[1]);
    }

    cardList = [...cardList, { suit, rank }];
  }
  if (selected === "TIE") {
    console.log({ total });
    console.log({ userCardsTotal });
    if (won) {
      console.log("TIE 72", { won });
      console.log("diferente", total, userCardsTotal);
      if (total !== userCardsTotal) {
        initializeHouseCardList({
          setHouseCardList,
          houseCardsTotal,
          setHouseCardsTotal,
          selected,
          won,
          userCardsTotal,
        });
      } else {
        setHouseCardsTotal(total);
        setHouseCardList(cardList);
      }
    } else if (total === userCardsTotal) {
      console.log(82, total, userCardsTotal);
      initializeHouseCardList({
        setHouseCardList,
        houseCardsTotal,
        setHouseCardsTotal,
        selected,
        won,
        userCardsTotal,
      });
    } else {
      setHouseCardsTotal(total);
      setHouseCardList(cardList);
    }
  } else if (won && (total === 8 || total === 9)) {
    initializeHouseCardList({
      setHouseCardList,
      houseCardsTotal,
      setHouseCardsTotal,
      won,
      userCardsTotal,
    });
  } else if (won && total <= 5) {
    const helper = RANKS.slice(0, 7 - total);

    const suitsIndex = Math.floor(Math.random() * 4);
    const ranksIndex = Math.floor(Math.random() * (helper.length - 1));

    const suit = SUITS[suitsIndex];
    const rank = RANKS[ranksIndex];

    const newRankIndex = ranksIndex >= 9 ? 0 : ranksIndex + 1;

    total = total + newRankIndex;
    cardList = [...cardList, { suit, rank }];

    setHouseCardsTotal(total);
    setHouseCardList(cardList);
  } else if (!won && total < 8) {
    initializeHouseCardList({
      setHouseCardList,
      houseCardsTotal,
      setHouseCardsTotal,
      won,
      selected,
      userCardsTotal,
    });
  } else {
    setHouseCardsTotal(total);
    setHouseCardList(cardList);
  }
};
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const handleHitClick = ({
  won,
  userCardsTotal,
  setUserCardsTotal,
  userCardList,
  setUserCardList,
}) => {
  const suitsIndex = Math.floor(Math.random() * 4);
  const suit = SUITS[suitsIndex];
  const missingPoints = 21 - userCardsTotal;

  if (won) {
    if (missingPoints > 10) {
      const ranksIndex = randomIntFromInterval(5, 13);
      const rank = RANKS[ranksIndex];

      let newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      setUserCardsTotal(userCardsTotal + newRankIndex);
      setUserCardList([...userCardList, { suit, rank }]);
      return false;
    } else {
      const rank = RANKS[missingPoints - 1];
      setUserCardsTotal(21);
      setUserCardList([...userCardList, { suit, rank }]);
      return true;
    }
  } else {
    if (missingPoints > 10) {
      //Cant explode now
      const ranksIndex = Math.floor(Math.random() * 13);
      const rank = RANKS[ranksIndex];

      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      setUserCardsTotal(userCardsTotal + newRankIndex);
      setUserCardList([...userCardList, { suit, rank }]);
      return false;
    } else if (missingPoints === 10) {
      const ranksIndex = randomIntFromInterval(0, 7);

      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      const rank = RANKS[ranksIndex];
      setUserCardsTotal(userCardsTotal + newRankIndex);
      setUserCardList([...userCardList, { suit, rank }]);
      return false;
    } else {
      const minimumPoints = missingPoints;

      const ranksIndex = randomIntFromInterval(minimumPoints, 12);

      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      const rank = RANKS[ranksIndex];
      setUserCardsTotal(userCardsTotal + newRankIndex);
      setUserCardList([...userCardList, { suit, rank }]);
      return true;
    }
  }
};

export const handleStandClick = ({
  won,
  houseCardsTotal,
  setHouseCardsTotal,
  houseCardList,
  setHouseCardList,
  userCardsTotal,
}) => {
  const suitsIndex = Math.floor(Math.random() * 4);
  const suit = SUITS[suitsIndex];
  const missingPoints = 22 - houseCardsTotal;

  if (won) {
    if (missingPoints > 10) {
      if (houseCardsTotal < userCardsTotal) {
        const maxPoints = userCardsTotal - houseCardsTotal - 1;
        const ranksIndex = randomIntFromInterval(0, maxPoints);
        const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

        const rank = RANKS[ranksIndex];
        setHouseCardsTotal(houseCardsTotal + newRankIndex);
        setHouseCardList([...houseCardList, { suit, rank }]);
        return false;
      } else {
        //Cant explode now
        const ranksIndex = Math.floor(Math.random() * 13);
        const rank = RANKS[ranksIndex];

        const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

        setHouseCardsTotal(houseCardsTotal + newRankIndex);
        setHouseCardList([...houseCardList, { suit, rank }]);
        return false;
      }
    } else if (houseCardsTotal < userCardsTotal - 1) {
      const teste = Math.floor(Math.random() * 100);
      const maxPoints =
        userCardsTotal - houseCardsTotal - (teste % 2 === 0 ? 1 : 2);
      const ranksIndex = randomIntFromInterval(0, maxPoints);
      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      const rank = RANKS[ranksIndex];
      setHouseCardsTotal(houseCardsTotal + newRankIndex);
      setHouseCardList([...houseCardList, { suit, rank }]);
      return false;
    } else {
      const minimumPoints = missingPoints;

      const ranksIndex = randomIntFromInterval(minimumPoints, 12);

      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      const rank = RANKS[ranksIndex];
      setHouseCardsTotal(houseCardsTotal + newRankIndex);
      setHouseCardList([...houseCardList, { suit, rank }]);
      return true;
    }
  } else {
    if (missingPoints > 10) {
      const ranksIndex = Math.floor(Math.random() * 13);
      const rank = RANKS[ranksIndex];

      const newRankIndex = ranksIndex >= 10 ? 10 : ranksIndex + 1;

      setHouseCardsTotal(houseCardsTotal + newRankIndex);
      setHouseCardList([...houseCardList, { suit, rank }]);
      return false;
    } else {
      const rank = RANKS[missingPoints - 2];
      setHouseCardsTotal(21);
      setHouseCardList([...houseCardList, { suit, rank }]);
      return true;
    }
  }
};
