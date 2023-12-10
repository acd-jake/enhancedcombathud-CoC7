import { ModuleName, getTooltipDetails } from "./utils.js";

export let CoC7DrawerPanel = null;

Hooks.on("argonInit", (CoreHUD) => {
    const ARGON = CoreHUD.ARGON;

    CoC7DrawerPanel = class CoC7DrawerPanel extends ARGON.DRAWER.DrawerPanel {
        constructor(...args) {
            super(...args);
        }
        get categories() {
            let characteristics = this.actor.system.characteristics;

            let sortableCharacteristics = [];
            for (let characteristic in characteristics) {
                sortableCharacteristics.push([characteristic, characteristics[characteristic]]);
            }
            sortableCharacteristics.sort((a, b) => (game.i18n.localize(a[1].label) < game.i18n.localize(b[1].label) ? -1 : 1));
            let tempCharacteristics = {};
            sortableCharacteristics.forEach(function (item) {
                tempCharacteristics[item[0]] = item[1];
            });
            characteristics = tempCharacteristics;


            let skills = this.actor.system.skills;
            let sortableSkills = [];
            for (let skill in skills) {
                sortableSkills.push([skill, skills[skill]]);
            }
            sortableSkills.sort((a, b) => (a[0] < b[0] ? -1 : 1));
            let tempSkills = {};
            sortableSkills.forEach(function (item) {
                tempSkills[item[0]] = item[1];
            });
            skills = tempSkills;

            const characteristicsButtons = Object.keys(characteristics).map((characteristic) => {
                const characteristicData = characteristics[characteristic];

                let valueLabel = characteristicData.value;

                return new TooltipDrawerButton([
                    {
                        label: game.i18n.localize(characteristics[characteristic].label),
                        onClick: (event) => { this.actor.characteristicCheck(characteristic, event.shiftKey); },
                        style: "width: 13em;grid-column: 1;",
                    },
                    {
                        label: valueLabel + " %",
                        onClick: () => { this.actor.characteristicCheck(characteristic, event.shiftKey) },
                        style: "grid-column: 2;width: 3em;"
                    },
                    {
                        label: Math.floor(valueLabel / 2) + " %",
                        onClick: () => { this.actor.characteristicCheck(characteristic, event.shiftKey, { difficulty: 2 }) },
                        style: "grid-column: 3;width: 3em;"
                    },
                    {
                        label: Math.floor(valueLabel / 5) + " %",
                        onClick: () => { this.actor.characteristicCheck(characteristic, event.shiftKey, { difficulty: 3 }) },
                        style: "grid-column: 4;width: 3em;"
                    }
                ],
                    characteristicData,
                    "characteristic"
                );
            });

            let skillsButtons = [];

            if (game.settings.get(ModuleName, "ShowSkillsWithAttribs")) {
                skillsButtons = Object.keys(skills).map((skill) => {
                    const skillData = this.actor.system.skills[skill];

                    let valueLabel = skillData.value;
                    let skilldId = skillData.cocid;

                    return new TooltipDrawerButton([
                        {
                            label: skill,
                            onClick: () => { this.actor.skillCheck({ name: skilldId }, event.shiftKey) },
                            style: `width: 13em;grid-column: 1;`,
                            hasTooltip: () => true
                        },
                        {
                            label: valueLabel + " %",
                            onClick: () => { this.actor.skillCheck({ name: skilldId }, event.shiftKey) },
                            style: `width: 3em;grid-column: 2;`
                        },
                        {
                            label: Math.floor(valueLabel / 2) + " %",
                            onClick: () => { this.actor.skillCheck({ name: skilldId }, event.shiftKey, { difficulty: 2 }) },
                            style: `width: 3em;grid-column: 3;`
                        },
                        {
                            label: Math.floor(valueLabel / 5) + " %",
                            onClick: () => { this.actor.skillCheck({ name: skilldId }, event.shiftKey, { difficulty: 3 }) },
                            style: `width: 3em;grid-column: 4;`
                        }
                    ],
                        this.actor.items.get(skillData.foundryID),
                        "skill"
                    );
                });
            }

            let returncategories = [];

            if (characteristicsButtons.length) {
                returncategories.push({
                    gridCols: "7fr 2fr",
                    captions: [
                        {
                            label: game.i18n.localize("CoC7.Characteristics"),
                        },
                        {
                            label: "",
                        },
                        {
                            label: "",
                        },
                        {
                            label: "",
                        }
                    ],
                    buttons: characteristicsButtons
                });
            }

            if (skillsButtons.length) {
                returncategories.push({
                    gridCols: "7fr 2fr",
                    captions: [
                        {
                            label: game.i18n.localize("CoC7.Skills"),
                        },
                        {
                            label: "",
                        },
                        {
                            label: "",
                        },
                        {
                            label: "",
                        }
                    ],
                    buttons: skillsButtons,
                });
            }

            return returncategories;
        }

        get title() {
            let title = game.i18n.localize("CoC7.Characteristics");
            if (game.settings.get(ModuleName, "ShowSkillsWithAttribs")) {
                title = title + ` & ${game.i18n.localize("CoC7.Skills")}`;
            }
            return title;
        }

        async _renderInner() {
            await super._renderInner();

            const togglebar = this.element.querySelectorAll("li.ability-title")[0];
            togglebar.style.display = "flex";
            togglebar.style.flexDirection = "row";
        }
    }

    class TooltipDrawerButton extends ARGON.DRAWER.DrawerButton {

        constructor(buttons, item, type) {
            super(buttons);
            this.item = item;
            this.type = type;
        }

        get hasTooltip() {
            return true;
        }

        get tooltipOrientation() {
            return TooltipManager.TOOLTIP_DIRECTIONS.RIGHT;
        }

        async getTooltipData() {
            const tooltipData = await getTooltipDetails(this.item, this.type);
            return tooltipData;
        }
    }
});