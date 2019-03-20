class FpsCounter {

    constructor() {
        this.drawCalls = 0;
        this.lastFpsUpdate = Date.now();
        this.fps = 0; // updated every ~second
    }

    onUpdate = () => {
        
        var lastUpdate = this.lastFpsUpdate;
        var now = Date.now();

        var elapsedSeconds = (now - lastUpdate) / 1000;
        if (elapsedSeconds >= 1) {
            var fps = this.drawCalls / elapsedSeconds;
            this.fps = Math.round(fps);
            this.drawCalls = 0;
            this.lastFpsUpdate = now;
        }
    }

    onRender = () => {
        this.drawCalls += 1;
    }
}

export default FpsCounter;