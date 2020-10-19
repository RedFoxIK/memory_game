export class CanvasBoard {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.strokeStyle = 'black';
    }

    setClickEvenListener(clickListener) {
        this.clickListener = clickListener;
        this.canvas.addEventListener('click', this.clickListener, true);
    }

    removeEventListener() {
        this.canvas.removeEventListener('click', this.clickListener, true);
        this.clickListener = null;
    }

    retrieveCursorPosition(e) {
        const canvasBorders = this.canvas.getBoundingClientRect();
        return {
            canvasX: Math.round(e.clientX - canvasBorders.left),
            canvasY: Math.round(e.clientY - canvasBorders.top)
        }
    }

    roundRect(x, y, width, height, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.arcTo(x + width, y, x + width, y + height, radius);
        this.ctx.arcTo(x + width, y + height, x, y + height, radius);
        this.ctx.arcTo(x, y + height, x, y, radius);
        this.ctx.arcTo(x, y, x + width, y, radius);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    printText(text, x, y, size, color) {
        this.ctx.fillStyle = color ? color : 'black';
        this.ctx.font = `${size}px Georgia`;
        this.ctx.fillText(text, x, y);
    }

    getCurrentColor() {
        return this.ctx.fillStyle;
    }

    drawCircle(x, y, radius, fill) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        fill ? this.ctx.fill() : this.ctx.stroke();
        this.ctx.closePath();
    }

    clearCircle(x, y, radius) {
        this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.stroke();
    }

    drawRectangle(x, y, width, height, color) {
        this.ctx.fillStyle = color ? color : 'black';
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.fillRect(x, y, width, height);
    }

    drawImage(img, x, y, width, height) {
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.drawImage(img, x, y, width, height);
    }

    clearRect(x, y, width, height) {
        this.ctx.clearRect(x, y, width, height);
    }
}
