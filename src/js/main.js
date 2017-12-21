import {CanvasController} from "./editor/CanvasController";
import {Zone} from "./renderer/Zone";
import {TileObject} from "./renderer/TileObject";
import {EditorDnD} from "./editor/EditorDnD";

window.addEventListener('load', async function () {
    let game = {};

    game.canvasController = new CanvasController(document.querySelector('#canvasParent'));
    game.canvasController.setCanvasSize(16 * 100, 16 * 100);
    game.zone = new Zone();
    game.dnd = new EditorDnD([
        {
            'name': 'Tree',
            'src': 'img/tileobjs/tree/',
            'layers': ['backgroundObject', 'foregroundObject'],
            'offset': {
                'x': -16,
                'y': -32
            }
        }
    ], game.canvasController, game.zone);

    window.game = game;

    function frame() {
        requestAnimationFrame(frame);

        window.game.canvasController.clearAll();

        window.game.zone.render(window.game.canvasController);

        if (window.game.dnd.doDrawOverlayTile)
            window.game.dnd.tiles[window.game.dnd.currentTile].renderOverlay(window.game.dnd.overlayTileX * 16, window.game.dnd.overlayTileY * 16, window.game.canvasController.getLayer('overlayLayer'));

        window.game.canvasController.drawRaster();
    }

    frame();
});