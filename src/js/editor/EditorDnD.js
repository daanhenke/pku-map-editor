import {TileObject} from "../renderer/TileObject";

export class EditorDnD {
    constructor(tileList, canvasController, zone) {
        this.tiles = [];

        this.loadTiles(tileList);

        this.currentTile = 0;
        this.canvasController = canvasController;
        this.zone = zone;

        this.overlayTileX = 0;
        this.overlayTileY = 0;

        this.doDrawOverlayTile = false;

        let canvas = this.canvasController.getLayer('overlayLayer');
        let self = this;
        canvas.addEventListener('click', function (event) {
            let rect = canvas.getBoundingClientRect(),
                scaleX = canvas.width / rect.width,
                scaleY = canvas.height / rect.height;

            let x = (event.clientX - rect.left) * scaleX,
                y = (event.clientY - rect.top) * scaleY;

            x = Math.floor(x / 16);
            y = Math.floor(y / 16);

            self.zone.tileObjects[x][y] = self.tiles[self.currentTile]
        });

        canvas.addEventListener('mousemove', function (event) {
            let rect = canvas.getBoundingClientRect(),
                scaleX = canvas.width / rect.width,
                scaleY = canvas.height / rect.height;

            let x = (event.clientX - rect.left) * scaleX,
                y = (event.clientY - rect.top) * scaleY;

            self.overlayTileX = Math.floor(x / 16);
            self.overlayTileY = Math.floor(y / 16);
        });

        canvas.addEventListener('mouseenter', function (ev) {
            self.doDrawOverlayTile = true;
        });

        canvas.addEventListener('mouseleave', function (ev) {
            self.doDrawOverlayTile = false;
        })
    }

    async loadTiles(tileList) {
        for (let i in tileList)
            this.tiles.push(await TileObject.fromJSON(tileList[i]));
    }
}