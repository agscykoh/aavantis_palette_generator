# Aavanti’s Palette Generator

Hi there! This is a cute little 3-colour palette generator that uses the golden angle to find an accent colour and a softer support colour from the base colour of your choice.

It’s made with React, TypeScript, and Electron. All fonts and artwork are bundled, so once you’ve finished the first-time setup, you don’t need an internet connection to use it~

## How do I download it?

These instructions are for the project folder (the source code). You don’t need to know how to code, but you’ll need to copy a few commands during setup. You’ll need an internet connection for this part.

1. Download the project ZIP from wherever this project is shared. If you’re on its GitHub repository, click **Code → Download ZIP**.
2. Extract the ZIP: on **Windows**, right-click it and choose **Extract All**; on **Mac**, double-click it.
3. Move the extracted folder somewhere you’d like to keep it, such as Documents. Find the folder containing **package.json** and this **README.md**. That’s the project folder you’ll use below.

Keep the whole folder together. The launcher won’t work if you move it away from the other files.

## How do I run it on Windows?

### First-time setup

1. Visit the [official Node.js download page](https://nodejs.org/en/download). Choose **LTS** and download the **Windows Installer (.msi)**. For most PCs, choose **x64** if asked for an architecture; use **ARM64** for an ARM-based PC.
2. Open the downloaded installer and follow the prompts. Keep the default options, including npm and adding Node.js to PATH. Optional tools for compiling native modules aren’t needed for normal setup.
3. Open the project folder in File Explorer. Make sure you can see **package.json**.
4. Click File Explorer’s address bar at the top, type `cmd`, and press **Enter**. This opens Command Prompt in the correct folder. It’s a window where you can paste instructions for your computer.
5. Copy this command into Command Prompt and press **Enter**:

   ```sh
   npm install
   ```

   This downloads the app’s required components. It may take a few minutes. Wait until it finishes and you can type again.

6. Next, run this command and wait for it to finish:

   ```sh
   npm run build
   ```

   This prepares the app to run.

7. Finally, run:

   ```sh
   npm start
   ```

   Your palette generator should open in its own window!

### Opening it next time

Double-click **Aavanti's Palette Generator.cmd** in the project folder. Windows may hide the `.cmd` extension, so it might appear as **Aavanti's Palette Generator** with the type **Windows Command Script**.

You can also open Command Prompt in the project folder as described above and enter `npm start`. You don’t need to install or build again unless the project has changed.

### Using the shortcut with the cute logo

The included `.lnk` shortcut points to the my folder, so it may not work on your computer. To make your own:

1. Right-click **Aavanti's Palette Generator.cmd** and choose **Show more options → Create shortcut**, or simply **Create shortcut**, depending on your Windows version.
2. Right-click the new shortcut and choose **Properties → Change Icon → Browse**.
3. Select **electron → icon.ico** inside the project folder and confirm with **OK** and **Apply**.

You can move the shortcut to your desktop. Keep the actual project folder in place; if you move it later, recreate the shortcut.

## How do I run it on Mac?

### First-time setup

1. Visit the [official Node.js download page](https://nodejs.org/en/download). Choose **LTS** and download the **macOS Installer (.pkg)**. If asked for an architecture, choose **ARM64** for Apple silicon Macs (M-series chips) or **x64** for Intel Macs. Check your chip under **Apple menu → About This Mac**.
2. Open the installer and follow the prompts to install Node.js and npm.
3. Open **Terminal**: press **Command + Space**, type `Terminal`, and press **Return**. Terminal is a window where you can paste instructions for your computer.
4. Type `cd` followed by a space, but don’t press Return yet. Drag the project folder—the one containing **package.json**—from Finder into Terminal. This inserts its location for you. Now press **Return**.
5. Run the following commands **one at a time**. Press **Return** after each command and wait for it to finish before entering the next:

   ```sh
   npm install
   ```

   This downloads the app’s required components and may take a few minutes.

   ```sh
   npm run build
   ```

   This prepares the app to run.

   ```sh
   npm start
   ```

   Your palette generator should open in its own window!

### Opening it next time

Open Terminal, repeat step 4 to enter the project folder, then run:

```sh
npm start
```

You don’t need to repeat installation or building unless the project has changed. The Windows `.cmd` launcher and `.lnk` shortcut don’t run on Mac.

The source project is intended to run on both systems through Electron. It has been checked on Windows; the Mac setup and packaging haven’t yet been tested on a Mac.

## How do I use it?

1. **Choose your base colour.** Type a six-digit hex code, such as `#534d9e`, into the box. A hex code is a colour’s six-letter/number identifier. You can also click the cat or the picker beside the field to choose a colour visually.
2. **Click the moon.** Your base, accent, and support colours will appear as three cats.
3. **Make it yours.** Click a cat to pick a different colour. You can also edit the base hex field, change the accent’s angle in degrees, or move the support slider to adjust how much saturation is removed. A higher slider value makes the support colour less vivid.
4. **Lock your favourites.** Click the lock icon beside a colour’s label to lock or unlock it. You can lock up to two colours; locked colours stay the same when the others are recalculated.
5. **Copy a colour.** Click the large hex code below a cat to copy it, ready to paste into another app.
6. **Start fresh.** Click **Start again** to return to the first screen.

Changes to the base colour automatically recalculate unlocked accent and support colours. Picking an accent or support colour directly keeps your choice until the next recalculation, unless you lock it.

**Regenerate** reapplies the calculation using the current settings while preserving locked colours. It doesn’t pick random colours, so clicking it without changing anything usually looks like nothing happened. It can restore the calculated palette after manually editing an unlocked accent or support colour.

Drag the purple header to move the window. The **green star** maximizes or restores it, the **yellow star** minimizes it, and the **red star** closes the app.

## Something isn’t working?

- **“npm is not recognized” or “command not found: npm”:** finish installing Node.js, close Command Prompt or Terminal, and open it again. If needed, restart your computer and try again.
- **An error mentions a missing package.json:** you’re in the wrong folder. Follow the instructions above to enter the folder containing **package.json**.
- **PowerShell says scripts are disabled:** use **Command Prompt** on Windows as described above. You don’t need to change your computer’s script settings.
- **The launcher opens briefly and disappears:** open Command Prompt or Terminal in the project folder and run `npm start` to see the error. If you haven’t completed setup, run `npm install` and then `npm run build` first.
- **Installation fails:** check your internet connection and try `npm install` again. If you need help, share the error message from the command window.
- **The Windows shortcut stops working after moving the folder:** create a new shortcut to the `.cmd` file in its new location.

## How are the colours calculated?

The accent colour uses the **golden angle**, approximately **137.5°**. The app rotates the base colour’s hue by that amount around the HSL colour wheel, keeping saturation and lightness the same. You can change the angle on the results screen.

The support colour keeps the base colour’s hue and lightness, but reduces its saturation by **60%** by default. That leaves 40% of the original saturation. The slider lets you choose a reduction from 0% to 100%.

The golden angle comes from **360 / φ² ≈ 137.5°**, where φ (phi) is the golden ratio, approximately 1.618. These calculations run locally in Electron and use the same rules for every base colour.

## Optional: development and packaging

You can skip this section if you just want to use the app. Run these commands in the project folder.

| Command | What it does |
| --- | --- |
| `npm run dev` | Opens development mode and updates the app as source files change. Keep the command window open; press Ctrl+C there to stop the session. |
| `npm run build` | Checks the TypeScript code and prepares the app for normal use. Repeat after changing the source files. |
| `npm start` | Opens the previously built app. |
| `npm test` | Runs the backend colour-calculation tests. |
| `npm run package` | Builds a portable Windows `.exe` in a folder called `release`. Use this on Windows; it may download extra packaging tools. |
| `npm run package:win` | Same Windows build as `npm run package`. |
| `npm run package:mac` | Run on a Mac to create `.dmg` and `.zip` downloads for both Apple silicon (arm64) and Intel (x64) Macs in `release`. |

If you download an updated project, run `npm install` and `npm run build` again before opening it.





