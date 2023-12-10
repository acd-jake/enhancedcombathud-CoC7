import { CoC7PortraitPanel } from "./CoC7Portrait.js";
import { CoC7DrawerPanel } from "./CoC7DrawerPanel.js";
import { CoC7ActionPanel } from "./CoC7ActionPanel.js";
import { CoC7WeaponSets } from "./CoC7WeaponSets.js";
import { registerCoC7ECHSItems, CoC7ECHActionItems } from "./specialitems.js";
import { CoC7MovementHud } from "./CoC7MovementHud.js";

Hooks.on("argonInit", (CoreHUD) => {
    const ARGON = CoreHUD.ARGON;

    registerCoC7ECHSItems();

    CoreHUD.definePortraitPanel(CoC7PortraitPanel);
    CoreHUD.defineDrawerPanel(CoC7DrawerPanel);
    CoreHUD.defineMainPanels([
        CoC7ActionPanel,
        ARGON.PREFAB.PassTurnPanel
    ]);
    CoreHUD.defineMovementHud(CoC7MovementHud);
    CoreHUD.defineWeaponSets(CoC7WeaponSets);
    CoreHUD.defineSupportedActorTypes(["character", "npc", "creature"]);
});