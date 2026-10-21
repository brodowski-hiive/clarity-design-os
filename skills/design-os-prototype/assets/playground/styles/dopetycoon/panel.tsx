/*
 * Playground panel, dopetycoon style. Copied verbatim by design-os-prototype
 * in place of the default panel.tsx; uses the same engine.ts and provider.tsx.
 *
 * Prototype-only tool for testers, deliberately not part of the design: a retro
 * pixel "Playground.exe" window (see playground.css). Opens from a launcher in
 * the bottom-right; drag either one by its title bar, resize the window from
 * any edge or corner, or maximize it. Press ~ (tilde; backtick works too) to
 * open or close it.
 */
import {
  type PointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  activePreset,
  type AnySettings,
  defaultsOf,
  lockFor,
  type Option,
  type Preset,
} from "./engine";
import { usePlaygroundState } from "./provider";

/** Tiny pixel-art icon: each string is a row, "#" is a filled pixel. */
function PixelIcon({ rows, size = 2 }: { rows: string[]; size?: number }) {
  const width = rows[0]?.length ?? 0;
  // One 1×1 square per filled pixel, as a single path.
  const d = rows
    .flatMap((row, y) => Array.from(row.matchAll(/#/g), (m) => `M${m.index} ${y}h1v1h-1z`))
    .join("");
  return (
    <svg
      aria-hidden
      width={width * size}
      height={rows.length * size}
      viewBox={`0 0 ${width} ${rows.length}`}
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  );
}

const PLAY = ["#....", "##...", "###..", "####.", "#####", "####.", "###..", "##...", "#...."];
const MINIMIZE = [".......", ".......", ".......", ".......", ".......", "#######", "#######"];
const MAXIMIZE = ["#######", "#######", "#.....#", "#.....#", "#.....#", "#.....#", "#######"];
const RESTORE = ["..#####", "..#####", "#####.#", "#####.#", "#...###", "#...#..", "#####.."];
const CLOSE = ["##...##", "###.###", ".#####.", "..###..", ".#####.", "###.###", "##...##"];
const LOCK = [".###.", "#...#", "#...#", "#####", "##.##", "##.##", "#####"];
const GRIP = ["......#", ".......", "....#.#", ".......", "..#.#.#", ".......", "#.#.#.#"];

/** Distance from the viewport's bottom-right corner, in px. */
interface Offset {
  right: number;
  bottom: number;
}

interface Size {
  width: number;
  height: number;
}

/** Window edges and corners that can be dragged to resize. */
const EDGES = ["n", "e", "s", "w", "ne", "se", "sw", "nw"] as const;
type Edge = (typeof EDGES)[number];

const MIN_SIZE: Size = { width: 260, height: 160 };
/** Gap left around a maximized window, matching the default anchor. */
const MAXIMIZED_INSET = 24;

const clamp = (value: number, min: number, max: number) => Math.max(Math.min(value, max), min);

/** Keeps a box of the given size fully on screen. */
function clampToViewport(offset: Offset, { width, height }: Size): Offset {
  return {
    right: clamp(offset.right, 0, Math.max(window.innerWidth - width, 0)),
    bottom: clamp(offset.bottom, 0, Math.max(window.innerHeight - height, 0)),
  };
}

/** Shrinks a size to fit the viewport. */
function fitSize({ width, height }: Size): Size {
  return {
    width: Math.min(width, window.innerWidth),
    height: Math.min(height, window.innerHeight),
  };
}

/** Layout size, not getBoundingClientRect: the open animation scales the window. */
function layoutSize(el: HTMLElement): Size {
  return { width: el.offsetWidth, height: el.offsetHeight };
}

/**
 * Drag the launcher or the window (by its title bar) out of the way, and resize
 * the window from any edge or corner. Both share one bottom-right anchor, so the
 * window opens where the button was left and the button returns where the
 * window was. A press that moves less than 4px is still a click.
 */
function useWindowFrame(open: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  // A callback ref, so one hook can hold either the launcher's div or the window's aside.
  const setRef = useCallback((el: HTMLElement | null) => {
    ref.current = el;
  }, []);
  const [offset, setOffset] = useState<Offset>({ right: 24, bottom: 24 });
  /** The window's size once resized; null means the stylesheet's default. */
  const [size, setSize] = useState<Size | null>(null);
  /** The frame to go back to when un-maximizing; null when not maximized. */
  const [restore, setRestore] = useState<{ offset: Offset; size: Size | null } | null>(null);
  const drag = useRef<{ x: number; y: number; start: Offset; moved: boolean } | null>(null);
  const resize = useRef<{ edge: Edge; x: number; y: number; start: Offset; size: Size } | null>(
    null,
  );
  const justDragged = useRef(false);

  // Re-fit after switching between button and window, and when the viewport shrinks.
  useLayoutEffect(() => {
    const refit = () => {
      if (!ref.current) {
        return;
      }
      const el = ref.current;
      const fitted = open && size ? fitSize(size) : null;
      if (fitted && (fitted.width !== size?.width || fitted.height !== size?.height)) {
        setSize(fitted);
      }
      setOffset((current) => clampToViewport(current, fitted ?? layoutSize(el)));
    };
    refit();
    window.addEventListener("resize", refit);
    return () => window.removeEventListener("resize", refit);
  }, [open, size]);

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    // Window controls stay plain buttons.
    if (e.button !== 0 || (e.target as HTMLElement).closest(".retro-nodrag")) {
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
    setOffset(
      clampToViewport(
        { right: d.start.right - dx, bottom: d.start.bottom - dy },
        layoutSize(ref.current),
      ),
    );
  };

  const onPointerUp = () => {
    justDragged.current = drag.current?.moved ?? false;
    drag.current = null;
  };

  /** True once, right after a drag, so releasing a dragged button doesn't open it. */
  const consumeDrag = useCallback(() => {
    const dragged = justDragged.current;
    justDragged.current = false;
    return dragged;
  }, []);

  /**
   * Pointer handlers for one resize edge. The window is anchored bottom-right,
   * so dragging the right or bottom edge moves the anchor by however much the
   * window grew; the top and left edges just change the size.
   */
  const resizeHandle = (edge: Edge) => ({
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      if (e.button !== 0 || !ref.current) {
        return;
      }
      e.preventDefault(); // No text selection while dragging.
      resize.current = {
        edge,
        x: e.clientX,
        y: e.clientY,
        start: offset,
        size: layoutSize(ref.current),
      };
      setRestore(null);
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const r = resize.current;
      if (!r) {
        return;
      }
      const dx = e.clientX - r.x;
      const dy = e.clientY - r.y;
      let { width, height } = r.size;
      if (r.edge.includes("e")) {
        width = clamp(width + dx, MIN_SIZE.width, width + r.start.right);
      } else if (r.edge.includes("w")) {
        width = clamp(width - dx, MIN_SIZE.width, window.innerWidth - r.start.right);
      }
      if (r.edge.includes("s")) {
        height = clamp(height + dy, MIN_SIZE.height, height + r.start.bottom);
      } else if (r.edge.includes("n")) {
        height = clamp(height - dy, MIN_SIZE.height, window.innerHeight - r.start.bottom);
      }
      setSize({ width, height });
      setOffset({
        right: r.edge.includes("e") ? r.start.right - (width - r.size.width) : r.start.right,
        bottom: r.edge.includes("s") ? r.start.bottom - (height - r.size.height) : r.start.bottom,
      });
    },
    onPointerUp: () => {
      resize.current = null;
    },
    onPointerCancel: () => {
      resize.current = null;
    },
  });

  /** Fill the screen (less a small inset), or go back to the size and spot from before. */
  const toggleMaximized = () => {
    if (restore) {
      setOffset(restore.offset);
      setSize(restore.size);
      setRestore(null);
      return;
    }
    setRestore({ offset, size });
    setOffset({ right: MAXIMIZED_INSET, bottom: MAXIMIZED_INSET });
    setSize({
      width: Math.max(window.innerWidth - 2 * MAXIMIZED_INSET, MIN_SIZE.width),
      height: Math.max(window.innerHeight - 2 * MAXIMIZED_INSET, MIN_SIZE.height),
    });
  };

  return {
    ref: setRef,
    style: { right: offset.right, bottom: offset.bottom },
    // Once resized, the window's size wins over the stylesheet's default and caps.
    frameStyle: size ? { ...size, maxWidth: "none", maxHeight: "none" } : {},
    handle: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
    resizeHandle,
    maximized: restore !== null,
    toggleMaximized,
    consumeDrag,
  };
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("input, textarea, select, [contenteditable='true']"))
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

/** One radio row: a square pixel radio, a label, and an optional one-line description. */
function RadioRow({
  name,
  label,
  description,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="retro-option">
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span aria-hidden className="retro-radio" />
      <span className="retro-option-text">
        <span className="retro-option-label">{label}</span>
        {description ? <span className="retro-option-description">{description}</span> : null}
      </span>
    </label>
  );
}

function Control({ option }: { option: Option }) {
  const { config, settings, resolved, viewport, update } = usePlaygroundState();
  const lock = lockFor(config, option.key, settings, viewport);
  const value = resolved[option.key];
  const id = `retro-${option.key}`;

  let control;
  switch (option.type) {
    case "choice":
      control = (
        <div role="radiogroup" aria-label={option.label}>
          {Object.entries(option.choices).map(([key, choice]) => (
            <RadioRow
              key={key}
              name={id}
              label={choice.label}
              description={choice.description}
              checked={value === key}
              onChange={() => update({ [option.key]: key })}
            />
          ))}
        </div>
      );
      break;
    case "toggle":
      control = (
        <label className="retro-option" htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            role="switch"
            checked={Boolean(value)}
            onChange={(e) => update({ [option.key]: e.target.checked })}
          />
          <span aria-hidden className="retro-check" />
          <span className="retro-option-text">
            <span className="retro-option-label">{option.label}</span>
            {option.description ? (
              <span className="retro-option-description">{option.description}</span>
            ) : null}
          </span>
        </label>
      );
      break;
    case "range":
      control = (
        <div className="retro-range">
          <label htmlFor={id} className="retro-option-text">
            <span className="retro-option-label">
              {option.label}: {String(value)}
              {option.unit ?? ""}
            </span>
            {option.description ? (
              <span className="retro-option-description">{option.description}</span>
            ) : null}
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
          <span aria-hidden className="retro-range-scale">
            <span>{option.min}</span>
            <span>{option.max}</span>
          </span>
        </div>
      );
      break;
  }

  return (
    <fieldset className="retro-control" disabled={Boolean(lock)}>
      {option.type === "choice" ? (
        <legend className="retro-control-label">{option.label}</legend>
      ) : null}
      {control}
      {lock ? (
        <p className="retro-note">
          <PixelIcon rows={LOCK} />
          {lock.note}
        </p>
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
    <section className="retro-group" data-accent={0}>
      <h3 className="retro-group-label">Scenario</h3>
      <div role="radiogroup" aria-label="Scenario">
        {presets.map((preset) => (
          <RadioRow
            key={preset.label}
            name="retro-preset"
            label={preset.label}
            description={preset.description}
            checked={active === preset.label}
            onChange={() => update({ ...defaults, ...preset.values } as AnySettings)}
          />
        ))}
      </div>
    </section>
  );
}

export function PlaygroundPanel() {
  const { config, reset } = usePlaygroundState();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const frame = useWindowFrame(open);
  const hasPresets = (config.presets ?? []).length > 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.key === "~" || e.key === "`") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !isTyping(e.target)
      ) {
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
      <div ref={frame.ref} className="retro retro-root" style={frame.style}>
        <button
          type="button"
          className="retro-button"
          aria-label="Open playground"
          {...frame.handle}
          onClick={() => {
            if (!frame.consumeDrag()) {
              setOpen(true);
            }
          }}
        >
          <PixelIcon rows={PLAY} />
          Playground
        </button>
      </div>
    );
  }

  return (
    <aside
      ref={frame.ref}
      aria-label="Playground"
      className="retro retro-root retro-window"
      style={{ ...frame.style, ...frame.frameStyle }}
    >
      {EDGES.map((edge) => (
        <div
          key={edge}
          aria-hidden
          className="retro-resize"
          data-edge={edge}
          {...frame.resizeHandle(edge)}
        >
          {edge === "se" ? <PixelIcon rows={GRIP} /> : null}
        </div>
      ))}
      <header
        className="retro-titlebar"
        {...frame.handle}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest(".retro-nodrag")) {
            frame.toggleMaximized();
          }
        }}
      >
        <h2>Playground.exe</h2>
        <div className="retro-controls retro-nodrag">
          <button type="button" aria-label="Minimize playground" onClick={() => setOpen(false)}>
            <PixelIcon rows={MINIMIZE} />
          </button>
          <button
            type="button"
            aria-label={frame.maximized ? "Restore playground" : "Maximize playground"}
            onClick={() => frame.toggleMaximized()}
          >
            <PixelIcon rows={frame.maximized ? RESTORE : MAXIMIZE} />
          </button>
          <button type="button" aria-label="Close playground" onClick={() => setOpen(false)}>
            <PixelIcon rows={CLOSE} />
          </button>
        </div>
      </header>
      <p className="retro-shortcut">~ opens and closes</p>

      <div className="retro-body">
        <Presets />
        {groupsOf(config.options).map(([name, options], index) => (
          <section
            key={name}
            className="retro-group"
            data-accent={(index + (hasPresets ? 1 : 0)) % 4}
          >
            <h3 className="retro-group-label">{name}</h3>
            {options.map((option) => (
              <Control key={option.key} option={option} />
            ))}
          </section>
        ))}
      </div>

      <div className="retro-toast" role="status" hidden={!copied}>
        <strong>Link copied</strong>
        Anyone who opens it sees this prototype with these exact settings.
      </div>
      <footer className="retro-foot">
        <button type="button" className="retro-foot-button" onClick={copyLink}>
          Copy link
        </button>
        <button type="button" className="retro-foot-button" onClick={reset}>
          Reset
        </button>
      </footer>
    </aside>
  );
}
