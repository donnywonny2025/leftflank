import os
import subprocess
import json

# Using the player.vimeo.com URLs as verified
# Removing specific format flags to let yt-dlp pick best and merge with ffmpeg
VIDEOS = [
    {"name": "Senate Majority Pac - Ginny TV 30", "id": "1074769967", "hash": "7842c9296c"},
    {"name": "Obama for America - Go TV 60", "id": "58372132", "hash": "5ffeeeef51"},
    {"name": "Obama for America - Challenges TV 30", "id": "54605111", "hash": "d9167b8699"},
    {"name": "Barbara Boxer Out For Herself TV 30", "id": "28182531", "hash": "fb2090e4cf"},
    {"name": "Vote Vets - Sick TV 30", "id": "1074773719", "hash": "c37b334cfb"},
    {"name": "Unlocking Americas Future Greed TV 30 (Ward)", "id": "1081101263", "hash": "2277355dec"},
    {"name": "Americans Against Trump Trumped in America - Jenkins TV 30", "id": "1173444795", "hash": "5accb5c976"},
    {"name": "Americans Against Trump Trumped in America - Jenkins TV 60", "id": "1173444761", "hash": "b7e3849d01"},
    {"name": "Americans Against Trump Trumped in America - Rosenburg TV 30", "id": "1173444812", "hash": "03be9ee2b0"},
    {"name": "Americans Against Trump Trumped in America - Diehl TV 30", "id": "1173444783", "hash": "f7d94ca856"},
    {"name": "Planned Parenthood Stories Suzanne TRT 30", "id": "1173468114", "hash": "2e35ef6c08"},
    {"name": "PP Stories - JulieAnna TRT 1 13", "id": "1173468149", "hash": "bd50608454"},
    {"name": "PP Stories Stephanie TRT 54", "id": "1173468127", "hash": "114bd66440"},
    {"name": "PP Stories Brianna TRT 1 06", "id": "1173468139", "hash": "816064be3e"},
    {"name": "Hillary for America Forward TV 30", "id": "1173571691", "hash": "9559018e49"},
    {"name": "Hillary for America Real Progress Now TV 30", "id": "1173572064", "hash": "5447985404"},
    {"name": "Hillary for America This House TV 60", "id": "1173573986", "hash": "c0cd855f2d"},
]

# Relative to execution directory
OUTPUT_DIR = os.path.join(os.getcwd(), "..", "videos")

def download_video(video):
    name = video["name"]
    vid_id = video["id"]
    vid_hash = video["hash"]
    
    filename = name.replace(" ", "_").replace("\"", "").replace(":", "").replace("/", "_") + ".mp4"
    output_path = os.path.join(OUTPUT_DIR, filename)
    
    # Check if already downloaded (basic check)
    if os.path.exists(output_path) and os.path.getsize(output_path) > 1000000: # >1MB
        print(f"Skipping already downloaded: {name}")
        return True

    # Constructing the player URL with hash
    url = f"https://player.vimeo.com/video/{vid_id}?h={vid_hash}"
    
    print(f"Downloading: {name} from {url}...")
    
    # Defaulting to best formats, letting yt-dlp merge with ffmpeg
    cmd = [
        "python3", "-m", "yt_dlp",
        "--referer", "https://vimeo.com/",
        "-o", output_path,
        url
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print(f"Successfully downloaded: {filename}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Failed to download {name}: {e}")
        return False

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    results = []
    for video in VIDEOS:
        success = download_video(video)
        results.append({"name": video["name"], "success": success})
    
    print("\nDownload Summary:")
    passed_count = sum(1 for r in results if r["success"])
    for res in results:
        status = "PASSED" if res["success"] else "FAILED"
        print(f"{status}: {res['name']}")
    
    print(f"\nTotal: {passed_count}/{len(VIDEOS)} successfully processed.")

if __name__ == "__main__":
    main()
