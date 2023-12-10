import { CoC7ECHActionItems, CoC7ECHSkillItems } from "./specialitems.js";
import { ModuleName, getTooltipDetails, consumeAction } from "./utils.js";

export let CoC7ActionPanel = null;

Hooks.on("argonInit", (CoreHUD) => {
    const ARGON = CoreHUD.ARGON;

    function toggleSnAdrawer() {
        ui.ARGON.components.drawer.element.querySelector(".ability-toggle").click();
    }

    CoC7ActionPanel = class CoC7ActionPanel extends ARGON.MAIN.ActionPanel {

        constructor(...args) {
            super(...args);
            this.actionsUsed = 0;
        }

        get label() {
            return ModuleName + ".hud.actions.name";
        }

        get maxActions() {
            if (this.actor.system.special?.attacksPerRound) {
                return this.actor.system.special.attacksPerRound;
            }

            return 1;
        }

        get currentActions() {
            return this.maxActions - this.actionsUsed;
        }

        _onNewRound(combat) {
            this.actionsUsed = 0;
            this.updateActionUse();
        }

        async _getButtons() {
            const specialActions = Object.values(CoC7ECHActionItems);
            const skillGroups = Object.values(CoC7ECHSkillItems);

            let buttons = [];

            buttons.push(new CoC7WeaponItemButton({ item: null, isWeaponSet: true, isPrimary: true }));
            buttons.push(new CoC7WeaponItemButton({ item: null, isWeaponSet: true, isPrimary: false }));
            buttons.push(new ARGON.MAIN.BUTTONS.SplitButton(new CoC7SpecialActionButton(specialActions[0]), 
                new CoC7SpecialActionButton(specialActions[1])));
            buttons.push(new CoC7ItemButtonPanelButton({ type: "weapon", color: 0 }));
            buttons.push(new CoC7ItemButtonPanelButton({ type: "item", color: 0 }));
            if (game.settings.get(ModuleName, "ShowSkills")) {
                buttons.push(new CoC7SkillButtonPanelButton(specialActions[2], skillGroups)); // Social Skills
            }

            return buttons.filter(button => button.items == undefined || button.items.length);
        }
    }

    class CoC7ItemButton extends ARGON.MAIN.BUTTONS.ItemButton {
        constructor(...args) {
            super(...args);
        }

        async getData() {
            let data = await super.getData();

            data.hasAmmo = this.item != null && this.item.system.bullets != null && this.item.system.bullets != "";

            return data;
        }

        get hasTooltip() {
            return true;
        }

        get targets() {

            if (this.item.type == "weapon") {
                return 1;
            }
            return null;

        }

        async getTooltipData() {
            const tooltipData = await getTooltipDetails(this.item, this.actor.system.creatureType);
            return tooltipData;
        }

        get usesAmmo() {
            return this.item != null && this.item.system.bullets != null && this.item.system.bullets != "";
        }

        get quantity() {
            if (this.usesAmmo) {
                return this.item.getBulletLeft();
            }

            return null;
        }

        async _onLeftClick(event) {
            var used = false;

            if (this.item.type == "item") {

                // Render the chat card template
                const token = this.actor.token;
                const templateData = {
                    actor: this.actor,
                    tokenId: token?.uuid || null,
                    item: this.item,
                    data: await this.item.getChatData(),
                    flavor: this.item.system.description.value || this.name,
                };
                const html = await renderTemplate(`modules/${ModuleName}/templates/item-card.hbs`, templateData);
                // Create the ChatMessage data object
                const chatData = {
                    user: game.user.id,
                    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
                    content: html,
                    flavor: this.item.system.description.value || this.name,
                    speaker: ChatMessage.getSpeaker({
                        actor: this.actor,
                        token,
                    }),
                    whisper: [],
                    flags: { "core.canPopout": true },
                };
                await ChatMessage.create(chatData);
                used = true;
            }

            if (this.item.type == "talent") {
                this.item.sendToChat();
            }


            if (used) {
                CoC7ItemButton.consumeActionEconomy(this.item);
            }
        }

        static consumeActionEconomy(item) {
            let consumeID = undefined;

            if (item.type == "weapon") {
                consumeAction("action");
            }

            if (item.type == "item") {
                consumeAction("action");
            }

            if (item.type == "skill") {
                consumeAction("action");
            }
        }

        static abilityactiontype(item) {
            if (item.system.description.includes("(R)")) {
                return "react";
            }

            if (item.system.description.includes("(E)")) {
                return "";
            }

            return "action";
        }


        get template() {
            return `modules/${ModuleName}/templates/CoC7ItemButton.hbs`;
        }

    }

    class COC7LightSourceButton extends CoC7ItemButton {
        constructor(...args) {
            super(...args);

        }

        async _onLeftClick(event) {
            if (game.modules.get("torch")) {
                let sceneId = canvas.scene.id;
                let tokenId = canvas.scene.tokens.find((t) => t.actorId == this.actor._id)._id;

                if ((await game.Torch.currentSource(sceneId, tokenId)) != this.item.name) {
                    await game.Torch.extinguish(sceneId, tokenId);
                    await game.Torch.selectSource(sceneId, tokenId, this.item.name);
                }
                if (!(await game.Torch.sourceExhausted(sceneId, tokenId, this.item.name))) {
                    await game.Torch.toggle(sceneId, tokenId);
                } else {
                    ui.notifications.warn(game.i18n.localize("torch.help.supplyExhausted.body"));
                }

                let state = await game.Torch.currentState(sceneId, tokenId);

                // Render the chat card template
                const token = this.actor.token;
                const templateData = {
                    actor: this.actor,
                    tokenId: token?.uuid || null,
                    item: this.item,
                    data: await this.item.getChatData(),
                    flavor: this.item.system.description.value || this.name,
                };
                const html = await renderTemplate(`modules/${ModuleName}/templates/item-card.hbs`, templateData);
                // Create the ChatMessage data object
                const chatData = {
                    user: game.user.id,
                    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
                    content: html,
                    flavor: this.item.system.description.value || this.name,
                    speaker: ChatMessage.getSpeaker({
                        actor: this.actor,
                        token,
                    }),
                    whisper: [],
                    flags: { "core.canPopout": true },
                };
                //await ChatMessage.create(chatData);
                CoC7ItemButton.consumeActionEconomy(this.item);
                return;
            }

            return super._onLeftClick(event);
        }
    }

    class CoC7SkillItemButton extends CoC7ItemButton {
        constructor(...args) {
            super(...args);

        }

        async _onLeftClick(event) {
            CoC7ItemButton.consumeActionEconomy(this.item);
            const skillData = Object.values(this.actor.system.skills).find((t) => t.foundryID== this.item._id);
            let skilldId = skillData.cocid;

            let retval = await this.actor.skillCheck({ name: skilldId }, event.shiftKey);
            return retval;
        }
    }

    class CoC7WeaponItemButton extends CoC7ItemButton {
        constructor(...args) {
            super(...args);

            Hooks.on("updateActor", (actor, changes, infos, sender) => {
                if (this.quantity != null) {
                    if (this.actor == actor) {
                        this.render();
                    }
                }
            });

        }

        async _onPreLeftClick(event) {
            if (event.srcElement.parentElement.className == 'reload-weapon') {
                if (event.shiftKey) {
                    this.item.reload();
                }
                else {
                    this.item.addBullet();
                }
                CoC7ItemButton.consumeActionEconomy(this.item);
                return;
            }

            return await super._onPreLeftClick(event);
        }

        async _onRightClick(event) {
            if (event.srcElement.parentElement.className == 'reload-weapon') {
                if (event.shiftKey) {
                    this.item.setBullets(0);
                }
                else {
                    this.item.setBullets(this.item.getBulletLeft() - 1);
                }
                CoC7ItemButton.consumeActionEconomy(this.item);
                return;
            }
            return await super._onRightClick(event);

        }

        async _onLeftClick(event) {

            if (!this.usesAmmo || this.item.getBulletLeft() > 0) {
                CoC7ItemButton.consumeActionEconomy(this.item);
                let retval = await this.actor.weaponCheck({ id: this.item._id }, event.shiftKey);
                return retval;
            } else {
                ui.notifications.warn(game.i18n.localize("CoC7.OutOfAmmo"));
                return;
            }

        }

    }

    class CoC7ButtonPanelButton extends ARGON.MAIN.BUTTONS.ButtonPanelButton {
        constructor({ type, subtype, color }) {
            super();
            this.type = type;
            this.color = color;

        }

        get colorScheme() {
            return this.color;
        }



        get template() {
            return `modules/${ModuleName}/templates/CoC7ButtonPanelButton.hbs`;
        }

    }

    class CoC7SkillButtonPanelButton extends CoC7ButtonPanelButton {
        constructor(specialItems, categories) {
            super({ type: "skill", color: 0 });
            this.item = new CONFIG.Item.documentClass(specialItems, {
                parent: this.actor,
            });
            this.categories = categories;
        }

        get label() {
            return this.item.name;
        }

        get icon() {
            return this.item.img;
        }

        get hasTooltip() {
            return true;
        }

        async _getPanel() {

            let categories = [];

            this.categories = this.categories.sort((a, b) => {
                if (a.name<b.name) {
                  return -1;
                } else if (a.name>b.name) {
                  return 1;
                }
                // a must be equal to b
                return 0;
              });

            this.categories.forEach((category) => {
                let skills = [];
                category?.flags[ModuleName]?.skillIds.forEach(skillId => {
                    const skill = this.actor.items.filter((item) => item.type == "skill" && item.flags['CoC7']?.cocidFlag.id.startsWith(`i.skill.${skillId}`));
                    skill.forEach((skillItem) => {
                        skills.push(skillItem);
                    });

                })
                skills = skills.sort((a, b) => {
                    if (a.name<b.name) {
                      return -1;
                    } else if (a.name>b.name) {
                      return 1;
                    }
                    // a must be equal to b
                    return 0;
                  });

                categories.push(new CoCSkillAccordionPanelCategory({
                    label: category.name,
                    buttons: skills.map(item => {
                        switch (this.type) {
                            case "skill":
                                return new CoC7SkillItemButton({ item });
                        }
                    })
                }));
            });

            let panel = {
                accordionPanelCategories: categories
            };
            //return new ARGON.MAIN.BUTTON_PANELS.ButtonPanel(panel);
            return new ARGON.MAIN.BUTTON_PANELS.ACCORDION.AccordionPanel(panel);
        }

    }

    class CoCSkillAccordionPanelCategory extends ARGON.MAIN.BUTTON_PANELS.ACCORDION.AccordionPanelCategory {

        get template() {
            return `modules/${ModuleName}/templates/CoC7SkillAccordionPanelCategory.hbs`;
        }

    }

    class CoC7ItemButtonPanelButton extends CoC7ButtonPanelButton {
        constructor({ type, subtype, color }) {
            super({ type, subtype, color });
            this.type = type;
            this.color = color;

            Hooks.on("updateActor", (actor, changes, infos, sender) => {
                if (this.quantity != null) {
                    if (this.actor == actor) {
                        this.render();
                    }
                }
            });
        }

        get quantity() {
            return null;
        }

        get label() {
            return ModuleName + ".types.item." + this.type;
        }

        get icon() {
            switch (this.type) {
                case "item": return "modules/enhancedcombathud/icons/svg/backpack.svg";
                case "weapon": return "modules/enhancedcombathud/icons/svg/crossed-swords.svg";
            }
        }

        async getData() {
            const prevData = super.getData();

            const quantity = this.quantity;
            return {
                ...prevData,
                quantity: quantity,
                hasQuantity: Number.isNumeric(quantity),
                label: this.label
            }
        }

        async isLightSource(item) {
            if (game.modules.get("torch")) {
                let sceneId = canvas.scene.id;
                let tokenId = canvas.scene.tokens.find((t) => t.actorId == this.actor._id)._id;

                let uses = await game.Torch.inventory(sceneId, tokenId, item.name);
                return uses != 0;
            }
            return false;
        }

        async _getPanel() {
            let panel = {
                buttons: this.actor.items.filter(item => item.type == this.type).map(item => {
                    switch (this.type) {
                        case "item":
                            if (this.isLightSource(item)) {
                                return new COC7LightSourceButton({ item });
                            }
                            return new CoC7ItemButton({ item });
                        case "weapon":
                            return new CoC7WeaponItemButton({ item });
                    }
                })
            };
            return new ARGON.MAIN.BUTTON_PANELS.ButtonPanel(panel);
        }

    }


    class CoC7SpecialActionButton extends ARGON.MAIN.BUTTONS.ActionButton {
        constructor(specialItem) {
            super();
            this.item = new CONFIG.Item.documentClass(specialItem, {
                parent: this.actor,
            });
        }

        get label() {
            return this.item.name;
        }

        get icon() {
            return this.item.img;
        }

        get hasTooltip() {
            return true;
        }


        get colorScheme() {
            switch (this.item?.flags[ModuleName]?.actiontype) {
                case "action":
                    return 0;
                    break;
                case "maneuver":
                    return 1;
                    break;
                case "react":
                    return 3;
                    break;
            }
            return 0;
        }

        async getTooltipData() {
            const tooltipData = await getTooltipDetails(this.item, this.actor.system.creatureType);
            return tooltipData;
        }

        async _onLeftClick(event) {
            var used = true;

            const item = this.item;

            if (this.item.system.skill) {
                if (this.actor.system.creatureType == "robot") {
                    openRollDialoge("skill", this.item.system.skillRobot, this.actor);
                }
                else {
                    openRollDialoge("skill", this.item.system.skill, this.actor);
                }
            }

            if (this.item.system.check == "attribs") {
                this.actor.attributeCheck(this.item.system.checktype, event.shiftKey);
            }

            if (this.item.system.check == "skill") {
                this.actor.skillCheck({ name: this.item.system.checktype }, event.shiftKey)           
            }

            console.log(this.item);
            
            if (this.item.flags[ModuleName]?.openskills) {
                toggleSnAdrawer();
            }

            if (used) {
                CoC7SpecialActionButton.consumeActionEconomy(this.item);
            }
        }

        static consumeActionEconomy(item) {
            consumeAction(item.flags[ModuleName].actiontype);
        }
    }
});