class Player {
    constructor() {
        this.pos = new Vec2(1, 1);
        this.speed = new Vec2(0, 100);
    }
    render() {
        context.fillRect(this.pos.x, this.pos.y, 100, 100);
    }
    tick(delta) {
        this.pos.x = delta * this.speed.x;
        this.pos.y = delta * this.speed.y;
    }
}
