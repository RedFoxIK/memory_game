import {CardBack} from "./cardBack.js";

export class Card {

    constructor(x, y, width, height, color, canvasBoard) {
        this.cardBack = new CardBack(x, y, width, height, color, canvasBoard);

        this.canvasBoard = canvasBoard;

        this.choosen = false;
        this.guessed = false;

        this.steps = 30;
        this.beforeCloseWait = 20;
        this.sizeMultiplier = 2;
        this.xAnimationStep = Math.round(width / this.sizeMultiplier / this.steps / 2);
        this.yAnimationStep = Math.round(height / this.sizeMultiplier / this.steps / 2);
    }

    setImgSrc(imgSrc) {
        this.imgName = imgSrc;
        this.img = new Image(100);
        this.img.src = 'images/' + imgSrc;
    }

    draw() {
        this.cardBack.draw();
    }

    open(callback) {
        this.choosen = true;
        this.animateCard(this.cardBack.x, this.cardBack.y, this.cardBack.width, this.cardBack.height,
            0, 0, false,  callback);
    }

    close(callback) {
        this.choosen = false;
        this.delayAnimation(0, () => this.animateCard(this.cardBack.x, this.cardBack.y, this.cardBack.width, this.cardBack.height,
            0, 0, true, callback));
    }

    delayAnimation(indexStep, callback) {
        indexStep < this.beforeCloseWait ? requestAnimationFrame(() => this.delayAnimation(++indexStep, callback)) : callback();

    }

    animateCard(currentX, currentY, currentWidth, currentHeight, indexStep, openState, image, callback) {
        if (indexStep < this.steps) {
            this.canvasBoard.clearRect(currentX - 1, currentY - 1, currentWidth + 2, currentHeight + 2);

            const shiftMultiplier = openState ? -1 : 1;

            let newCurrentX = currentX + (shiftMultiplier * this.xAnimationStep);
            let newCurrentY = currentY + (shiftMultiplier * this.yAnimationStep);
            let newCurrentWidth = currentWidth + (-shiftMultiplier * this.xAnimationStep * 2);
            let newCurrentHeight = currentHeight + (-shiftMultiplier * this.xAnimationStep * 2);

            if (image) {
                this.canvasBoard.drawImage(this.img, newCurrentX + 4, newCurrentY + 4, newCurrentWidth - 8, newCurrentHeight - 8);
            } else {
                this.canvasBoard.drawRectangle(newCurrentX, newCurrentY, newCurrentWidth, newCurrentHeight, this.cardBack.color)
            }
            requestAnimationFrame(() => this.animateCard(newCurrentX, newCurrentY, newCurrentWidth, newCurrentHeight, ++indexStep, openState, image, callback));
        } else {
            if (openState === 0) {
                requestAnimationFrame(() => this.animateCard(currentX, currentY, currentWidth, currentHeight,0, ++openState, !image, callback));
            } else {
                if (!image) this.draw();
                if (callback) callback();
            }
        }
    }

    isChosen(canvasX, canvasY) {
        return canvasX >= this.cardBack.x && canvasX <= this.cardBack.x + this.cardBack.width && canvasY >= this.cardBack.y && canvasY <= this.cardBack.y + this.cardBack.height;
    }
}
