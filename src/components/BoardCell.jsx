import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import Piece from './Piece';
import Promote from './Promote';
import { useDrop } from "react-dnd";
import { gameSubject, handleMove } from '../controller';

function BoardCell({ piece, black, position }) {
    const [promotion, setPromotion] = useState(null);

    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => {
            const [fromPosition] = item.id.split('_');
            handleMove(fromPosition, position);
        }
    })

    useEffect(() => {
        const subscribe = gameSubject.subscribe(
            ({ pendingPromotion }) => {
                pendingPromotion && pendingPromotion.to === position
                    ? setPromotion(pendingPromotion)
                    : setPromotion(null)
            }
        )

        return () => subscribe.unsubscribe()
    }, [position])

    return (
        <div className="board-cell" ref={drop}>
            <Cell black={black}>
                {promotion
                    ? (<Promote promotion={promotion} />)
                    : piece
                        ? (<Piece piece={piece} position={position} />)
                        : null}
            </Cell>
        </div>
    )
}

export default BoardCell;