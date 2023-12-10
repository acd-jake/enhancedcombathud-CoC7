import { ModuleName, innerHTMLselector } from "./utils.js";

export let CoC7PortraitPanel = null;

Hooks.on("argonInit", (CoreHUD) => {
    const ARGON = CoreHUD.ARGON;

    CoC7PortraitPanel = class CoC7PortraitPanel extends ARGON.PORTRAIT.PortraitPanel {
        constructor(...args) {
            super(...args);

        }

        get description() {
            const { system } = this.actor;
            let occupation = "";
            let occupationItem = this.actor.items.find((i) => i.type == "occupation");
            if (occupationItem) {
                occupation = occupationItem.name;
            } else {
                occupation = system.infos.occupation;
            }
            let desc = occupation;
            if (system.infos.age)
            {
                if  (desc != "") {
                    desc = desc + ", ";
                }
                desc = desc + `${game.i18n.localize("CoC7.Age")} ${system.infos.age}`;
            }
            return desc;
        }

        get isDead() {
            if (!this.actor.system.attribs.hp.value) {
                return false;
            }

            return this.actor.system.attribs.hp.value <= 0;
        }

        async getStatBlocks() {
            let Blocks = [];

            return Blocks;
        }

        async _getButtons() {
            return [
              {
                id: "roll-initiative",
                icon: "fas fa-dice-d20",
                label: "Roll Initiative",
                onClick: (e) => this.rollInitiative({ rerollInitiative: true, createCombatants: true })
              },
              {
                id: "open-sheet",
                icon: "fas fa-suitcase",
                label: "Open Character Sheet",
                onClick: (e) => this.actor.sheet.render(true)
              },
              {
                id: "toggle-minimize",
                icon: "fas fa-caret-down",
                label: "Minimize",
                onClick: (e) => ui.ARGON.toggleMinimize()
              }
            ];
          }


          async rollInitiative() {
            const combatMode = !game.combat;
            let combat = game.combat || game.combats.viewed;

            let scene = game.scenes.current;
            let token = scene.tokens.find ((t) => t.actorId == this.actor._id);

            if (combatMode) {
                // Activate combat
                const cls = getDocumentClass("Combat");
                combat = await cls.create({ scene: scene.id });
                await combat.activate({ render: true });
            }
    
            let combatant = await game.combat.combatants.find((t) => t.tokenId == token.id);
            if (!combatant) {
                const combatNewDocs = [];
                combatNewDocs.push({
                    tokenId: token.id,
                    sceneId: scene.id,
                    actorId: this.actor._id,
                    hidden: false,
                });
                await game.combat.createEmbeddedDocuments("Combatant", combatNewDocs);
            }
    
            combatant = await game.combat.combatants.find((t) => t.tokenId == token.id);
    
            if (!combatant?.initative) {
                let initative = await this.actor.rollInitiative(false);
                await game.combat.setInitiative(combatant.id, initative);
            }
        }

        async getsideStatBlocks() {
            let Blocks = { left: [], center: [], right: [] };

            Blocks["left"].unshift([
                {
                    text: game.i18n.localize("CoC7.HP"),
                },
                {
                    isinput: false,
                    inputtype: "number",
                    text: this.actor.system.attribs.hp.value,
                },
                {
                    text: "/",
                },
                {
                    text: this.actor.system.attribs.hp.max
                }
            ]);

            Blocks["center"].unshift([
                {
                    text: game.i18n.localize("CoC7.SAN"),
                    onclick: (event) => this.actor.attributeCheck("san", event.shiftKey, {name: game.i18n.localize(ModuleName + ".items.SanityCheck.name")})
                },
                {
                    isinput: false,
                    inputtype: "number",
                    text: this.actor.system.attribs.san.value,
                    onclick: (event) => this.actor.attributeCheck("san", event.shiftKey, {name: game.i18n.localize(ModuleName + ".items.SanityCheck.name")})
                },
                {
                    text: "/",
                    onclick: (event) => this.actor.attributeCheck("san", event.shiftKey, {name: game.i18n.localize(ModuleName + ".items.SanityCheck.name")})
                },
                {
                    text: this.actor.system.attribs.san.max,
                    onclick: (event) => this.actor.attributeCheck("san", event.shiftKey, {name: game.i18n.localize(ModuleName + ".items.SanityCheck.name")})
                }
            ]);

            Blocks["right"].unshift([
                {
                    text: game.i18n.localize("CoC7.Luck"),
                    onclick: (event) => this.actor.attributeCheck("lck", event.shiftKey, {name: game.i18n.localize(ModuleName + ".items.LuckCheck.name")})
                },
                {
                    isinput: false,
                    inputtype: "number",
                    text: this.actor.system.attribs.lck.value,
                    onclick: (event) => this.actor.attributeCheck("lck", event.shiftKey, {name: game.i18n.localize(ModuleName + ".items.LuckCheck.name")})
                }
            ]);

            return Blocks;
        }

        async getConditionIcons() {
            let Icons = [];

            this.actor.effects.forEach( (effect) => {
                
                Icons.push({ img: effect.icon, description: effect.description, key: effect.name, click: () => { } });

            });
            return Icons;
        }

        async _renderInner(data) {
            await super._renderInner(data);


            const statBlocks = await this.getsideStatBlocks();
            for (const position of ["left", "right", "center"]) {
                const sb = document.createElement("div");

                sb.style = `position : absolute;${position} : 0px`;

                for (const block of statBlocks[position]) {
                    const sidesb = document.createElement("div");
                    sidesb.classList.add("portrait-stat-block");
                    sidesb.style.paddingLeft = "0.35em";
                    sidesb.style.paddingRight = "0.35em";
                    for (const stat of block) {
                        if (!stat.position) {
                            let displayer;
                            if (stat.isinput) {
                                displayer = document.createElement("input");
                                displayer.type = stat.inputtype;
                                displayer.value = stat.text;
                                displayer.style.width = "1.5em";
                                displayer.style.color = "#ffffff";
                                displayer.onchange = () => { stat.changevent(displayer.value) };
                            }
                            else {
                                displayer = document.createElement("span");
                                displayer.innerText = stat.text;
                            }
                            if (stat.onclick)
                            {
                                displayer.setAttribute("style", `cursor: pointer`);
                                displayer.onclick = stat.onclick;
                            }
                            displayer.style.color = stat.color;
                            sidesb.appendChild(displayer);
                        }
                    }
                    sb.appendChild(sidesb);
                }
                this.element.appendChild(sb);
            }

            const ConditionIcons = await this.getConditionIcons();

            if (ConditionIcons.length) {
                const IconsBar = document.createElement("div");
                IconsBar.setAttribute("style", `position:absolute;right:0;display:flex;flex-direction:column;align-self:center`);
                for (const Icon of ConditionIcons) {
                    const IconImage = document.createElement("img");
                    IconImage.setAttribute("src", Icon.img);
                    IconImage.style.width = "25px";
                    IconImage.style.borderWidth = "0px";
                    if (Icon.border) {
                        IconImage.style.borderWidth = "3px";
                        IconImage.style.color = "var(--ech-portrait-base-border)";
                    }
                    IconImage.onclick = () => { Icon.click() };
                    IconImage.setAttribute("data-tooltip", Icon.description);

                    IconsBar.appendChild(IconImage);
                }

                this.element.appendChild(IconsBar);
            }

            this.element.querySelector(".player-buttons").style.right = "0%";
        }

        async rollInjuries() {
            let table = await fromUuid("RollTable." + game.settings.get(ModuleName, "InjurieTable"));
            if (table) {
                table.draw({ roll: true, displayChat: true });
            }
        }
    }
});