import {Game} from './module/game.js';
import {CanvasBoard} from './module/canvasBoard.js';

const canvas = document.getElementById('canvas');
const canvasBoard = new CanvasBoard(canvas);
const game = new Game(canvasBoard);
game.init();

