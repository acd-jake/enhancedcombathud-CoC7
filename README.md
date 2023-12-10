# Argon - Call of Cthulhu 7th Edition
An implementation of the [Argon - Combat HUD](https://foundryvtt.com/packages/enhancedcombathud) (by [TheRipper93](https://theripper93.com/) and [Mouse0270](https://github.com/mouse0270)) for the [Call of Cthulhu 7th Edition system](https://github.com/Miskatonic-Investigative-Society/CoC7-FoundryVTT). The Argon Combat HUD (CORE) module is required for this module to work.

![image](https://github.com/acd-jake/enhancedcombathud-CoC7/assets/67855941/2e37aa34-65ae-475d-bb3b-52c5638b7d3c)
<sub>All icons used in this project are from [Game-icons.net](https://github.com/Saibot393/enhancedcombathud-mutant-year-zero/blob/main/game-icons.net), used under the [CC BY 3.0 license](https://creativecommons.org/licenses/by/3.0/) or are already contained in the Argon Combat HUD (CORE) module or the CoC7 system.</sub>

## The documentation for the core argon features can be found [here](https://api.theripper93.com/modulewiki/enhancedcombathud/free).
This module adjusts various Argon features for the Call of Cthulhu 7th Edition system:
- **Portrait**
  -  The current and max scores are displayed for the **hit points** and sanity of the character as well as the current **luck** score.
  -  Clicking on the **sanity** or **luck** score will invoke a corresponding check.
- **Characteristics**
  - The characteristics of the character are displayed with the three percentile scores for the regular, hard and extreme checks.
    
    ![image](https://github.com/acd-jake/enhancedcombathud-CoC7/assets/67855941/fcc22990-7cfb-4ae5-a28d-97bb14a7ac4b)
  - Clicking on the name of the characteristic will invoke a regular check and clicking on a percentile score will invoke a check with the corresponding difficulty.
- **Weapon Sets** have a rudamental Drag&Drop system for weapons.
- **Tooltips** will display properties for skills.
- **Item Buttons** for firearms display resources (bullets or charges) in the top left corner and consume them when used. A weapon cylinder is displayed in the top right corner. It can be used to reload or unload a weapon in much the same way as the corresponding icon on the CoC7 character sheet.
- The **Skill Button** opens an accordion panel with the character's skills. The skills are grouped in a - hopefully - meaningful way.
  
  ![image](https://github.com/acd-jake/enhancedcombathud-CoC7/assets/67855941/ab3ef84b-3538-406a-bee0-427d5494fbbe)

## Interaction with other modules (strictly optional)
If the module [Torch](https://github.com/League-of-Foundry-Developers/torch) is installed, this module interacts with it. It checks if an item in possession of the character corresponds to a light source configured in the torch module. Clicking on the Item Button for that item will light or extinguish the light source.

![image](https://github.com/acd-jake/enhancedcombathud-CoC7/assets/67855941/2167720d-dc04-4e14-90c7-c4cb0eb433c1)

## Languages:
The module contains an English and a German translation. If you want additional languages to be supported [let me know](https://github.com/acd-jake/enhancedcombathud-CoC7/issues).

**If you have suggestions, questions, or requests for additional features please [let me know](https://github.com/acd-jake/enhancedcombathud-CoC7/issues).**
