import {ModuleName} from "./utils.js";

export let CoC7WeaponSets = null;

Hooks.on("argonInit", (CoreHUD) => {
    const ARGON = CoreHUD.ARGON;

    CoC7WeaponSets = class CoC7WeaponSets extends ARGON.WeaponSets {
        constructor(...args) {
            super(...args);

            this.lastdragID = "";

            Hooks.on("renderActorSheet", (sheet, html, infos) => {
                if (sheet.actor == this.actor) {
                    const weaponelements = html.find(`li.weapon-row.item.weapon`);

                    weaponelements.each((i, element) => {
                        element.draggable = true;

                        let id = element.getAttribute("data-item-id");
                        let uuid = this.actor.items.get(id).uuid;
                        element.ondragstart = (event) => {
                            event.dataTransfer.setData("text/plain", JSON.stringify({
                                type: "Item",
                                uuid}));
                        };
                    })
                }
            });
        }

        async getDefaultSets() {
            let attacks = this.actor.items.filter((item) => item.type === "weapon");

            return {
                1: {
                    primary: attacks[0]?.uuid ?? null,
                    secondary: attacks[1]?.uuid ?? null,
                },
                2: {
                    primary: attacks[2]?.uuid ?? null,
                    secondary: attacks[3]?.uuid ?? null,
                }
            };
        }

        async _onSetChange({ sets, active }) {
        }

        get template() {
            return `modules/${ModuleName}/templates/CoC7WeaponSets.hbs`;
        }

        async getactiveSet() {
            const sets = await this._getSets();
            return sets[this.actor.getFlag("enhancedcombathud", "activeWeaponSet")];
        }
    }
});