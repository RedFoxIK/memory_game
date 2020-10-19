export class SizeOption {

    constructor(canvasBoard, startY, amount, text,
                cardWidth, cardHeight, xSpace, ySpace) {
        this.canvasBoard = canvasBoard;
        this.radius = 30;
        this.startX = 150;
        this.startY = startY;
        this.amount = amount;
        this.text = text;

        this.cardWith = cardWidth;
        this.cardHeight = cardHeight;
        this.xSpace = xSpace;
        this.ySpace = ySpace;
    }

    draw() {
        this.canvasBoard.drawCircle(this.startX, this.startY, this.radius);
        this.canvasBoard.printText(this.text, this.startX + this.radius * 2, this.startY + this.radius / 2, 50);
    }

    highlight() {
        this.clearHighlight();
        this.canvasBoard.drawCircle(this.startX, this.startY, this.radius, true);
    }

    clearHighlight() {
        this.canvasBoard.clearCircle(this.startX, this.startY, this.radius);
    }

    isChosen(canvasX, canvasY) {
        let dx = this.startX - canvasX;
        let dy = this.startY - canvasY;

        return dx * dx + dy * dy <= this.radius * this.radius;
    }
}
