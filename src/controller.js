import * as ChessJS from "chess.js";
import { BehaviorSubject } from "rxjs";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;
const chess = new Chess();

export const gameSubject = new BehaviorSubject();

export function initGame() {
    const savedGamed = localStorage.getItem("savedGame");

    if (savedGamed) {
        chess.load(savedGamed);
    }

    updateGame();
}

function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over;

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null,
    };

    localStorage.setItem("savedGame", chess.fen());

    gameSubject.next(newGame);
}

export function resetGame() {
    chess.reset();
    updateGame();
}

function getGameResult() {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? "BLACK" : "WHITE";
        return `CHECKMATE! Winner is: ${winner}`;
    } else if (chess.in_draw()) {
        let reason = "50-moves-rule";

        if (chess.in_stalemate()) {
            reason = "Stalemate";
        } else if (chess.insufficient_material()) {
            reason = "Insufficient material";
        } else if (chess.in_threefold_repetition()) {
            reason = "Position occured three or more times";
        }

        return `DRAW! ${reason}`;
    } else {
        return "error";
    }
}

export function move(from, to, promotion) {
    let tempMove = { from, to };

    if (promotion) {
        tempMove.promotion = promotion;
    }

    if (chess.move(tempMove)) {
        updateGame();
    }
}

export function handleMove(from, to) {
    const promotions = chess
        .moves({ verbose: true })
        .filter((move) => move.promotion);
    console.table(promotions);

    if (promotions.some((p) => `${p.from}: ${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = { from, to, color: promotions[0].color };
        updateGame(pendingPromotion);
    }

    const { pendingPromotion } = gameSubject.getValue();

    if (!pendingPromotion) {
        move(from, to);
    }
}
