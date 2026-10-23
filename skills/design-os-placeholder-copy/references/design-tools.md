# Reading and editing designs

Designers bring work to this skill as a Figma link, a design canvas (for example Claude Design), or a screenshot. The copy rules are the same everywhere. What differs is how you read the design and whether you can write into it.

## The one rule for editing

Change text content only. Don't restyle, move, resize, rename, reorder, or delete layers. Don't detach component instances. Don't add new layers unless the designer asks. Designers own the layout, and an unexpected visual change costs them more time than the copy saves.

Show the paste-ready copy and get the designer's yes before any edit (SKILL.md step 5), and keep a record of each layer's previous text so any change can be reverted.

## Which tools you'll have

| Input | Reading | Writing | If missing |
|---|---|---|---|
| Figma link | Figma MCP server (`get_design_context`, `get_screenshot`) | Figma MCP server (`use_figma`), with edit access to the file | Deliver paste-ready copy |
| Design canvas | The canvas itself, where your agent has one | Edit the canvas directly | Deliver paste-ready copy |
| Screenshot | Read it as an image | Not possible | Paste-ready is the deliverable |

Check what's actually available in the session rather than assuming. If your agent defers tool loading, search for the Figma tools first. If the designer wants the copy filled in and there's no way to edit the design, say so in one line and deliver paste-ready copy.

## Figma links

**Reading.** Use the Figma MCP server's `get_design_context` and `get_screenshot` on the node in the link (the `node-id` in the URL, with `-` converted to `:`). Use the screenshot to understand the screen and the design context to find the actual text layers. Only work with text layers that exist in the returned data. If the link points to a whole page or a very large frame, ask which frame or flow to focus on.

**Writing.** Before any `use_figma` call, load the Figma MCP server's `figma-use` guidance (the `figma-use` skill if your agent has it installed, otherwise the `skill://figma/figma-use/SKILL.md` resource). Then, for each text layer:

1. Find the node by its ID from the design context, and confirm its current text still matches what you read. If it doesn't, stop and re-read; the designer may have edited it.
2. Load every font the node uses before changing its text (`figma.loadFontAsync` for each font from `getRangeAllFontNames`). Text edits fail without this, and mixed-font layers need all of their fonts loaded.
3. Set the new text through `characters`. This keeps the layer's existing text style.
4. If a layer mixes styles inside it (for example, a bold amount within a sentence), setting `characters` flattens that. Ask before editing these layers, then reapply the styling to the matching range, or leave them for the designer to paste.

Batch the edits for one frame into a single call when you can, and report any layer that failed.

**Components.** Editing text inside a component instance sets an override on that instance, which is fine. Deeply nested instance text (IDs with several `;` segments) sometimes isn't returned by `getNodeByIdAsync`; get the nearest top-level instance by ID and walk its children to the text node instead (match on its current characters or layer name). If the text lives in a main component, changing it changes every instance across the file. Ask before editing a main component.

**Variables in Figma text.** Curly-brace variables ({company_name}) are fine in layers where the designer has already used them. Where the designer has realistic sample data, keep their sample data and list the variables in the handoff (see Formatting in SKILL.md).

**Optional annotation.** If the designer asks you to mark the edited layers for content review, add a Figma annotation to each edited text layer saying it's placeholder copy for content review. Do this only when asked.

## Design canvases

Read the design from the canvas. To fill in copy, edit the text on the canvas directly, after the same yes and following the one rule above. If the designer also wants the copy in a Figma file, repeat the edits through the Figma MCP server if it's connected, or give them the paste-ready block.

## Screenshots

You can't edit a screenshot. Read the visible text, write the copy, and deliver the paste-ready block. Don't guess at elements you can't see clearly; ask, or flag them.
