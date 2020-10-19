import {Card} from './card.js';
import {GameOptions} from './gameOptions.js';

export class Game {

    constructor(canvasBoard) {
        this.canvasBoard = canvasBoard;
        this.cards = [];
        this.openCardAmount = 0;
        this.clickIsAvailable = true;
    }

    init() {
        this.gameOptions = new GameOptions(this.canvasBoard);
        this.gameOptions.drawGameSettings();
        this.canvasBoard.setClickEvenListener((e) => this.gameOptions.updateSettings(e, () => this.startGame()));
    }

    startGame() {
        this.canvasBoard.clearCanvas();

        this.canvasBoard.removeEventListener();
        this.fillFieldWithCards(this.gameOptions.sizeOption.amount, this.gameOptions.sizeOption.cardWith, this.gameOptions.sizeOption.cardHeight,
            this.gameOptions.sizeOption.xSpace, this.gameOptions.sizeOption.ySpace);

        this.cards.forEach(card => card.draw());
        this.canvasBoard.setClickEvenListener((e) => this.openCards(e));
    }

    openCards(e) {
        let callback;
        const position = this.canvasBoard.retrieveCursorPosition(e);
        const card = this.cards.find(card => !card.guessed && card.isChosen(position.canvasX, position.canvasY))
        const previousOpenedCard = this.cards.find(card => !card.guessed && card.choosen);

        if (this.clickIsAvailable && previousOpenedCard !== card) {
            if (previousOpenedCard && card) {
                if (previousOpenedCard.imgName === card.imgName) {
                    previousOpenedCard.guessed = true;
                    card.guessed = true;
                    this.clickIsAvailable = true

                    this.checkFinishGame();
                } else {
                    callback = () => {
                        previousOpenedCard.close(() => this.clickIsAvailable = true);
                        card.close(() => this.clickIsAvailable = true)
                    }
                }
            }

            if (card) {
                this.clickIsAvailable = false;
                this.openCardAmount++;
                callback = callback ? callback : () => this.clickIsAvailable = true;
                card.open(callback);
            }
        }
    }

    checkFinishGame() {
        const isGameFinished = this.cards.filter(card => !card.guessed).length === 0;
        if (isGameFinished) {
            setTimeout(() => this.finishGame(), 2000);
        }
    }

    finishGame() {
        const score = Math.round(this.cards.length / this.openCardAmount * 100);
        this.canvasBoard.clearCanvas();
        this.canvasBoard.printText(`${score} / 100`, 650, 300, 100)
        this.canvasBoard.printText('CONGRATULATIONS', 370, 550, 100)

    }

    fillFieldWithCards(amount, cardWidth, cardHeight, xSpace, ySpace) {
        let currentX = xSpace;
        let currentY = ySpace;
        let allCards = [];
        const xSum = cardWidth + xSpace;

        for (let i = 1; i <= amount; i++) {
            allCards.push(new Card(currentX, currentY, cardWidth, cardHeight, this.gameOptions.cardBackColor, this.canvasBoard));

            if (currentX + xSum > this.canvasBoard.canvas.width) {
                currentX = xSpace;
                currentY += cardHeight + ySpace;
            } else {
                currentX += xSum;
            }
        }
        this.cards = this.setUpImagesForCards(allCards, amount);
    }

    setUpImagesForCards(cards, amount) {
        let imgNumbers = [];
        for (let i = 1; i <= 16; i++) {
            imgNumbers.push(i);
        }
        imgNumbers = imgNumbers.sort(() => Math.random() - 0.5);
        let usedImg = imgNumbers.slice(0, amount / 2);

        cards = cards.sort(() => Math.random() - 0.5);

        for (let i = 0, j = 0; i < usedImg.length; i++, j += 2) {
            const imgSrc = usedImg[i] + '.png'
            cards[j].setImgSrc(imgSrc);
            cards[j + 1].setImgSrc(imgSrc);
        }
        return cards;
    }
}

