# Interactive Project Globe Embed

This repository contains a standalone HTML snippet (`globe-embed.html`) you can paste into a Webflow "Embed" element to show an interactive, spinnable globe dotted with project markers.

## How to test the snippet in a code editor

1. Open the project in your preferred code editor (for example, VS Code).
2. Use the editor's "Open with Live Server" feature or any static file server to preview `globe-embed.html` in a browser.
   - If you do not have a server extension, you can also double-click the file to open it directly in a modern browser.
3. Interact with the globe in the preview window—drag to spin, scroll to zoom, and click the highlighted markers to see the popups.

When you make changes, simply refresh the browser tab to see them reflected immediately.

## Embedding in Webflow

1. In Webflow, add an **Embed** element to your page.
2. Copy the entire contents of `globe-embed.html` (including the `<style>` and `<script>` blocks).
3. Paste the code into the Embed element and publish/preview your page to interact with the globe.

You can customize the project data by editing the `projectData` array near the bottom of the file before copying it into Webflow.
