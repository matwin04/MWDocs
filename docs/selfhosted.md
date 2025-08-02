
# files.mattwiner.org
[View](https://files.mattwiner.org)
## Filebrowser
Docker-Compose.yml
```yml
version: "3"
services:
  filebrowser:
    image: filebrowser/filebrowser
    container_name: filebrowser
    ports:
      - 8095:80  # Using the same external port as FileRise
    environment:
      - PUID=1000
      - PGID=1000
    volumes:
      - /NAS/MediaNet/Cloud/uploads:/srv  # Main file storage area
      - /NAS/MediaNet/Cloud/filebrowser/db:/database  # Persistent database storage
      - /NAS/MediaNet/Cloud/filebrowser/config:/config  # Persistent config storage
    restart: unless-stopped
```


## FileRise
```yaml
version: "3"
services:
  filerise:
    image: error311/filerise-docker:latest
    container_name: filerise
    ports:
      - 8095:80
    environment:
      TIMEZONE: UTC
      TOTAL_UPLOAD_SIZE: 10G
      SECURE: "false"
    volumes:
      - /NAS/MediaNet/Cloud/uploads:/var/www/uploads
      - /NAS/MediaNet/Cloud/users:/var/www/users
      - /NAS/MediaNet/Cloud/metadata:/var/www/metadata
    restart: unless-stopped
```
## Copyparty
```yml
version: '3.8'

services:
  copyparty:
    image: 9001/copyparty:latest
    container_name: copyparty
    ports:
      - "8095:8000" # Host_Port:Container_Port - Adjust if needed
    volumes:
      - /NAS/MediaNet/Cloud/files:/srv/copyparty/data # Local_Path:Container_Path - Where your files will be stored
      - /NAS/MediaNet/Cloud/config:/srv/copyparty/cfg # Local_Path:Container_Path - For configuration files
    environment:
      # Optional: Set initial admin username and password
      # - CP_ADMIN_USER=your_admin_username
      # - CP_ADMIN_PASS=your_admin_password
      # Optional: Other Copyparty arguments
      # - CP_ARGS=--log-level debug
    restart: unless-stopped
```