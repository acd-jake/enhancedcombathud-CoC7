export const ModuleName = "enhancedcombathud-CoC7";

async function getTooltipDetails(item, itemType) {
	let title, description, skillmodifiers, attributemodifiers, validskills, category, subtitle, range, damage, bonus, quantity, comment, requirement;
	let propertiesLabel = "MYZ.REQUIREMENT";
	let properties = [];
	let materialComponents = "";

	let details = [];

	if (itemType == "characteristic") {
		subtitle = game.i18n.localize(`CoC7.Characteristic`);

		title = game.i18n.localize(item.label);
		description = game.i18n.localize(`${ModuleName}.${item.short}.tooltip`);

		return { title, description, subtitle, details, properties, propertiesLabel, footerText: comment };
	}

	if (!item || !item.system) return;

	title = item.name;
	description = item.system.description.value;
	itemType = item.type;
	skillmodifiers = [];
	attributemodifiers = [];
	properties = [];

	switch (itemType) {
		case "skill":
			subtitle = game.i18n.localize(`CoC7.Skill`);
			for (let [key, value] of Object.entries(item.system.properties)) {
				let prop = value ? game.i18n.localize(`${ModuleName}.skillProperties.${key}`) : undefined;
				if (prop) details.push({ label: prop });
			}
			break;
	}

	return { title, description, subtitle, details, properties, propertiesLabel, footerText: comment };
}

function sanitize(string) {
	let parser = new DOMParser();

	let html = parser.parseFromString(string, 'text/html');

	return html.body.innerText;
}

function innerHTMLselector(html, selector, innerHTML) {
	let returnElement;

	html.querySelectorAll(selector).forEach((element) => { if (element.innerHTML == innerHTML) returnElement = element });

	return returnElement;
}

function consumeAction(type) {
	switch (type) {
		case "action":
			ui.ARGON.components.main[0].actionsUsed++;
			ui.ARGON.components.main[0].isActionUsed = true;
			ui.ARGON.components.main[0].updateActionUse();
			break;
	}
}

export { innerHTMLselector, getTooltipDetails, consumeAction };