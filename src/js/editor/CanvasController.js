export class CanvasController {
    constructor(parent) {
        this.layerList = ['floorLayer', 'backgroundObjectLayer', 'foregroundObjectLayer', 'entityLayer', 'overlayLayer'];
        this.layers = {};

        for (let i = 0; i < this.layerList.length; i++) {
            let layer = document.createElement('canvas');
            layer.id = this.layerList[i];
            parent.appendChild(layer);

            this.layers[this.layerList[i]] = layer;
        }
    }

    setCanvasSize(width, height) {
        for (let i = 0; i < this.layerList.length; i++) {
            this.layers[this.layerList[i]].width = width;
            this.layers[this.layerList[i]].height = height;
        }
    }

    getLayer(name) {
        if (this.layerList.indexOf(name) !== -1)
            return this.layers[this.layerList[this.layerList.indexOf(name)]];
    }

    drawRaster() {
        let overlay = this.getLayer('overlayLayer');
        let context = overlay.getContext('2d');

        context.fillStyle = 'gray';

        for (let i = 15; i < overlay.width; i += 16) {
            context.fillRect(i, 0, 1, overlay.height);
        }

        for (let j = 15; j < overlay.height; j += 16) {
            context.fillRect(0, j, overlay.width, 1);
        }
    }

    clearAll() {
        for (let i = 0; i < this.layerList.length; i++) {
            this.layers[this.layerList[i]].getContext('2d').clearRect(0, 0, this.layers[this.layerList[i]].width, this.layers[this.layerList[i]].height);
        }
    }
}