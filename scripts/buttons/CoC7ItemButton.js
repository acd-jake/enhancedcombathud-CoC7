import { consumeAction } from "../utils";
export let CoC7ItemButton = null;

Hooks.on("argonInit", (CoreHUD) => {
    const ARGON = CoreHUD.ARGON;

    CoC7ItemButton = class CoC7ItemButton extends ARGON.MAIN.BUTTONS.ItemButton {
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

        async isLightSource() {
            if (game.modules.get("torch")) {
                let sceneId = canvas.scene.id;
                let tokenId = canvas.scene.tokens.find((t) => t.actorId == this.actor._id)._id;

                let uses = await game.Torch.inventory(sceneId, tokenId, this.item.name);
                return uses != 0;
            }
            return false;
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
});
