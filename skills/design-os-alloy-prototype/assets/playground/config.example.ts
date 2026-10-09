/*
 * This prototype's playground. design-os-alloy-prototype writes this file
 * from the playground plan the designer approved; it's the only playground
 * file that changes per prototype.
 *
 * Group order in the panel: Scenario (presets) first, then groups in the order
 * they first appear below. Keep to: Data, States, Content, Design, Access.
 */
import { definePlayground } from "./engine";

export const playground = definePlayground({
  options: [
    // Data
    {
      type: "range",
      key: "items",
      label: "Fund offerings",
      group: "Data",
      min: 0,
      max: 50,
      default: 6,
    },
    {
      type: "toggle",
      key: "longText",
      label: "Long names",
      group: "Data",
      description: "Every other fund gets a 90-character name.",
      default: false,
    },
    {
      type: "toggle",
      key: "noPrice",
      label: "Missing prices",
      group: "Data",
      default: false,
    },
    // States
    { type: "toggle", key: "loading", label: "Loading", group: "States", default: false },
    { type: "toggle", key: "error", label: "Load error", group: "States", default: false },
    // Design
    {
      type: "choice",
      key: "density",
      label: "Row density",
      group: "Design",
      choices: {
        default: { label: "Default", description: "160px rows; logo in its own cell." },
        condensed: { label: "Condensed", description: "105px rows; logo in a circle." },
      },
      default: "default",
    },
  ],
  presets: [
    { label: "Default", values: {} },
    { label: "Empty", values: { items: 0 } },
    { label: "One", values: { items: 1 } },
    { label: "Many", values: { items: 50 } },
    { label: "Long text", values: { longText: true } },
    { label: "Error", values: { error: true } },
    { label: "Loading", values: { loading: true } },
  ],
  locks: [
    {
      key: "density",
      when: (_s, viewport) => viewport.small,
      value: "condensed",
      note: "Small screens always use condensed rows.",
    },
  ],
});
