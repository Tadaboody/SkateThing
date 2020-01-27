function main() {
    const canvas = document.getElementById("canvas")
    const context = canvas.getContext("2d")
    context.drawRect(100, 100, 100, 100)
    context.fillStyle = "#FF0000"
    context.fill()
}

main()