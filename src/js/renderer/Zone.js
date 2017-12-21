export class Zone {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.name = 'Unnamed zone';

        this.tileObjectLayerList = ['floorLayer', 'backgroundObjectLayer', 'foregroundObjectLayer'];
        this.tileObjects = [];

        for (let i = 0; i < this.width; i++) {
            let row = [];

            for (let j = 0; j < this.height; j++) {
                row.push(null);
            }

            this.tileObjects.push(row);
        }

    }

    render(canvasController) {
        for (let j = 0; j < this.height; j++) {
            for (let i = this.width - 1; i >= 0; i--) {
                if (this.tileObjects[i][j] !== null)
                    this.tileObjects[i][j].render(i * 16, j * 16, canvasController);
            }
        }
    }
}