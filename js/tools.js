function zip(...arrays) {
    // e.g. zip([[1,2,3],[4,5,6]]) --> [[1,4],[2,5],[3,6]]
    return arrays[0].map(function (_, i) {
        return arrays.map(function (array) { return array[i] })
    });
}

function all(array) {
    return array.reduce(function (a, b) { return a && !!b }, true)
}

Array.prototype.all = all
Array.prototype.zip = zip

export function getLine(start, end) {
    const result = []
    function setPixel(x, y) {
        result.push(new Vector2(x, y))
    }
    start = floor(start)
    end = floor(end)
    function plotLine(x0, y0, x1, y1) {
        var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
        var dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
        var err = dx + dy, e2;                                   /* error value e_xy */

        for (; ;) {                                                          /* loop */
            setPixel(x0, y0);
            if (x0 == x1 && y0 == y1) break;
            e2 = 2 * err;
            if (e2 >= dy) { err += dy; x0 += sx; }                        /* x step */
            if (e2 <= dx) { err += dx; y0 += sy; }                        /* y step */
        }
    }
    plotLine(start.x, start.y, end.x, end.y)
    return result
}
import { Vector2 } from "./engino/engino/Utilities.js";
export function floor(point) {
    point = new Vector2(Math.floor(point.x), Math.floor(point.y));
    return point;
}