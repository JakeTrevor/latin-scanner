import { replaceForcedQuantities } from "./forceQuantity";
import { scanLine, scanParagraph } from "./scan";
import { scanSettingsObject } from "./types";

export { scanLine, scanParagraph };
export { replaceForcedQuantities };

export let defaultSettings: scanSettingsObject = {
  meter: "Hexameter",
  elegaic: false,
};
