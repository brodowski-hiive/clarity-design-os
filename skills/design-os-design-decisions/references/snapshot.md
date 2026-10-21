# The guidelines snapshot

`guidelines-snapshot.md` is a copy of the Active guidelines that ships with the plugin. It lets skills work without Notion and gives the guidelines a git history. The Notion log is still the source of truth; the snapshot is only as fresh as the last plugin release.

## When to refresh

- Before every release of clarity-design-os (it's on the CONTRIBUTING merge checklist).
- When a designer asks for it.

## How

1. Query the log for `Status = Active`.
2. Write `guidelines-snapshot.md`: the header block below, then one section per Area in the order the log lists them, entries sorted by ID. Each entry is one line:
   `- **DG-14** Use a ghost button for secondary actions in dialogs. *Why:* keeps one primary action per dialog. *Scope:* System. [Log](<entry link>)`
   Add `*Applies when:*` only when it narrows the rule.
3. Header block:
   ```
   # Design guidelines snapshot

   Active guidelines exported from the Design guidelines log on <YYYY-MM-DD>: <N> entries. The log is the source of truth; read it live when you can (references/log.md).
   ```
4. **Inside the clarity-design-os repo:** write the file on the release branch and show the diff. **Elsewhere:** give the file to the designer with the commands to copy it in. Never commit or push without a yes.
