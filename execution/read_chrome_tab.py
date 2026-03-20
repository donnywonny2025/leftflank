import subprocess
import os

def get_chrome_tab_content():
    """Uses AppleScript to extract the text and HTML of the currently active Google Chrome tab."""
    # AppleScript to get the page URL, Title, and innerText
    applescript = """
    tell application "Google Chrome"
        set activeTab to active tab of front window
        set tabUrl to URL of activeTab
        set tabTitle to title of activeTab
        set tabText to execute activeTab javascript "document.body.innerText;"
        set tabHtml to execute activeTab javascript "document.documentElement.outerHTML;"
        return tabUrl & "|||SPLIT|||" & tabTitle & "|||SPLIT|||" & tabText & "|||SPLIT|||" & tabHtml
    end tell
    """
    
    try:
        # Run the AppleScript
        result = subprocess.check_output(['osascript', '-e', applescript], text=True)
        parts = result.split("|||SPLIT|||")
        
        if len(parts) == 4:
            url, title, text, html = parts
            
            # Ensure .tmp directory exists
            os.makedirs("../.tmp", exist_ok=True)
            
            # Save the text
            text_path = "../.tmp/da_snapshot.txt"
            with open(text_path, "w", encoding="utf-8") as f:
                f.write(f"URL: {url}\nTitle: {title}\n\n=== CONTENT ===\n{text}")
                
            # Save the HTML
            html_path = "../.tmp/da_snapshot.html"
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(html)
                
            print(f"✅ Extracted active Chrome tab: '{title}'")
            print(f"✅ Text saved to: {os.path.abspath(text_path)}")
            print(f"✅ HTML saved to: {os.path.abspath(html_path)}")
            return True
        else:
            print("❌ Could not parse AppleScript result.")
            return False
            
    except subprocess.CalledProcessError as e:
        print(f"❌ Error communicating with Chrome: {e}")
        print("Make sure Google Chrome is open, running, and you have allowed automation permissions if prompted.")
        return False

if __name__ == '__main__':
    print("Initiating stealth extraction from active Chrome tab...")
    get_chrome_tab_content()
