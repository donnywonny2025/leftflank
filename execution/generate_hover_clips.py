#!/usr/bin/env python3
"""
generate_hover_clips.py
-----------------------
Downloads YouTube-only videos and generates 6-second hover preview clips
for all 26 portfolio items. Uses ffmpeg for clip extraction.

Usage: python3 execution/generate_hover_clips.py
"""

import subprocess
import os
import json
import sys

# Paths
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEOS_DIR = os.path.join(PROJECT_ROOT, "videos")
PERSONAL_VIDEOS = "/Volumes/WORK 2TB/WORK 2026/JOB CREATION/jefferykerr_live_replica/Videos"
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "app", "public", "hover-clips")
THUMBNAILS_DIR = os.path.join(PROJECT_ROOT, "app", "public", "thumbnails")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(THUMBNAILS_DIR, exist_ok=True)

# Find yt-dlp — may be in user-local bin
YTDLP_BIN = "/opt/homebrew/bin/yt-dlp"
if not os.path.exists(YTDLP_BIN):
    import shutil
    YTDLP_BIN = shutil.which("yt-dlp") or "yt-dlp"

# ─── Portfolio definition (in priority order) ───
# source_type: "local" = already in LeftFlank/videos/, "personal" = in personal site Videos/, "youtube" = download needed
PORTFOLIO = [
    # Tier 1 — Most Recent (2024)
    {
        "id": "senate-majority-pac-ginny",
        "title": "Senate Majority Pac - \"Ginny\"",
        "client": "Senate Majority Pac",
        "vimeoId": "1074769967",
        "vimeoHash": "7842c9296c",
        "source_type": "local",
        "source_file": "Senate_Majority_Pac_-_Ginny_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Delivering the message that moved millions.",
        "year": 2024,
        "clip_start": 3,
    },
    {
        "id": "vote-vets-sick",
        "title": "Vote Vets - \"Sick\"",
        "client": "Vote Vets",
        "vimeoId": "1074773719",
        "vimeoHash": "c37b334cfb",
        "source_type": "local",
        "source_file": "Vote_Vets_-_Sick_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Veterans deserve better.",
        "year": 2024,
        "clip_start": 3,
    },
    {
        "id": "unlocking-americas-future-greed",
        "title": "Unlocking Americas Future \"Greed\"",
        "client": "Unlocking Americas Future",
        "vimeoId": "1081101263",
        "vimeoHash": "2277355dec",
        "source_type": "local",
        "source_file": "Unlocking_Americas_Future_Greed_TV_30_(Ward).mp4",
        "category": "digital",
        "tags": ["DIGITAL", "BRANDED"],
        "subtitle": "Stories that changed the conversation.",
        "year": 2024,
        "clip_start": 3,
    },

    # Tier 2 — Anti-Trump / PAC (2020)
    {
        "id": "aat-jenkins-60",
        "title": "Americans Against Trump - Jenkins :60",
        "client": "Americans Against Trump",
        "vimeoId": "1173444761",
        "vimeoHash": "b7e3849d01",
        "source_type": "local",
        "source_file": "Americans_Against_Trump_Trumped_in_America_-_Jenkins_TV_60.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "The story America needed to hear.",
        "year": 2020,
        "clip_start": 5,
    },
    {
        "id": "aat-jenkins-30",
        "title": "Americans Against Trump - Jenkins :30",
        "client": "Americans Against Trump",
        "vimeoId": "1173444795",
        "vimeoHash": "5accb5c976",
        "source_type": "local",
        "source_file": "Americans_Against_Trump_Trumped_in_America_-_Jenkins_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Hard truths in thirty seconds.",
        "year": 2020,
        "clip_start": 3,
    },
    {
        "id": "aat-rosenburg",
        "title": "Americans Against Trump - Rosenburg",
        "client": "Americans Against Trump",
        "vimeoId": "1173444812",
        "vimeoHash": "03be9ee2b0",
        "source_type": "local",
        "source_file": "Americans_Against_Trump_Trumped_in_America_-_Rosenburg_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Real people. Real consequences.",
        "year": 2020,
        "clip_start": 3,
    },
    {
        "id": "aat-diehl",
        "title": "Americans Against Trump - Diehl",
        "client": "Americans Against Trump",
        "vimeoId": "1173444783",
        "vimeoHash": "f7d94ca856",
        "source_type": "local",
        "source_file": "Americans_Against_Trump_Trumped_in_America_-_Diehl_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "One worker's story against a broken system.",
        "year": 2020,
        "clip_start": 3,
    },
    {
        "id": "trump-taj-unpaid",
        "title": "Trump Taj Mahal — Unpaid Contractors",
        "client": "Political",
        "youtubeId": "kO5SH1bXPhE",
        "source_type": "youtube",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "DIGITAL"],
        "subtitle": "Exposing broken promises.",
        "year": 2020,
        "clip_start": 5,
    },
    {
        "id": "trump-taj-broken",
        "title": "Trump Taj Mahal — Broken Promises",
        "client": "Political",
        "youtubeId": "DZajWmSKwjU",
        "source_type": "youtube",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "DIGITAL"],
        "subtitle": "The workers who built an empire and got nothing.",
        "year": 2020,
        "clip_start": 5,
    },

    # Tier 3 — Senate/PAC/Congressional
    {
        "id": "senate-majority-pac-ginny-alt",  # keeping as separate entry for now
        "title": "Barbara Boxer - Out For Herself",
        "client": "Barbara Boxer",
        "vimeoId": "28182531",
        "vimeoHash": "fb2090e4cf",
        "source_type": "local",
        "source_file": "Barbara_Boxer_Out_For_Herself_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Holding power accountable.",
        "year": 2010,
        "clip_start": 3,
    },
    {
        "id": "gabe-albornoz",
        "title": "Gabe Albornoz",
        "client": "Gabe Albornoz",
        "youtubeId": "71xhYlS28oc",
        "source_type": "youtube",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "DIGITAL"],
        "subtitle": "A leader for the community.",
        "year": 2022,
        "clip_start": 3,
    },

    # Tier 4 — Advocacy / Local Political
    {
        "id": "david-curry",
        "title": "David Curry Announcement",
        "client": "David Curry",
        "youtubeId": "GMD6_PnGfMA",
        "source_type": "youtube",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "DIGITAL"],
        "subtitle": "The announcement that started a movement.",
        "year": 2022,
        "clip_start": 3,
    },
    {
        "id": "mcconaughey-lobbying",
        "title": "McConaughey Lobbying",
        "client": "Matthew McConaughey",
        "youtubeId": "Yph4hftmJBU",
        "source_type": "youtube",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "EDITORIAL"],
        "subtitle": "When Hollywood meets Capitol Hill.",
        "year": 2022,
        "clip_start": 45,
        "videoZoom": 1.15,
    },

    # Tier 5 — Hillary (2016)
    {
        "id": "hillary-this-house",
        "title": "Hillary for America - This House",
        "client": "Hillary for America",
        "vimeoId": "1173573986",
        "vimeoHash": "c0cd855f2d",
        "source_type": "local",
        "source_file": "Hillary_for_America_This_House_TV_60.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "The house that built America.",
        "year": 2016,
        "clip_start": 5,
        "videoZoom": 1.15,
    },
    {
        "id": "hillary-forward",
        "title": "Hillary for America - Forward",
        "client": "Hillary for America",
        "vimeoId": "1173571691",
        "vimeoHash": "9559018e49",
        "source_type": "local",
        "source_file": "Hillary_for_America_Forward_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Moving the country forward.",
        "year": 2016,
        "clip_start": 3,
        "videoZoom": 1.05,
    },
    {
        "id": "hillary-real-progress",
        "title": "Hillary for America - Real Progress Now",
        "client": "Hillary for America",
        "vimeoId": "1173572064",
        "vimeoHash": "5447985404",
        "source_type": "local",
        "source_file": "Hillary_for_America_Real_Progress_Now_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Real progress starts now.",
        "year": 2016,
        "clip_start": 3,
    },

    # Tier 6 — Government
    {
        "id": "banco-austin",
        "title": "Banco Austin",
        "client": "Banco Austin",
        "youtubeId": "UR0bXieWumw",
        "source_type": "personal",
        "source_file": "Banco_Loop.mp4",  # Pre-made loop!
        "category": "government",
        "tags": ["GOVERNMENT"],
        "subtitle": "Banking for the community.",
        "year": 2021,
        "clip_start": 0,  # Already a loop, use from start
    },
    {
        "id": "aisc-american-steel",
        "title": "AISC American Steel",
        "client": "AISC",
        "youtubeId": "Q7wWzs8vnP0",
        "source_type": "personal",
        "source_file": "AISC_Loop_2.mp4",  # Pre-made loop!
        "category": "government",
        "tags": ["GOVERNMENT"],
        "subtitle": "Built with American steel.",
        "year": 2021,
        "clip_start": 0,
    },

    # Tier 7 — Legacy
    {
        "id": "obama-go",
        "title": "Obama for America - Go",
        "client": "Obama for America",
        "vimeoId": "58372132",
        "vimeoHash": "5ffeeeef51",
        "source_type": "local",
        "source_file": "Obama_for_America_-_Go_TV_60.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Go. Vote. Change.",
        "year": 2012,
        "clip_start": 5,
    },
    {
        "id": "obama-challenges",
        "title": "Obama for America - Challenges",
        "client": "Obama for America",
        "vimeoId": "54605111",
        "vimeoHash": "d9167b8699",
        "source_type": "local",
        "source_file": "Obama_for_America_-_Challenges_TV_30.mp4",
        "category": "campaigns",
        "tags": ["CAMPAIGNS", "TV"],
        "subtitle": "Rising to the challenge.",
        "year": 2012,
        "clip_start": 3,
    },

    # Tier 8 — Planned Parenthood (last)
    {
        "id": "pp-suzanne",
        "title": "PP Stories - Suzanne",
        "client": "Planned Parenthood",
        "vimeoId": "1173468114",
        "vimeoHash": "2e35ef6c08",
        "source_type": "local",
        "source_file": "Planned_Parenthood_Stories_Suzanne_TRT_30.mp4",
        "category": "advocacy",
        "tags": ["BRANDED", "DIGITAL"],
        "subtitle": "Suzanne's story.",
        "year": 2022,
        "clip_start": 3,
    },
    {
        "id": "pp-julieanna",
        "title": "PP Stories - JulieAnna",
        "client": "Planned Parenthood",
        "vimeoId": "1173468149",
        "vimeoHash": "bd50608454",
        "source_type": "local",
        "source_file": "PP_Stories_-_JulieAnna_TRT_1_13.mp4",
        "category": "advocacy",
        "tags": ["BRANDED", "DIGITAL"],
        "subtitle": "JulieAnna's story.",
        "year": 2022,
        "clip_start": 3,
    },
    {
        "id": "pp-stephanie",
        "title": "PP Stories - Stephanie",
        "client": "Planned Parenthood",
        "vimeoId": "1173468127",
        "vimeoHash": "114bd66440",
        "source_type": "local",
        "source_file": "PP_Stories_Stephanie_TRT_54.mp4",
        "category": "advocacy",
        "tags": ["BRANDED", "DIGITAL"],
        "subtitle": "Stephanie's story.",
        "year": 2022,
        "clip_start": 3,
    },
    {
        "id": "pp-brianna",
        "title": "PP Stories - Brianna",
        "client": "Planned Parenthood",
        "vimeoId": "1173468139",
        "vimeoHash": "816064be3e",
        "source_type": "local",
        "source_file": "PP_Stories_Brianna_TRT_1_06.mp4",
        "category": "advocacy",
        "tags": ["BRANDED", "DIGITAL"],
        "subtitle": "Brianna's story.",
        "year": 2022,
        "clip_start": 3,
    },
]


def get_source_path(item):
    """Resolve the full path to the source video."""
    if item["source_type"] == "local":
        return os.path.join(VIDEOS_DIR, item["source_file"])
    elif item["source_type"] == "personal":
        return os.path.join(PERSONAL_VIDEOS, item["source_file"])
    elif item["source_type"] == "youtube":
        # Download to videos/ dir
        return os.path.join(VIDEOS_DIR, f"yt_{item['id']}.mp4")
    return None


def download_youtube(item):
    """Download a YouTube video using yt-dlp."""
    output_path = os.path.join(VIDEOS_DIR, f"yt_{item['id']}.mp4")
    if os.path.exists(output_path):
        print(f"  ✓ Already downloaded: {item['id']}")
        return output_path

    yt_url = f"https://www.youtube.com/watch?v={item['youtubeId']}"
    print(f"  ⬇ Downloading: {item['title']} ({yt_url})")

    try:
        subprocess.run([
            YTDLP_BIN,
            "-f", "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best",
            "--merge-output-format", "mp4",
            "-o", output_path,
            "--no-playlist",
            "--quiet",
            yt_url
        ], check=True, timeout=120)
        print(f"  ✓ Downloaded: {item['id']}")
        return output_path
    except subprocess.CalledProcessError as e:
        print(f"  ✗ FAILED to download {item['id']}: {e}")
        return None
    except subprocess.TimeoutExpired:
        print(f"  ✗ TIMEOUT downloading {item['id']}")
        return None


def extract_clip(source_path, output_path, start_time=3, duration=6):
    """Extract a 6-second silent clip from the source video."""
    if os.path.exists(output_path):
        size = os.path.getsize(output_path)
        if size > 10000:  # Skip if already exists and not empty
            print(f"  ✓ Clip exists: {os.path.basename(output_path)} ({size // 1024}KB)")
            return True

    # Get video duration first
    try:
        result = subprocess.run([
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "csv=p=0",
            source_path
        ], capture_output=True, text=True, timeout=10)
        vid_duration = float(result.stdout.strip())
    except (ValueError, subprocess.TimeoutExpired):
        vid_duration = 30  # Assume 30s if probe fails

    # If video is shorter than start+duration, adjust
    if vid_duration <= start_time + duration:
        start_time = max(0, int(vid_duration / 2 - duration / 2))
    if vid_duration < duration:
        duration = vid_duration

    try:
        subprocess.run([
            "ffmpeg", "-y",
            "-ss", str(start_time),
            "-i", source_path,
            "-t", str(duration),
            "-an",  # No audio
            "-vf", "scale=720:-2",
            "-c:v", "libx264",
            "-crf", "28",
            "-preset", "fast",
            "-movflags", "+faststart",
            "-pix_fmt", "yuv420p",
            output_path
        ], check=True, capture_output=True, timeout=60)

        size = os.path.getsize(output_path)
        print(f"  ✓ Clip: {os.path.basename(output_path)} ({size // 1024}KB)")
        if size > 2 * 1024 * 1024:
            print(f"  ⚠ WARNING: Clip exceeds 2MB target!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"  ✗ FAILED clip extraction: {e.stderr.decode()[:200]}")
        return False
    except subprocess.TimeoutExpired:
        print(f"  ✗ TIMEOUT during clip extraction")
        return False


def extract_thumbnail(source_path, output_path, time=4):
    """Extract a poster frame thumbnail from the source video."""
    if os.path.exists(output_path):
        size = os.path.getsize(output_path)
        if size > 5000:
            return True
    
    try:
        subprocess.run([
            "ffmpeg", "-y",
            "-ss", str(time),
            "-i", source_path,
            "-vframes", "1",
            "-vf", "scale=960:-2",
            "-q:v", "3",
            output_path
        ], check=True, capture_output=True, timeout=30)
        return True
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired):
        return False


def generate_portfolio_js(results):
    """Generate the portfolio.js data file."""
    output_path = os.path.join(PROJECT_ROOT, "app", "src", "data", "portfolio.js")

    items = []
    for i, item in enumerate(PORTFOLIO):
        entry = {
            "id": str(i + 1),
            "slug": item["id"],
            "title": item["title"],
            "client": item["client"],
            "subtitle": item.get("subtitle", ""),
            "category": item.get("category", "campaigns"),
            "tags": item.get("tags", []),
            "year": item["year"],
            "thumbnail": f"/thumbnails/{item['id']}.jpg",
            "hoverClip": f"/hover-clips/{item['id']}.mp4" if results.get(item["id"]) else None,
            "videoZoom": item.get("videoZoom", 1.0)
        }

        if "vimeoId" in item:
            entry["vimeoId"] = item["vimeoId"]
            entry["vimeoHash"] = item.get("vimeoHash", "")
        if "youtubeId" in item:
            entry["youtubeId"] = item["youtubeId"]

        items.append(entry)

    js_content = "export const portfolioData = " + json.dumps(items, indent=2) + ";\n"
    with open(output_path, "w") as f:
        f.write(js_content)
    print(f"\n✓ Generated portfolio.js with {len(items)} items")


def main():
    print("=" * 60)
    print("LEFT FLANK — Hover Clip Generator")
    print("=" * 60)

    results = {}

    # Phase 1: Download YouTube videos
    youtube_items = [p for p in PORTFOLIO if p["source_type"] == "youtube"]
    if youtube_items:
        print(f"\n--- Phase 1: Downloading {len(youtube_items)} YouTube videos ---")
        for item in youtube_items:
            path = download_youtube(item)
            if path:
                item["_resolved_path"] = path

    # Phase 2: Extract clips
    print(f"\n--- Phase 2: Extracting {len(PORTFOLIO)} hover clips ---")
    for item in PORTFOLIO:
        source = item.get("_resolved_path") or get_source_path(item)
        if not source or not os.path.exists(source):
            print(f"  ✗ Source not found for {item['id']}: {source}")
            results[item["id"]] = False
            continue

        clip_path = os.path.join(OUTPUT_DIR, f"{item['id']}.mp4")
        success = extract_clip(source, clip_path, item.get("clip_start", 3))
        results[item["id"]] = success

    # Phase 3: Extract thumbnails for new items (YouTube + personal)
    print(f"\n--- Phase 3: Generating thumbnails ---")
    for item in PORTFOLIO:
        thumb_path = os.path.join(THUMBNAILS_DIR, f"{item['id']}.jpg")
        source = item.get("_resolved_path") or get_source_path(item)
        if source and os.path.exists(source):
            extract_thumbnail(source, thumb_path, item.get("clip_start", 4))

    # Phase 4: Generate portfolio.js
    print(f"\n--- Phase 4: Generating portfolio.js ---")
    generate_portfolio_js(results)

    # Summary
    print(f"\n{'=' * 60}")
    successes = sum(1 for v in results.values() if v)
    failures = sum(1 for v in results.values() if not v)
    print(f"✓ {successes} clips generated successfully")
    if failures:
        print(f"✗ {failures} clips failed")
        for item_id, ok in results.items():
            if not ok:
                print(f"  - {item_id}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
