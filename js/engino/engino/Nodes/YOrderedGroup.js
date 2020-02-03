import { Node } from '../Core/Node.js';

class YOrderedGroup extends Node {
  update(deltatime) {
    this.children.sort((a, b) => {
      return a.globalPosition.y > b.globalPosition.y;;
    });
  }
}

export { YOrderedGroup };
export default YOrderedGroup;
