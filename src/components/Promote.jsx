import React from "react";
import Cell from "./Cell";
import { move } from "../controller";

const promotionPieces = ['r', 'n', 'b', 'q'];

function Promote({ promotion: { from, to, color } }) {
    return (
        <div className="board">
            {promotionPieces.map((piece, i) => {
                <div className="promote-cell" key={i}>
                    <Cell black={i % 3 === 0}>
                        <div className="piece-container" onClick={() => move(from, to, piece)}>
                            <img
                                src={require(`../assets/${piece}_${color}.png`)}
                                className='piece cursor-pointer'
                                alt=''
                            />
                        </div>
                    </Cell>
                </div>
            })}
        </div>
    )
}

export default Promote;