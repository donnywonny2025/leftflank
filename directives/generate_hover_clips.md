# Directive: Generate Hover Clips & Thumbnails

## Goal
Generate 6-second silent preview clips and poster-frame thumbnails for all portfolio items to be used in the web app's editorial grid.

## Inputs
- Source videos in `/videos/`
- Portfolio metadata in `PORTFOLIO` list (within the script)
- Clip start times (seconds)

## Tools/Scripts
- **Execution Script**: `execution/generate_hover_clips.py`
- **Dependencies**: `ffmpeg`, `ffprobe`

## Procedure
1. Ensure source videos are downloaded to `/videos/`.
2. Run the script: `python3 execution/generate_hover_clips.py`
3. The script will:
   - Extract a 6s clip starting at `clip_start`.
   - Scale to 720p with a target size under 2MB.
   - Extract a JPG thumbnail.
   - Generate `app/src/data/portfolio.js` with updated asset paths.

## Outputs
- Optimized MP4 clips in `app/public/hover-clips/`
- JPG thumbnails in `app/public/thumbnails/`
- Updated `app/src/data/portfolio.js`

## Edge Cases
- **Missing Source**: If a source file is missing, the script will skip it but continue others.
- **Short Videos**: If the video is shorter than the requested `clip_start + duration`, the script automatically centers the clip.
- **File Weight**: If a clip exceeds 2MB, a warning is printed. Consider increasing `-crf` value in the script if file sizes are too high.
