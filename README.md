# Crunchyroll Watchlist Enhancer

A lightweight Chrome extension to reorganize Crunchyroll's watchlist into clear, categorized groups: **Up Next**, **Continue**, **Start Watching**, and **Watch Again**.

## Features

- Dynamically waits for Crunchyroll's watchlist to load and replaces it with grouped sections.
- Organizes shows in the following order:
  1. **Up Next**
  2. **Continue**
  3. **Start Watching**
  4. **Watch Again**
- Improves usability by categorizing shows for easier navigation.

## Installation

1. **Clone or download the repository**:
   ```bash
   git clone https://github.com/renzofp/crunchyroll-better-watchlist.git
   ```
2. **Load as an unpacked extension**:
   - Go to `chrome://extensions/` in your browser.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click **Load unpacked** and select the directory of this project.

## Usage

1. Navigate to your Crunchyroll **Watchlist**: [https://www.crunchyroll.com/watchlist](https://www.crunchyroll.com/watchlist).
2. The extension automatically reorganizes your watchlist into the categorized groups.
3. If the page doesn't update after loading, refresh the page manually.

## Debugging

- Open the **Developer Tools Console** (Right-click > Inspect > Console) to check logs for script activity.
- You should see logs such as:
  - `Script loaded.`
  - `Waiting for watchlist container...`
  - `All items loaded.`
  - `Watchlist updated and grouped successfully!`

## Contribution

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
