/*
 * Playground panel. Copied verbatim by design-os-alloy-prototype.
 *
 * Prototype-only tool for testers, deliberately not part of the design: an
 * onyx, monospace "dev tool" window in Clarity colors (see playground.css).
 * Opens from a launcher in the bottom-right; both can be dragged out of the
 * way. Press ~ (tilde; backtick works too) to open or close it.
 */
import {
  type PointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { activePreset, type AnySettings, defaultsOf, lockFor, type Option, type Preset } from "./engine";
import { usePlaygroundState } from "./provider";

interface Offset {
  right: number;
  bottom: number;
}

function clampToViewport(offset: Offset, el: HTMLElement): Offset {
  const { offsetWidth: width, offsetHeight: height } = el;
  return {
    right: Math.min(Math.max(offset.right, 0), Math.max(window.innerWidth - width, 0)),
    bottom: Math.min(Math.max(offset.bottom, 0), Math.max(window.innerHeight - height, 0)),
  };
}

/** Drag the launcher or the window by its title bar. A press that moves under 4px is still a click. */
function useDraggable(open: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const setRef = useCallback((el: HTMLElement | null) => {
    ref.current = el;
  }, []);
  const [offset, setOffset] = useState<Offset>({ right: 20, bottom: 20 });
  const drag = useRef<{ x: number; y: number; start: Offset; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  useLayoutEffect(() => {
    const refit = () => {
      if (ref.current) {
        const el = ref.current;
        setOffset((current) => clampToViewport(current, el));
      }
    };
    refit();
    window.addEventListener("resize", refit);
    return () => window.removeEventListener("resize", refit);
  }, [open]);

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest(".pg-nodrag")) {
      return;
    }
    drag.current = { x: e.clientX, y: e.clientY, start: offset, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || !ref.current) {
      return;
    }
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 4) {
      return;
    }
    d.moved = true;
    setOffset(clampToViewport({ right: d.start.right - dx, bottom: d.start.bottom - dy }, ref.current));
  };

  const onPointerUp = () => {
    justDragged.current = drag.current?.moved ?? false;
    drag.current = null;
  };

  const consumeDrag = useCallback(() => {
    const dragged = justDragged.current;
    justDragged.current = false;
    return dragged;
  }, []);

  return {
    ref: setRef,
    style: { right: offset.right, bottom: offset.bottom },
    handle: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
    consumeDrag,
  };
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("input, textarea, select, [contenteditable='true']"))
  );
}

function LockIcon() {
  return (
    <svg aria-hidden width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
      <path d="M2 5V3.5a3 3 0 0 1 6 0V5h1v7H1V5h1Zm1.5 0h3V3.5a1.5 1.5 0 0 0-3 0V5Z" />
    </svg>
  );
}

function groupsOf(options: readonly Option[]) {
  const groups = new Map<string, Option[]>();
  for (const option of options) {
    const name = option.group ?? "Settings";
    groups.set(name, [...(groups.get(name) ?? []), option]);
  }
  return [...groups.entries()];
}

function Control({ option }: { option: Option }) {
  const { config, settings, resolved, viewport, update } = usePlaygroundState();
  const lock = lockFor(config, option.key, settings, viewport);
  const value = resolved[option.key];
  const id = `pg-${option.key}`;

  let control;
  switch (option.type) {
    case "choice":
      control = (
        <div className="pg-chips" role="radiogroup" aria-label={option.label}>
          {Object.entries(option.choices).map(([key, choice]) => (
            <label key={key} className="pg-chip" title={choice.description}>
              <input
                type="radio"
                name={id}
                value={key}
                checked={value === key}
                onChange={() => update({ [option.key]: key })}
              />
              <span>{choice.label}</span>
            </label>
          ))}
        </div>
      );
      break;
    case "toggle":
      control = (
        <label className="pg-toggle" htmlFor={id}>
          <span>{option.label}</span>
          <input
            id={id}
            type="checkbox"
            role="switch"
            checked={Boolean(value)}
            onChange={(e) => update({ [option.key]: e.target.checked })}
          />
          <span aria-hidden className="pg-switch" />
        </label>
      );
      break;
    case "range":
      control = (
        <div className="pg-range">
          <label htmlFor={id} className="pg-range-head">
            <span>{option.label}</span>
            <output htmlFor={id}>
              {String(value)}
              {option.unit ?? ""}
            </output>
          </label>
          <input
            id={id}
            type="range"
            min={option.min}
            max={option.max}
            step={option.step ?? 1}
            value={Number(value)}
            onChange={(e) => update({ [option.key]: Number(e.target.value) })}
          />
          <div className="pg-range-ends" aria-hidden>
            <span>{option.min}</span>
            <span>{option.max}</span>
          </div>
        </div>
      );
      break;
  }

  const selected =
    option.type === "choice" ? option.choices[String(value)]?.description : option.description;

  return (
    <fieldset
      className={option.type === "choice" ? "pg-control pg-control-choice" : "pg-control"}
      disabled={Boolean(lock)}
    >
      {option.type === "choice" ? <legend className="pg-control-label">{option.label}</legend> : null}
      {control}
      {lock ? (
        <p className="pg-note">
          <LockIcon /> {lock.note}
        </p>
      ) : selected || option.type === "choice" ? (
        <p className="pg-hint">{selected}</p>
      ) : null}
    </fieldset>
  );
}

function Presets() {
  const { config, settings, update } = usePlaygroundState();
  const presets = (config.presets ?? []) as Preset<AnySettings>[];
  if (presets.length === 0) {
    return null;
  }
  const active = activePreset(config, settings);
  const defaults = defaultsOf(config);
  return (
    <section className="pg-group">
      <h3 className="pg-group-label">Scenario</h3>
      <div className="pg-chips" role="radiogroup" aria-label="Scenario">
        {presets.map((preset) => (
          <label key={preset.label} className="pg-chip" title={preset.description}>
            <input
              type="radio"
              name="pg-preset"
              checked={active === preset.label}
              onChange={() => update({ ...defaults, ...preset.values } as AnySettings)}
            />
            <span>{preset.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}

export function PlaygroundPanel() {
  const { config, reset } = usePlaygroundState();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const draggable = useDraggable(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "~" || e.key === "`") && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target)) {
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(globalThis.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch {
      // Clipboard blocked (some embedded previews): fall back to a prompt the tester can copy from.
      globalThis.prompt("Copy this link:", globalThis.location.href);
    }
  };

  if (!open) {
    return (
      <div ref={draggable.ref} className="pg pg-root" style={draggable.style}>
        <button
          type="button"
          className="pg-launcher"
          aria-label="Open playground"
          {...draggable.handle}
          onClick={() => {
            if (!draggable.consumeDrag()) {
              setOpen(true);
            }
          }}
        >
          <span aria-hidden className="pg-dot" />
          Playground
        </button>
      </div>
    );
  }

  return (
    <aside
      ref={draggable.ref}
      aria-label="Playground"
      className="pg pg-root pg-window"
      style={draggable.style}
    >
      <header className="pg-bar" {...draggable.handle}>
        <h2>
          <span aria-hidden className="pg-dot" />
          Playground
        </h2>
        <div className="pg-bar-end">
          <span className="pg-shortcut">~ opens and closes</span>
          <button
            type="button"
            className="pg-icon pg-nodrag"
            aria-label="Close playground"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
      </header>
      <div className="pg-body">
        <Presets />
        {groupsOf(config.options).map(([name, options]) => (
          <section key={name} className="pg-group">
            <h3 className="pg-group-label">{name}</h3>
            {options.map((option) => (
              <Control key={option.key} option={option} />
            ))}
          </section>
        ))}
      </div>
      <div className="pg-toast" role="status" hidden={!copied}>
        <strong>Link copied</strong>
        Anyone who opens it sees this prototype with these exact settings.
      </div>
      <footer className="pg-foot">
        <button type="button" className="pg-link" onClick={copyLink}>
          Copy link
        </button>
        <button type="button" className="pg-link" onClick={reset}>
          Reset
        </button>
      </footer>
    </aside>
  );
}
