let player = new Player()

const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
context.fillStyle = "#FF0000"

function main() {
    window.requestAnimationFrame(main_loop)
}


function main_loop(delta) {
    delta /= 1000
    context.clearRect(0, 0, canvas.clientWidth, canvas.height)
    player.tick(delta)
    player.render(context)
    window.requestAnimationFrame(main_loop)
}

main()


function init() {
    return context
}
