import { Node } from '../Core/Node.js';
import { Vector2 } from '../Utilities.js';

class Grid extends Node {
  constructor(cellCount, gridSize, ...args) {
    super(...args);

    this.cellCount = cellCount;
    this.gridSize = gridSize;

    this.cells = [];
    for (let x = 0; x < this.cellCount.x; ++x) {
      this.cells.push([]);
      for (let y = 0; y < this.cellCount.y; ++y)
        this.cells[x].push(null);
    }
  }

  _update(deltatime) {
    for (let x = 0; x < this.cellCount.x; ++x)
      for (let y = 0; y < this.cellCount.y; ++y)
        if (this.cells[x][y] !== null) {
          this.cells[x][y]._update(deltatime);
          if (this.cells[x][y].dead)
            this.cells[x][y] = null;
        }
    
    this.update(deltatime);
  }

  _render(ctx) {
    ctx.save()

		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotation);

		this.render(ctx);

    const cellOffset = new Vector2(
      this.gridSize.x / this.cellCount.x, 
      this.gridSize.y / this.cellCount.y
    );

    for (let x = 0; x < this.cellCount.x; ++x)
      for (let y = 0; y < this.cellCount.y; ++y) {
        if (this.cells[x][y] === null)
          continue;

        ctx.save();

        ctx.translate(
          cellOffset.x * (x + 0.5) - this.gridSize.x / 2, 
          cellOffset.y * (y + 0.5) - this.gridSize.y / 2
        );
        
        this.cells[x][y]._render(ctx);
        
        ctx.restore();
      }

    ctx.restore();
  }

  setCell(x, y, gameObject) {
    this.cells[x][y] = gameObject;
  }
}

export { Grid };
export default Grid;