import React, { useEffect, useState } from "react";
import BoardCell from './BoardCell';

function Board({ board, turn }) {
    const [currentBoard, setCurrentBoard] = useState([]);

    useEffect(() => {
        setCurrentBoard(
            turn === 'w' ? board.flat() : board.flat().reverse()
        )
    }, [board, turn]);

    function getxyPosition(i) {
        const x = turn === 'w' ? i % 8 : Math.abs((i % 8) - 7);
        const y = turn === 'w' ? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i / 8);

        return { x, y };
    }

    function isBlack(i) {
        const { x, y } = getxyPosition(i);
        return (x + y) % 2 === 1;
    }

    function getPosition(i) {
        const { x, y } = getxyPosition(i);

        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x];

        return `${letter}${y + 1}`;
    }

    return (
        <div className="board">
            {currentBoard.map((piece, i) => {
                <div className="cell" key={i}>
                    <BoardCell piece={piece} black={isBlack(i)} position={getPosition(i)} />
                </div>
            })}
        </div>
    )
}

export default Board;