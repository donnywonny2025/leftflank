# Directive: Download Portfolio Videos

## Goal
Download source videos from Vimeo/YouTube to the local `videos/` directory for processing. 

## Inputs
- `VIDEOS` list defined within the script (or passed as a JSON list)
- Vimeo IDs and hashes
- YouTube IDs

## Tools/Scripts
- **Execution Script**: `execution/download_videos.py`
- **Dependencies**: `yt-dlp`, `ffmpeg`

## Procedure
1. Ensure `yt-dlp` is installed: `pip install yt-dlp`
2. Run the script: `python3 execution/download_videos.py`
3. The script will iterate through the defined list and save `.mp4` files to the root `videos/` folder.

## Outputs
- MP4 files in `/videos/`

## Edge Cases
- **Vimeo Hashing**: Ensure the `?h=` hash is provided for private Vimeo links.
- **Rate Limiting**: `yt-dlp` handles standard retries, but if IP-banned, check proxy settings.
- **Disk Space**: Source videos can be large; ensure at least 5GB of free space.
