function getPath(from, to) {
  const GAMEBOARD_SIZE = 8;
  const KNIGHT_MOVES = [
    [-2, -1],
    [-1, -2],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
  ];

  const queue = [{ from, prev: [] }];
  const [toX, toY] = to;

  function searchPath(queue) {
    const { from, prev } = queue.shift();
    const [fromX, fromY] = from;
    const moves = [...prev, from];

    if (fromX === toX && fromY === toY) return moves;

    for (let i = 0; i < KNIGHT_MOVES.length; i++) {
      const [moveX, moveY] = KNIGHT_MOVES[i];
      const pos = [fromX + moveX, fromY + moveY];
      if (!isValidMove(pos)) continue;
      queue.push({ from: pos, prev: moves });
    }

    return searchPath(queue);
  }

  function isValidMove(pos) {
    const [posX, posY] = pos;

    return (
      posX >= 0 && posX < GAMEBOARD_SIZE && posY >= 0 && posY < GAMEBOARD_SIZE
    );
  }

  function consoleOutput(moves) {
    let output =
      "You made it in " + (moves.length - 1) + " moves! Here's your path:\n";

    for (let i = 0; i < moves.length; i++) {
      const [x, y] = moves[i];
      output += `[${x}, ${y}]\n`;
    }

    return output;
  }

  return consoleOutput(searchPath(queue));
}

console.log(getPath([0, 0], [7, 7]));
