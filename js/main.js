let player = new Player()

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
context.fillStyle = "#FF0000"

function main() {
    context.strokeRect(0, 0, 100, 100)
    // const p1 = new Player()
    // p1.render()
    floodFill(new Vec2(1, 1))
}


function main_loop(delta) {
    delta /= 1000
    context.clearRect(0, 0, canvas.clientWidth, canvas.height)
    player.tick(delta)
    player.render(context)
    window.requestAnimationFrame(main_loop)
}
function* cartProd(a, b) {
    for (let index = 0; index < a; index++) {
        for (let index = 0; index < b; index++) {
            yield [a, b]
        }
    }
}

function fourWayNeighbors(point) {
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    return directions.map((offset) => {
        return new Vec2(point.x + offset[0], point.y + offset[1])
    })
}

function arrayEqual(a, b) {
    return all(zip(a, b).map((p) => p[0] == p[1]))
}

function isColored(point) {
    const white = [255, 255, 255]
    const pointValue = getColor(point)
    return !arrayEqual(pointValue, white)
}

function getColor(point) {
    return Array.from(context.getImageData(point.x, point.y, 1, 1)).slice(0, 3)
}

function isEmpty(array) {
    return array.length == 0
}

function floodFill(point) {
    if (isColored(point)) {
        return []
    }
    queue = [point]
    total = [point]
    while (!isEmpty(queue)) {
        const step = queue.map(fourWayNeighbors)
        queue = step.filter(isColored)
        total.concat(queue)
    }
    return total
}

main()


function init() {
    return context
}
