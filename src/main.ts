import { GameState } from './gamestate';
import { Renderer } from './renderer';
import { BoardInteractionHandler } from './board_interaction';


window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const gameState = new GameState();
    const renderer = new Renderer(canvas);
    const boardInteractionHandler = new BoardInteractionHandler(canvas, gameState, renderer);
    boardInteractionHandler.intialDraw();
});