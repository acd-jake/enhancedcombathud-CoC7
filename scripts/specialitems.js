import { ModuleName } from "./utils.js";

const ItemReplacementID = "_argonUI_";

var CoC7ECHActionItems = {};
var CoC7ECHSkillItems = {};

function registerCoC7ECHSItems() {
    CoC7ECHActionItems = {
        groupflags: {
            actiontype: "action"
        },
        CthulhuMythosCheck: {
            img: `/systems/CoC7/assets/icons/skills/cthulhu_mythos.svg`,
            name: game.i18n.localize(ModuleName + ".items.CthulhuMythosCheck.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + "items.CthulhuMythosCheck.desc"),
                check: "skill",
                checktype: "i.skill.cthulhu-mythos"
            }
        },
        DodgeCheck: {
            img: `modules/enhancedcombathud/icons/dodging.webp`,
            name: game.i18n.localize(ModuleName + ".items.DodgeCheck.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.DodgeCheck.desc"),
                check: "skill",
                checktype: "i.skill.dodge"
            }
        },
        Skills: {
            img: `modules/enhancedcombathud/icons/mighty-force.webp`,
            name: game.i18n.localize(ModuleName + ".items.Skills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.Skills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    openskills: true
                }
            }
        },
    }

    CoC7ECHSkillItems = {
        groupflags: {
            actiontype: "action"
        },
        AcademicSkills: {
            name: game.i18n.localize(ModuleName + ".items.AcademicSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.AcademicSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['anthropology', 'archaeology', 'history', 'science-']
                }
            }
        },
        ArtCraftSkills: {
            name: game.i18n.localize(ModuleName + ".items.ArtCraftSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.ArtCraftSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['art-craft-']
                }
            }
        },
        AthleticSkills: {
            name: game.i18n.localize(ModuleName + ".items.AthleticSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.AthleticSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['climb', 'jump', 'swim']
                }
            }
        },
        DeceiveSkills: {
            name: game.i18n.localize(ModuleName + ".items.DeceiveSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.DeceiveSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['fast-talk', 'disguise', 'sleight-of-hand']
                }
            }
        },
        MedicalSkills: {
            name: game.i18n.localize(ModuleName + ".items.MedicalSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.MedicalSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['first-aid', 'medicine']
                }
            }
        },
        NatureTransportSkills: {
            name: game.i18n.localize(ModuleName + ".items.NatureTransportSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.NatureTransportSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['drive-auto', 'track-', 'natural-world','navigate',  'pilot', 'ride', 'survival']
                }
            }
        },
        NoticeSkills: {
            name: game.i18n.localize(ModuleName + ".items.NoticeSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.NoticeSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['spot-hidden', 'listen']
                }
            }
        },
        PsychologySkills: {
            name: game.i18n.localize(ModuleName + ".items.PsychologySkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.PsychologySkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['psychology', 'psychoanalysis', 'hypnosis']
                }
            }
        },
        ResearchSkills: {
            name: game.i18n.localize(ModuleName + ".items.ResearchSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.ResearchSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['law', 'library-use', 'accounting']
                }
            }
        },
        ScienceSkills: {
            name: game.i18n.localize(ModuleName + ".items.ScienceSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.ScienceSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['science-']
                }
            }
        },
        SocialSkills: {
            name: game.i18n.localize(ModuleName + ".items.SocialSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.SocialSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['charm', 'intimidate', 'fast-talk', 'persuade','credit-rating']
                }
            }
        },
        StealthSkills: {
            name: game.i18n.localize(ModuleName + ".items.StealthSkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.StealthSkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['stealth', 'locksmith']
                }
            }
        },
        TechnologySkills: {
            name: game.i18n.localize(ModuleName + ".items.TechnologySkills.name"),
            type: "base",
            system: {
                description: game.i18n.localize(ModuleName + ".items.TechnologySkills.name.desc")
            },
            flags: {
                [ModuleName]: {
                    showskills: true,
                    skillIds: ['mechanical-repair', 'electrical-repair', 'electronics', 'operate-heavy-machinery']
                }
            }
        }
    }

    //some preparation
    function prepareItems(items) {
        for (let itemset of [items]) {
            for (let itemkey of Object.keys(itemset)) {
                if (itemkey != "groupflags") {
                    itemset[itemkey].flags = { ...itemset[itemkey].flags };
                    itemset[itemkey].flags[ModuleName] = { ...itemset.groupflags, ...itemset[itemkey].flags[ModuleName] };

                    let ReplacementItem = game.items.find(item => item.name == ItemReplacementID + itemkey);

                    if (ReplacementItem) {
                        itemset[itemkey].system.description = ReplacementItem.system.description;
                    }
                }
            }

            delete itemset.groupflags;
        }
    }


    prepareItems(CoC7ECHActionItems);
    prepareItems(CoC7ECHSkillItems);
};

export { registerCoC7ECHSItems, CoC7ECHActionItems, CoC7ECHSkillItems }