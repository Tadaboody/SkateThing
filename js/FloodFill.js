import { context } from "./main";
function fourWayNeighbors(point) {
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    return directions.map((offset) => {
        return new Vec2(point.x + offset[0], point.y + offset[1]);
    });
}
function arrayEqual(a, b) {
    return all(zip(a, b).map((p) => p[0] == p[1]));
}
function isColored(point) {
    const white = [255, 255, 255];
    const pointValue = getColor(point);
    return !arrayEqual(pointValue, white);
}
function getColor(point) {
    return Array.from(context.getImageData(point.x, point.y, 1, 1)).slice(0, 3);
}
function isEmpty(array) {
    return array.length == 0;
}
function floodFill(point) {
    if (isColored(point)) {
        return [];
    }
    queue = [point];
    total = [point];
    while (!isEmpty(queue)) {
        const step = queue.map(fourWayNeighbors);
        queue = step.filter(isColored);
        total.concat(queue);
    }
    return total;
}
