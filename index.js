window.onload = () => {
  const startGameBtn = document.querySelector(".start-game-button");
  startGameBtn.addEventListener("click", handleStartGameBtnClick);
  const theme = new Audio("./audio/theme.mp3");

  const global = {
    playerChoice: null,
    computerChoice: null,
    winner: null,
    canPlay: false,
  };

  if (window.innerWidth < 800 || window.innerHeight < 600) {
    alert(
      "This game is intended for devices with at LEAST 800x600 resoultion."
    );
    const wrapper = document.querySelector(".wrapper");
    wrapper.remove();
  }

  function handleStartGameBtnClick() {
    const startGameBtn = document.querySelector(".start-game-button");
    startGameBtn.removeEventListener("click", handleStartGameBtnClick);
    const splashPageContainer = document.querySelector(".splash-container");
    splashPageContainer.remove();
    startGame();
  }

  function startGame() {
    chooseAttack();
  }

  function createAttackBtns() {
    const chooseAttackContainer = document.querySelector(
      ".choose-attack-container"
    );
    const rockAttackContainer = document.createElement("div");
    const rockAttackBtn = document.createElement("button");
    rockAttackBtn.classList.add("rock-attack-button");
    rockAttackContainer.appendChild(rockAttackBtn);
    rockAttackContainer.classList.add("rock-attack-container");
    const paperAttackContainer = document.createElement("div");
    paperAttackContainer.classList.add("paper-attack-container");
    const paperAttackBtn = document.createElement("button");
    paperAttackBtn.classList.add("paper-attack-button");
    paperAttackContainer.appendChild(paperAttackBtn);
    const scissorsAttackContainer = document.createElement("div");
    const scissorsAttackBtn = document.createElement("button");
    scissorsAttackBtn.classList.add("scissors-attack-button");
    scissorsAttackContainer.appendChild(scissorsAttackBtn);
    scissorsAttackContainer.classList.add("scissors-attack-container");
    chooseAttackContainer.appendChild(rockAttackContainer);
    chooseAttackContainer.appendChild(paperAttackContainer);
    chooseAttackContainer.appendChild(scissorsAttackContainer);
  }

  function createAttackTitle() {
    const wrapper = document.querySelector(".wrapper");
    const chooseAttackContainer = document.createElement("div");
    wrapper.appendChild(chooseAttackContainer);
    chooseAttackContainer.classList.add("choose-attack-container");
    const chooseAttackTitle = document.createElement("span");
    chooseAttackTitle.classList.add("choose-attack-title");
    chooseAttackTitle.innerText = "Choose Attack";
    chooseAttackContainer.appendChild(chooseAttackTitle);
  }

  function chooseAttack() {
    theme.play();
    theme.loop = true;
    theme.volume = 0.1;
    createAttackTitle();
    createAttackBtns();
    const rockAttackBtn = document.querySelector(".rock-attack-button");
    const paperAttackBtn = document.querySelector(".paper-attack-button");
    const scissorsAttackBtn = document.querySelector(".scissors-attack-button");

    rockAttackBtn.addEventListener("click", handleRockAttackBtnClick);
    rockAttackBtn.addEventListener("mouseover", bubbleNoise);
    paperAttackBtn.addEventListener("click", handlePaperAttackBtnClick);
    paperAttackBtn.addEventListener("mouseover", bubbleNoise);
    scissorsAttackBtn.addEventListener("click", handleScissorsAttackBtnClick);
    scissorsAttackBtn.addEventListener("mouseover", bubbleNoise);
  }

  function bubbleNoise() {
    const bubble = new Audio("./audio/bubble.mp3");
    bubble.volume = 0.3;
    bubble.play();
  }

  function handleRockAttackBtnClick(e) {
    global.playerChoice = "rock";
    global.computerChoice = computerAttack();
    removeAllBtnEventListeners();
    removeChooseAttackContainer();
    createPlayerAndComputer();
    createCountDown();
  }

  function handlePaperAttackBtnClick() {
    global.playerChoice = "paper";
    global.computerChoice = computerAttack();
    removeAllBtnEventListeners();
    removeChooseAttackContainer();
    createPlayerAndComputer();
    createCountDown();
  }

  function handleScissorsAttackBtnClick() {
    global.playerChoice = "scissors";
    global.computerChoice = computerAttack();
    removeAllBtnEventListeners();
    removeChooseAttackContainer();
    createPlayerAndComputer();
    createCountDown();
  }

  function computerAttack() {
    const choices = ["rock", "paper", "scissors"];
    const randomNum = Math.floor(Math.random() * choices.length);
    return choices[randomNum];
  }

  function removeChooseAttackContainer() {
    const chooseAttackContainer = document.querySelector(
      ".choose-attack-container"
    );
    chooseAttackContainer.remove();
  }

  function removeAllBtnEventListeners() {
    theme.pause();
    const rockAttackBtn = document.querySelector(".rock-attack-button");
    const paperAttackBtn = document.querySelector(".paper-attack-button");
    const scissorsAttackBtn = document.querySelector(".scissors-attack-button");

    rockAttackBtn.removeEventListener("click", handleRockAttackBtnClick);
    paperAttackBtn.removeEventListener("click", handlePaperAttackBtnClick);
    scissorsAttackBtn.removeEventListener(
      "click",
      handleScissorsAttackBtnClick
    );
  }

  class Player {
    draw() {
      const battleContainer = document.querySelector(".battle-container");

      const player = document.createElement("div");
      player.classList.add("player");
      battleContainer.appendChild(player);
    }
  }

  class Computer {
    draw() {
      const battleContainer = document.querySelector(".battle-container");
      const computer = document.createElement("div");
      computer.classList.add("computer");
      battleContainer.appendChild(computer);
    }
  }

  function createPlayerAndComputer() {
    const battleContainer = document.createElement("div");
    const playerTitle = document.createElement("span");
    playerTitle.classList.add("player-title");
    playerTitle.innerText = "You";
    battleContainer.appendChild(playerTitle);
    const computerTitle = document.createElement("span");
    computerTitle.classList.add("computer-title");
    computerTitle.innerText = "Computer";
    battleContainer.appendChild(computerTitle);
    const wrapper = document.querySelector(".wrapper");
    battleContainer.classList.add("battle-container");
    wrapper.appendChild(battleContainer);
    const player = new Player();
    player.draw();
    const computer = new Computer();
    computer.draw();
  }

  function createCountDown() {
    const one = new Audio("./audio/1.mp3");
    const two = new Audio("./audio/2.mp3");
    const three = new Audio("./audio/3.mp3");
    const appear = new Audio("./audio/appear.mp3");
    appear.volume = 0.3;
    one.volume = 0.08;
    two.volume = 0.08;
    three.volume = 0.08;
    const battleContainer = document.querySelector(".battle-container");
    const countDownText = document.createElement("span");
    countDownText.classList.add("count-down-text");
    countDownText.innerText = "Get Ready..";
    battleContainer.appendChild(countDownText);

    setTimeout(() => {
      countDownText.innerText = "1";
      one.play();
    }, 0);
    setTimeout(() => {
      countDownText.innerText = "2";
      two.play();
    }, 1500);
    setTimeout(() => {
      countDownText.innerText = "3";
      three.play();
    }, 3000);
    setTimeout(() => {
      appear.play();
      countDownText.remove();
      changeHands();
      determineWinner();
      outcomeAnimation();
    }, 4500);
  }

  function changeHands() {
    const player = document.querySelector(".player");
    const pChoice = global.playerChoice;
    const computer = document.querySelector(".computer");
    const cChoice = global.computerChoice;
    switch (pChoice) {
      case "rock":
        break;
      case "paper":
        player.style.backgroundImage = `url('./images/paper.png')`;
        break;
      case "scissors":
        player.style.backgroundImage = `url("./images/scissors.png")`;
        break;
    }

    switch (cChoice) {
      case "rock":
        break;
      case "paper":
        computer.style.backgroundImage = `url("./images/paper-reversed.png")`;
        break;
      case "scissors":
        computer.style.backgroundImage = `url("./images/scissors-reversed.png")`;
        break;
    }
  }

  function determineWinner() {
    const pChoice = global.playerChoice;
    const cChoice = global.computerChoice;

    if (pChoice === "rock" && cChoice === "rock") global.winner = "Tie!";
    if (pChoice === "rock" && cChoice === "paper")
      global.winner = "Computer Wins!";
    if (pChoice === "rock" && cChoice === "scissors")
      global.winner = "You Win!";

    if (pChoice === "paper" && cChoice === "paper") global.winner = "Tie!";
    if (pChoice === "paper" && cChoice === "rock") global.winner = "You Win!";
    if (pChoice === "paper" && cChoice === "scissors")
      global.winner = "Computer Wins!";

    if (pChoice === "scissors" && cChoice === "scissors")
      global.winner = "Tie!";
    if (pChoice === "scissors" && cChoice === "rock")
      global.winner = "Computer Wins!";
    if (pChoice === "scissors" && cChoice === "paper")
      global.winner = "You Win!";
  }

  function createModal() {
    if (global.winner === "You Win!") {
      const ohyeah = new Audio("./audio/ohyeah.mp3");
      ohyeah.play();
    }
    if (global.winner === "Computer Wins!") {
      const lost = new Audio("./audio/lost.mp3");
      lost.volume = 0.5;
      lost.play();
    }
    const modal = document.createElement("div");
    const wrapper = document.querySelector(".wrapper");
    modal.classList.add("modal");
    wrapper.appendChild(modal);
    const modalText = document.createElement("span");
    modalText.classList.add("modal-text");
    modalText.innerText = global.winner;
    wrapper.appendChild(modalText);

    modal.addEventListener("click", handleModalClick);
    modalText.addEventListener("click", handleModalClick);
  }

  function handleModalClick() {
    const battleContainer = document.querySelector(".battle-container");
    const modal = document.querySelector(".modal");
    const modalText = document.querySelector(".modal-text");
    modal.removeEventListener("click", handleModalClick);
    modalText.removeEventListener("click", handleModalClick);
    modal.remove();
    modalText.remove();
    battleContainer.remove();
    chooseAttack();
  }

  function outcomeAnimation() {
    const result = global.winner;
    const pChoice = global.playerChoice;
    const cChoice = global.computerChoice;

    if (result === "Tie!") {
      createModal();
    }
    if (result === "You Win!" && pChoice === "rock") {
      playerRockWin();
    }
    if (result === "You Win!" && pChoice === "paper") {
      playerPaperWin();
    }
    if (result === "You Win!" && pChoice === "scissors") {
      playerScissorsWin();
    }

    if (result === "Computer Wins!" && cChoice === "rock") {
      computerRockWin();
    }
    if (result === "Computer Wins!" && cChoice === "paper") {
      computerPaperWin();
    }
    if (result === "Computer Wins!" && cChoice === "scissors") {
      computerScissorsWin();
    }
  }

  function playerRockWin() {
    const player = document.querySelector(".player");
    const computer = document.querySelector(".computer");
    const punch = new Audio("./audio/punch.mp3");
    punch.volume = 0.08;
    player.classList.add("player-rock-smash");
    computer.classList.add("computer-spinning-scissors");
    setTimeout(() => {
      punch.play();
    }, 1000);
    setTimeout(() => {
      createModal();
    }, 2400);
  }

  function playerPaperWin() {
    const player = document.querySelector(".player");
    const stretch = new Audio("./audio/stretch.mp3");
    const paper = new Audio("./audio/paper.mp3");
    paper.volume = 0.5;
    player.classList.add("player-paper-cover");
    setTimeout(() => {
      stretch.play();
    }, 600);
    setTimeout(() => {
      paper.play();
    }, 2000);
    setTimeout(() => {
      createModal();
    }, 3200);
  }

  function playerScissorsWin() {
    const player = document.querySelector(".player");
    const computer = document.querySelector(".computer");
    const knife = new Audio("./audio/knife.mp3");
    const fire = new Audio("./audio/fire.mp3");
    fire.volume = 0.3;
    knife.volume = 0.5;
    setTimeout(() => {
      player.style.transform = "translate(50px,10px)";
      computer.style.backgroundImage = `url("./images/paper-reversed-slice1.png")`;
      knife.play();
    }, 800);
    setTimeout(() => {
      player.style.transform = "translate(0px,0px)";
    }, 1300);
    setTimeout(() => {
      player.style.transform = "translate(50px,10px)";
      computer.style.backgroundImage = `url("./images/paper-reversed-slice2.png")`;
      knife.play();
    }, 1800);
    setTimeout(() => {
      player.style.transform = "translate(0px,0px)";
    }, 2300);
    setTimeout(() => {
      player.style.transform = "translate(50px,10px)";
      computer.style.backgroundImage = `url("./images/paper-reversed-slice3.png")`;
      knife.play();
    }, 2800);
    setTimeout(() => {
      player.style.transform = "translate(0px,0px)";
    }, 3300);
    setTimeout(() => {
      computer.classList.add("fade-out");
      fire.play();
    }, 3800);
    setTimeout(() => {
      createModal();
    }, 5000);
  }

  function computerRockWin() {
    const player = document.querySelector(".player");
    const computer = document.querySelector(".computer");
    const punch = new Audio("./audio/punch.mp3");
    punch.volume = 0.08;
    computer.classList.add("computer-rock-smash");
    player.classList.add("player-spinning-scissors");
    setTimeout(() => {
      punch.play();
    }, 1000);
    setTimeout(() => {
      createModal();
    }, 2400);
  }

  function computerPaperWin() {
    const computer = document.querySelector(".computer");
    const stretch = new Audio("./audio/stretch.mp3");
    const paper = new Audio("./audio/paper.mp3");
    paper.volume = 0.5;
    computer.classList.add("computer-paper-cover");
    setTimeout(() => {
      stretch.play();
    }, 600);
    setTimeout(() => {
      paper.play();
    }, 2000);
    setTimeout(() => {
      createModal();
    }, 3200);
  }

  function computerScissorsWin() {
    const player = document.querySelector(".player");
    const computer = document.querySelector(".computer");
    const knife = new Audio("./audio/knife.mp3");
    const fire = new Audio("./audio/fire.mp3");
    fire.volume = 0.3;
    knife.volume = 0.5;
    setTimeout(() => {
      computer.style.transform = "translate(-50px,10px)";
      player.style.backgroundImage = `url("./images/paper-slice1.png")`;
      knife.play();
    }, 800);
    setTimeout(() => {
      computer.style.transform = "translate(0px,0px)";
    }, 1300);
    setTimeout(() => {
      computer.style.transform = "translate(-50px,10px)";
      player.style.backgroundImage = `url("./images/paper-slice2.png")`;
      knife.play();
    }, 1800);
    setTimeout(() => {
      computer.style.transform = "translate(0px,0px)";
    }, 2300);
    setTimeout(() => {
      computer.style.transform = "translate(-50px,10px)";
      player.style.backgroundImage = `url("./images/paper-slice3.png")`;
      knife.play();
    }, 2800);
    setTimeout(() => {
      computer.style.transform = "translate(0px,0px)";
    }, 3300);
    setTimeout(() => {
      player.classList.add("fade-out");
      fire.play();
    }, 3800);
    setTimeout(() => {
      createModal();
    }, 5000);
  }
};
