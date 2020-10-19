export class CardBack {

    constructor(x, y, width, height, color, canvasBoard) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.width = width;
        this.height = height;

        this.canvasBoard = canvasBoard;
    }

    draw() {
        this.canvasBoard.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
        this.canvasBoard.drawRectangle(this.x, this.y, this.width, this.height, this.color);
        this.canvasBoard.printText('?', this.x + this.width / 3, this.y + this.height - 40, this.height, this.color);
    }

    highlight() {
        this.canvasBoard.drawRectangle(this.x - 10, this.y - 10, this.width + 20, this.height + 20);
        this.canvasBoard.clearRect(this.x, this.y, this.width, this.height);
        this.draw();
    }

    clearHighlight() {
        this.canvasBoard.clearRect(this.x - 11, this.y - 11, this.width + 22, this.height + 22);
        this.draw();
    }


    isChosen(canvasX, canvasY) {
        return canvasX >= this.x && canvasX <= this.x + this.width && canvasY >= this.y && canvasY <= this.y + this.height;
    }
}
