<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/b110c34c-b6dd-4baf-863c-ae9cad4163b2

## Run Locally

**Prerequisites:**  Node.js

1. Install front‑end dependencies:
   ```bash
   npm install
   ```
2. Install and configure the backend server:
   ```bash
   cd server
   npm install
   ```
3. Create or update `.env.local` in the project root with your keys:
   ```dotenv
   GEMINI_API_KEY=PLACEHOLDER_API_KEY
   MONGODB_URI=mongodb+srv://TOKEN:SACHIN123@cluster0.r8t4hqs.mongodb.net/<your‑dbname>?retryWrites=true&w=majority
   ```
   Replace `<your‑dbname>` with the name of the database you created in Atlas.

4. seed an admin user and some demo data in the `admins` collection. You can either insert through Atlas UI or run the provided script:
   ```bash
   # from project root (after installing server deps)
   npx ts-node server/seed.ts
   ```
   This will create a default admin with username `admin` and password `token_admin_2025` so you can log in immediately.

5. Start both servers (either in two terminals).
   You can run them separately or use the convenience script added to `package.json`:
   ```bash
   # standalone
   npm run dev             # frontend
   npm run server          # backend (from project root)

   # or run both at once
   npm run dev:all         # uses concurrently to launch frontend + backend
   ```

   The backend automatically handles Atlas `+srv` URIs, but if your
   network blocks SRV/DNS lookups it will fall back to a hard‑coded
   three‑shard connection string.  Should you still encounter
   `ECONNREFUSED _mongodb._tcp.cluster0...` errors, consider copying the
   *non‑SRV* connection string from the Atlas dashboard and putting it in
   `MONGODB_URI` instead (see the “no +srv” option in the connection dialog).

6. Open your browser at `http://localhost:3000` and login as an admin using the credentials stored in your database.

```