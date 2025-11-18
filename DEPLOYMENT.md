# Bereitstellungsanleitung

Diese Anleitung beschreibt, wie Sie die Anwendung auf Ihrem eigenen Webserver bereitstellen.

## Voraussetzungen

- Node.js (Version 18 oder höher)
- npm (wird mit Node.js installiert)
- Git

## Schritte zur Bereitstellung

1.  **Repository klonen**
    Öffnen Sie ein Terminal auf Ihrem Server und klonen Sie das Repository:
    ```bash
    git clone <repository_url>
    cd <repository_verzeichnis>
    ```

2.  **Abhängigkeiten installieren**
    Installieren Sie die erforderlichen Pakete mit npm:
    ```bash
    npm install
    ```

3.  **Anwendung bauen**
    Erstellen Sie die Produktionsversion der Anwendung:
    ```bash
    npm run build
    ```
    Dieser Befehl erstellt ein `build`-Verzeichnis mit allen statischen Dateien, die für die Bereitstellung benötigt werden.

4.  **Anwendung starten**
    Starten Sie die Anwendung mit dem folgenden Befehl:
    ```bash
    npm start
    ```
    Standardmäßig läuft die Anwendung auf Port `3000`. Sie können den Port anpassen, indem Sie die `PORT`-Umgebungsvariable setzen:
    ```bash
    PORT=8080 npm start
    ```

## Empfehlung für den Produktionsbetrieb

Für den dauerhaften Betrieb in einer Produktionsumgebung wird empfohlen, einen Prozessmanager wie `pm2` zu verwenden. Dies stellt sicher, dass die Anwendung bei Fehlern automatisch neu gestartet wird und im Hintergrund läuft.

### Beispiel mit `pm2`

1.  **pm2 installieren**
    ```bash
    npm install -g pm2
    ```

2.  **Anwendung mit pm2 starten**
    ```bash
    pm2 start build/index.js --name "svelte-app"
    ```

3.  **Prozessstatus überprüfen**
    ```bash
    pm2 list
    ```
