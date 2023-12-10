export let CoC7MovementHud = null;

Hooks.on("argonInit", (CoreHUD) => {
    const ARGON = CoreHUD.ARGON;

    CoC7MovementHud = class CoC7MovementHud extends ARGON.MovementHud {

        get movementMax() {
            return this.actor.system.attribs.mov.value;
        }
    }
});