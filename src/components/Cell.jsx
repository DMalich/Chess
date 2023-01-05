import React from "react";

function Cell({ children, black }) {
    const backgroundClass = black ? 'cell-black' : 'cell-white';

    return (
        <div className={`${backgroundClass} board-cell`}>
            {children}
        </div>
    )
}

export default Cell;