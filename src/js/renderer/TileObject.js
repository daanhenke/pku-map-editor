export class TileObject {
    constructor(name, layerImages, offset) {
        this.name = name;
        this.layerImages = layerImages;
        this.offset = offset;
    }

    render(x, y, canvasController) {
        let layerList = ['floorLayer', 'backgroundObjectLayer', 'foregroundObjectLayer'];

        for (let i in layerList) {
            if (this.layerImages.hasOwnProperty(layerList[i])) {
                canvasController.getLayer(layerList[i]).getContext('2d').drawImage(this.layerImages[layerList[i]], x + this.offset.x, y + this.offset.y);
            }
        }
    }

    renderOverlay(x, y, overlayLayer) {
        let layerList = ['floorLayer', 'backgroundObjectLayer', 'foregroundObjectLayer'];

        for (let i in layerList) {
            if (this.layerImages.hasOwnProperty(layerList[i])) {
                overlayLayer.getContext('2d').drawImage(this.layerImages[layerList[i]], x + this.offset.x, y + this.offset.y);
            }
        }
    }

    static fromDefaultStructure(name, src, layers, offset) {
        return new Promise((masterResolve) => {
            let layerImages = {};
            let promiseList = [];
            for (let i in layers) {
                promiseList.push(new Promise((resolve) => {
                    let img = new Image();
                    img.src = src + layers[i] + '.png';
                    img.onload = function () {
                        layerImages[layers[i] + "Layer"] = img;
                        resolve();
                    }
                }));

                Promise.all(promiseList).then(() => {
                    masterResolve(new TileObject(name, layerImages, offset));
                })
            }
        });
    }

    static async fromJSON(json) {
        return await TileObject.fromDefaultStructure(json.name, json.src, json.layers, json.offset);
    }
}