# SyncBin
A lightweight, real-time, pastebin web app using markdown with optional per-note authentication.
Multiple users will be able to edit notes simultaneously and see their updates in real-time.

## Tech Stack
- **Frontend**: [ReactJS](https://react.dev/) using [TypeScript](https://www.typescriptlang.org/docs/)
- **Database**: [Firebase Realtime Database](https://firebase.google.com/docs/database)
- **Markdown Engine**: [react-markdown](https://github.com/remarkjs/react-markdown)
- **Hosting**: [DigitalOcean Droplet](https://www.digitalocean.com/products/droplets)

## Development Roadmap
1. **Initialize Project**
    - ~~Create ReactJS Project~~
    - ~~Install Dependencies~~
    - ~~Create initial README.md~~
2. **Firebase Setup**
    - ~~Create Firebase Project~~
    - ~~Create Realtime Database~~
    - ~~Setup .env File~~
    - Integrate Firebase into ReactJS Project
3. **Routing Pages**
    - Landing Page
    - Note View
4. **Landing Page**
    - Button for Creating a New Note
        - Generate Unique 6 Character noteID
        - Write Note to Database
        - Navigate to *"/:noteID"* in edit mode (no password prompt)
    - Authentication Options
        - No Password
        - Password for Editing
            - Edit Password Textbox
        - Password for Editing & Viewing
            - Edit Password Textbox
            - View Password Textbox
            - Same Password Checkbox (Condenses 2 Textboxes into 1) 
5. **Note Page**
    - Page Loading
        - Load in View Mode
        - Check for View Password
    - Switching to Edit Mode
        - Check for Edit Password
    - Live Updates with Firebase
6. CSS Styling
    - Style Landing Page
    - Style Note Page
    - Check Responsiveness
7. Testing
    - Test Thoroughly
    - Fix Bugs
8. Deployment
    - Spin up DigitalOcean Droplet
    - Purchase Domain
    - Set DNS Records
    - Setup SSL Certificate with nginx + certbot
    
## Optional Features
- Note Expiration and Renewals
- Dark/Light Mode
- Version History
- Copy & Paste Link Button