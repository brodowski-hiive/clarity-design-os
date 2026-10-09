/*
 * Playground provider and hook. Copied verbatim by design-os-prototype.
 *
 *   <PlaygroundProvider config={playground}>  // in client.tsx, around <App />
 *   const s = usePlayground(playground);      // in any component
 */
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  type AnySettings,
  defaultsOf,
  hiddenByUrl,
  type Option,
  type PlaygroundConfig,
  readFromUrl,
  resolve,
  type SettingsOf,
  type Viewport,
  writeToUrl,
} from "./engine";
import { PlaygroundPanel } from "./panel";

const SMALL_SCREEN = "(width < 40rem)";

function subscribeToSmallScreen(onChange: () => void) {
  const query = globalThis.matchMedia(SMALL_SCREEN);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useViewport(): Viewport {
  const small = useSyncExternalStore(
    subscribeToSmallScreen,
    () => globalThis.matchMedia(SMALL_SCREEN).matches,
    () => false,
  );
  return { small };
}

export interface PlaygroundState {
  config: PlaygroundConfig;
  /** What the tester picked. */
  settings: AnySettings;
  /** What the prototype renders (locks applied). */
  resolved: AnySettings;
  viewport: Viewport;
  update: (patch: AnySettings) => void;
  reset: () => void;
}

const PlaygroundContext = createContext<PlaygroundState | null>(null);

export function PlaygroundProvider({
  config,
  children,
}: {
  config: PlaygroundConfig;
  children: ReactNode;
}) {
  const [settings, setSettings] = useState(() => readFromUrl(config));
  const viewport = useViewport();

  const update = useCallback(
    (patch: AnySettings) => {
      setSettings((prev) => {
        const next = { ...prev, ...patch };
        writeToUrl(config, next);
        return next;
      });
    },
    [config],
  );

  const reset = useCallback(() => {
    const next = defaultsOf(config);
    writeToUrl(config, next);
    setSettings(next);
  }, [config]);

  const state = useMemo<PlaygroundState>(
    () => ({
      config,
      settings,
      resolved: resolve(config, settings, viewport),
      viewport,
      update,
      reset,
    }),
    [config, settings, viewport, update, reset],
  );

  return (
    <PlaygroundContext.Provider value={state}>
      {children}
      {hiddenByUrl() ? null : <PlaygroundPanel />}
    </PlaygroundContext.Provider>
  );
}

/** The settings the prototype should render, typed from the config you pass in. */
export function usePlayground<const Os extends readonly Option[]>(
  _config: PlaygroundConfig<Os>,
): SettingsOf<Os> {
  const state = useContext(PlaygroundContext);
  if (!state) {
    throw new Error("usePlayground must be used inside <PlaygroundProvider>");
  }
  return state.resolved as SettingsOf<Os>;
}

/** Full playground state, for the panel itself. */
export function usePlaygroundState(): PlaygroundState {
  const state = useContext(PlaygroundContext);
  if (!state) {
    throw new Error("usePlaygroundState must be used inside <PlaygroundProvider>");
  }
  return state;
}
