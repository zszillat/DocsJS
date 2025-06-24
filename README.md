# SyncBin
A lightweight, real-time, pastebin web app using markdown with optional per-note authentication.
Multiple users will be able to edit notes simultaneously and see their updates in real-time.

## Tech Stack
- **Frontend**: [ReactJS](https://react.dev/) using [TypeScript](https://www.typescriptlang.org/docs/)
- **Database**: [Firestore](https://firebase.google.com/docs/firestore)
- **Text Editor**: [TipTap](https://tiptap.dev/docs)
- **Realtime & CRDT**: [Yjs](https://docs.yjs.dev/) + [y-websocket](https://docs.yjs.dev/ecosystem/connection-provider/y-websocket) (for live sync and cursors)
- **Hosting**: [DigitalOcean Droplet](https://www.digitalocean.com/products/droplets)

## Development Roadmap
**Phase 1**: Initialization ✅
- Initialize React + TypeScript Project ✅
- Install Dependencies & Create `README.md` ✅
- Page Routing ✅
- Firebase RTDB Setup & Integration ✅

**Phase 2**: Note Creation
- Landing Page Setup ✅
- Note Creation
- Note Authentication (Write Protection, Read/Write Protection)

**Phase 3**: Notes & Collaboration
- Note Page Setup
- Embed TipTap Text Editor
- Real Time Sync Between Users
- Conflict-Free Merging (Cursor Transforms)

**Phase 4**: Markdown & Styling
- WYSIWYG Markdown Implementation
- Site CSS Styling
- Responsive Layouts

**Phase 5**: Quality Assurance
- Testing
- Bug Fixes

**Phase 6**: Deployment
- Setup Digital Ocean Droplet
- Obtain Domain ✅
- Point DNS Records 
- Setup SSL Certificate

    
## Optional Features
- Note Expiration and Renewals
- Dark/Light Mode
- Version History
- Copy & Paste Link Button

## Changelog
- **2025-06-20**: Pivoted to Yjs + Firestore for robust CRDT syncing and cursor handling 