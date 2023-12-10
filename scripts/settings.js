import { ModuleName } from "./utils.js";

Hooks.once("init", () => {  // game.settings.get(cModuleName, "")
    //Settings
    //world
    game.settings.register(ModuleName, "ShowSkills", {
        name: game.i18n.localize(ModuleName + ".Settings.ShowSkills.name"),
        hint: game.i18n.localize(ModuleName + ".Settings.ShowSkills.descrp"),
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
        requiresReload: true
    });

    game.settings.register(ModuleName, "ShowSkillsWithAttribs", {
        name: game.i18n.localize(ModuleName + ".Settings.ShowSkillsWithAttribs.name"),
        hint: game.i18n.localize(ModuleName + ".Settings.ShowSkillsWithAttribs.descrp"),
        scope: "client",
        config: true,
        type: Boolean,
        default: false,
        requiresReload: true
    });

});