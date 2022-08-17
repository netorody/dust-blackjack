import Reel from "./Reel.js";
import Symbol from "./Symbol.js";

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ["slot-degods", "slot-noiaducks", "slot-octo"],
      ["slot-degods", "slot-noiaducks", "slot-octo"],
      ["slot-degods", "slot-noiaducks", "slot-octo"],
      ["slot-degods", "slot-noiaducks", "slot-octo"],
      ["slot-degods", "slot-noiaducks", "slot-octo"],
    ];

    this.nextSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx])
    );

    this.wonButton = document.getElementById("won");
    this.lostButton = document.getElementById("lost");
    this.wonButton.addEventListener("click", () => this.wonSpin());
    this.lostButton.addEventListener("click", () => this.lostSpin());


    if (config.inverted) {
      this.container.classList.add("inverted");
    }
  }

  wonSpin() {
    this.onSpinStart();

    this.currentSymbols = this.nextSymbols;


    this.nextSymbols = [
      ["slot-degods", "slot-noiaducks", "slot-octo"],
      ["slot-degods", "slot-noiaducks", "slot-octo"],
      ["slot-degods", "slot-noiaducks", "slot-octo"],
      ["slot-degods", "slot-noiaducks", "slot-octo"],
      ["slot-degods", "slot-noiaducks", "slot-octo"],
    ]

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd());
  }

  lostSpin() {
    this.onSpinStart();

    this.currentSymbols = this.nextSymbols;

    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      })
    ).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.wonButton.disabled = true;
    this.lostButton.disabled = true;

  }

  onSpinEnd() {
    this.wonButton.disabled = false;
    this.lostButton.disabled = false;

  }
}
