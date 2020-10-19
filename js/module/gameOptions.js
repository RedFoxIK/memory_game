import {CardBack} from './cardBack.js';
import {SizeOption} from './sizeOption.js';

export class GameOptions {

    constructor(canvasBoard) {
        this.canvasBoard = canvasBoard;
        this.startBtnX = 780;
        this.startBtnY = 660;

        this.cardBacks = [
            new CardBack(100, 20, 400, 200, randomColor(), this.canvasBoard),
            new CardBack(650, 20, 400, 200, randomColor(), this.canvasBoard),
            new CardBack(1200, 20, 400, 200, randomColor(), this.canvasBoard)
        ];

        this.sizeOptions = [
            new SizeOption(this.canvasBoard, 320, 6, '3x2 - Easy', 450, 300, 120, 50),
            new SizeOption(this.canvasBoard, 420, 12, '4x3 - Middle', 360, 250, 80, 40),
            new SizeOption(this.canvasBoard, 520, 20, '5x4 - Hard', 300, 180, 60, 40),
        ];

        this.cardBackColor = randomColor();
        this.sizeOption = this.sizeOptions[0];
    }

    drawGameSettings() {
        this.cardBacks.forEach(cardBack => cardBack.draw());
        this.sizeOptions.forEach(sizeOption => sizeOption.draw())

        this.drawStartButton();
        this.sizeOption.highlight();
    }

    drawStartButton = function () {
        this.canvasBoard.roundRect(700, 600, 300, 90, 30, randomColor());
        this.canvasBoard.printText('START', this.startBtnX, this.startBtnY, 50, 'white')
    }

    isStartButtonClicked(canvasX, canvasY) {
        return canvasX >= 700 && canvasX <= 700 + 300 && canvasY >= 600 && canvasY <= 600 + 100;
    }

    updateSettings(e, callBack) {
        const position = this.canvasBoard.retrieveCursorPosition(e);
        const canvasX = position.canvasX;
        const canvasY = position.canvasY;

        if (this.isStartButtonClicked(canvasX, canvasY)) {
            this.finishSetup(0, 30, callBack)
        } else {
            const chosenCardBack = this.cardBacks.find(cardBack => cardBack.isChosen(canvasX, canvasY));
            const chosenSizeOption = this.sizeOptions.find(sizeOption => sizeOption.isChosen(canvasX, canvasY));

            if (chosenCardBack) {
                this.cardBacks.forEach(cardBack => cardBack.clearHighlight());
                chosenCardBack.highlight();
                this.cardBackColor = chosenCardBack.color
            }

            if (chosenSizeOption) {
                this.sizeOptions.forEach(sizeOption => sizeOption.clearHighlight());
                this.sizeOption = chosenSizeOption;
                this.sizeOption.highlight();
            }
        }
    }

    finishSetup(indexStep, steps, callBack) {
        if (indexStep < steps) {
            this.highlight();
            requestAnimationFrame(() => this.finishSetup(++indexStep, steps, callBack));
        } else {
            callBack();
        }
    }

    highlight() {
        const color = (this.canvasBoard.getCurrentColor() === '#000000') ? '#ffffff' : '#000000';
        this.canvasBoard.printText('START', this.startBtnX, this.startBtnY, 50, color);
    }
}

export function randomColor() {
    return `rgba(${randomNumber()}, ${randomNumber()}, ${randomNumber()}, 0.5)`;
}

export function randomNumber() {
    return Math.floor(255 * Math.random());
}
