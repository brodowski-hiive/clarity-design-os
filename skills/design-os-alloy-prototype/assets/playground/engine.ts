/*
 * Playground engine. Copied verbatim by design-os-alloy-prototype; don't edit
 * per prototype. Per-prototype settings live in ./config.ts.
 *
 * Settings are mirrored to the query string, so a link opens the exact state a
 * tester saw. `?playground=off` hides the panel for clean demos and screenshots.
 */

export interface Choice {
  label: string;
  description?: string;
}

interface BaseOption {
  key: string;
  label: string;
  /** Section heading in the panel. Options with the same group sit together, in order of first use. */
  group?: string;
  description?: string;
}

export interface ChoiceOption extends BaseOption {
  type: "choice";
  choices: Record<string, Choice>;
  default: string;
}

export interface ToggleOption extends BaseOption {
  type: "toggle";
  default: boolean;
}

export interface RangeOption extends BaseOption {
  type: "range";
  min: number;
  max: number;
  step?: number;
  unit?: string;
  default: number;
}

export type Option = ChoiceOption | ToggleOption | RangeOption;

type ValueOf<O> = O extends ChoiceOption
  ? Extract<keyof O["choices"], string>
  : O extends ToggleOption
    ? boolean
    : number;

export type SettingsOf<Os extends readonly Option[]> = {
  [O in Os[number] as O["key"]]: ValueOf<O>;
};

export type Value = string | number | boolean;
export type AnySettings = Record<string, Value>;

/** Things about the viewer's screen that can force a choice. */
export interface Viewport {
  /** Narrower than Alloy's `sm` breakpoint (640px). */
  small: boolean;
}

export interface Preset<S> {
  label: string;
  description?: string;
  values: Partial<S>;
}

export interface Lock<S> {
  key: keyof S & string;
  when: (settings: S, viewport: Viewport) => boolean;
  value: Value;
  /** Shown in the panel next to the greyed-out control. */
  note: string;
}

export interface PlaygroundConfig<Os extends readonly Option[] = readonly Option[]> {
  options: Os;
  /** One-click scenarios, shown first. Values not listed fall back to defaults. */
  presets?: Preset<SettingsOf<Os>>[];
  locks?: Lock<SettingsOf<Os>>[];
}

/** Declare a prototype's playground. `const` keeps keys and choices literal, so settings are typed. */
export function definePlayground<const Os extends readonly Option[]>(
  config: PlaygroundConfig<Os>,
): PlaygroundConfig<Os> {
  return config;
}

export function defaultsOf(config: PlaygroundConfig): AnySettings {
  return Object.fromEntries(config.options.map((o) => [o.key, o.default]));
}

function parse(option: Option, raw: string): Value | undefined {
  switch (option.type) {
    case "choice":
      return Object.hasOwn(option.choices, raw) ? raw : undefined;
    case "toggle":
      return raw === "1" ? true : raw === "0" ? false : undefined;
    case "range": {
      const n = Number(raw);
      return Number.isFinite(n) ? Math.min(Math.max(n, option.min), option.max) : undefined;
    }
  }
}

function serialize(value: Value): string {
  return typeof value === "boolean" ? (value ? "1" : "0") : String(value);
}

export function readFromUrl(config: PlaygroundConfig): AnySettings {
  const params = new URLSearchParams(globalThis.location.search);
  const settings = defaultsOf(config);
  for (const option of config.options) {
    const raw = params.get(option.key);
    const value = raw === null ? undefined : parse(option, raw);
    if (value !== undefined) {
      settings[option.key] = value;
    }
  }
  return settings;
}

export function writeToUrl(config: PlaygroundConfig, settings: AnySettings) {
  const url = new URL(globalThis.location.href);
  const defaults = defaultsOf(config);
  for (const { key } of config.options) {
    if (settings[key] === defaults[key]) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, serialize(settings[key] as Value));
    }
  }
  globalThis.history.replaceState(null, "", url);
}

export function lockFor(
  config: PlaygroundConfig,
  key: string,
  settings: AnySettings,
  viewport: Viewport,
): { value: Value; note: string } | null {
  const locks = (config.locks ?? []) as Lock<AnySettings>[];
  const lock = locks.find((l) => l.key === key && l.when(settings, viewport));
  return lock ? { value: lock.value, note: lock.note } : null;
}

/** Settings with locks applied: what the prototype renders. The tester's own pick is kept underneath. */
export function resolve(
  config: PlaygroundConfig,
  settings: AnySettings,
  viewport: Viewport,
): AnySettings {
  const resolved = { ...settings };
  for (const { key } of config.options) {
    const lock = lockFor(config, key, settings, viewport);
    if (lock) {
      resolved[key] = lock.value;
    }
  }
  return resolved;
}

/** The preset matching the current settings exactly, if any. */
export function activePreset(config: PlaygroundConfig, settings: AnySettings): string | null {
  const defaults = defaultsOf(config);
  for (const preset of (config.presets ?? []) as Preset<AnySettings>[]) {
    const target = { ...defaults, ...preset.values };
    if (config.options.every(({ key }) => target[key] === settings[key])) {
      return preset.label;
    }
  }
  return null;
}

export function hiddenByUrl(): boolean {
  return new URLSearchParams(globalThis.location.search).get("playground") === "off";
}
