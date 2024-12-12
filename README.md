# Node.js Program Uninstaller

This repository provides a simple program uninstaller tool built using **Node.js** and **HTML**. It allows users to view installed programs on their system and uninstall them with a click of a button. The user interface is built with HTML, and the backend is powered by Node.js to interact with the system and perform the uninstall operations.

## Features

- **List of Installed Programs**: Displays all installed programs on your system in a user-friendly interface.
- **One-Click Uninstall**: Uninstall any program directly from the interface by clicking a button.
- **Cross-platform Support**: Designed to work on both **Windows** and **macOS** (additional OS support can be added).

## Requirements

- **Node.js**: This tool requires **Node.js** to run. You can download and install Node.js from the official website: [https://nodejs.org](https://nodejs.org).
- **Operating System**: The tool is designed for **Windows** and **macOS**.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Co-lest/improved-winner
   ```

2. Navigate to the project directory:

   ```bash
   cd improved-winner
   ```

3. Install the required Node.js dependencies:

   ```bash
   npm install
   ```

## Usage

1. **Run the Application**:

   Start the Node.js application by running the following command:

   ```bash
   npm start
   ```

2. **View Installed Programs**:

   The application will open an HTML interface in your default web browser that lists all installed programs.

3. **Uninstall a Program**:

   - Click the **Uninstall** button next to the program you wish to remove.
   - A prompt will appear asking for confirmation before proceeding with the uninstallation.
   - If you confirm, the selected program will be uninstalled from your system.

## How It Works

- **Backend**: The Node.js backend interacts with the system to retrieve a list of installed programs and initiate the uninstallation process.
  - For **Windows**, it uses the `wmic` command to fetch installed programs and uninstall them.
  - For **macOS**, it utilizes the `brew` command or other system calls to uninstall applications.
  
- **Frontend**: The HTML interface is dynamically populated with the list of installed programs. When a program is clicked, it triggers a prompt to uninstall the program.

## Supported Operating Systems

- **Windows**: The tool uses Windows Management Instrumentation (WMIC) to fetch installed programs and uninstall them.
- **macOS**: Uses `brew` and system commands to manage application uninstallation.

## Example (Windows)

Here is an example of how the uninstallation process works on Windows:

- **Step 1**: The program is listed in the browser interface.
- **Step 2**: Clicking "Uninstall" will run a Node.js function that uses the WMIC command to uninstall the program.
- **Step 3**: A prompt will confirm the uninstallation.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure your code follows the existing code style and includes relevant tests.

### How to Contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Node.js**: For enabling cross-platform development.
- **HTML/CSS**: For the front-end interface that makes it easy to interact with the application.

---

Feel free to open an issue if you encounter any problems or have feature requests!
