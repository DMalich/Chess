import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

function Piece({ piece: { type, color }, position }) {
    const pieceImg = require(`../assets/${type}_${color}.png`);

    const [{ isDragging }, drag, preview] = useDrag({
        item: {
            type: 'piece',
            id: `${position}_${type}_${color}`,
        },
        collect: (monitor) => {
            return { isDragging: !!monitor.isDragging() }
        }
    })

    return (
        <>
            <DragPreviewImage connect={preview} src={pieceImg} />
            <div className="piece-container" style={{ opacity: isDragging ? 0 : 1 }} ref={drag}>
                <img src={pieceImg} alt='' className="piece" />
            </div>
        </>
    )
}

export default Piece;