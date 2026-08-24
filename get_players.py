import os
import json
import time
import requests
import pandas as pd
from nba_api.stats.endpoints import commonallplayers, leaguedashplayerstats

HEADERS = {
    'Host': 'stats.nba.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://www.nba.com',
    'Referer': 'https://www.nba.com/',
    'Connection': 'keep-alive',
    'x-nba-stats-origin': 'stats',
    'x-nba-stats-token': 'true',
}

def fetch_with_retry(endpoint_class, max_retries=3, **kwargs):
    for attempt in range(max_retries):
        try:
            return endpoint_class(headers=HEADERS, timeout=100, **kwargs)
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(5)
            else:
                raise e

print("Fetching live WNBA roster and stats...")

# Create an images folder in the same directory as this script
os.makedirs("images", exist_ok=True)

live_players = fetch_with_retry(commonallplayers.CommonAllPlayers, is_only_current_season=1, league_id='10', season='2026')
df_all = live_players.get_data_frames()[0]

stats = fetch_with_retry(leaguedashplayerstats.LeagueDashPlayerStats, league_id_nullable='10', season='2026')
df_stats = stats.get_data_frames()[0]

player_data = []
print("Processing players and downloading headshots (this may take a minute)...")

for _, row in df_all.iterrows():
    name = row['DISPLAY_FIRST_LAST']
    team_name = str(row['TEAM_NAME'])
    team = f"{row['TEAM_CITY']} {team_name}".strip() if team_name.lower() not in ["nan", "none"] else "Free Agent"
        
    player_id = int(row['PERSON_ID'])
    stat_row = df_stats[df_stats['PLAYER_ID'] == player_id]
    
    ppg = 0.0
    if not stat_row.empty:
        games = int(stat_row['GP'].iloc[0])
        points = float(stat_row['PTS'].iloc[0])
        if games > 0:
            ppg = round(points / games, 1)

    player_data.append({"name": name, "team": team, "ppg": ppg, "id": player_id})
    
    # --- NEW: Image Download Logic ---
    image_filename = f"images/{player_id}.png"
    
    # Only download if we don't already have it (makes future runs lightning fast)
    if not os.path.exists(image_filename):
        img_url = f"https://cdn.nba.com/headshots/wnba/latest/260x190/{player_id}.png"
        img_headers = {
            "User-Agent": HEADERS["User-Agent"],
            "Referer": "https://www.wnba.com/"
        }
        
        # Bypass the block and download the image directly
        img_response = requests.get(img_url, headers=img_headers)
        
        # Status 200 means the image successfully loaded
        if img_response.status_code == 200:
            with open(image_filename, "wb") as f:
                f.write(img_response.content)
            print(f"Downloaded headshot for {name}")
            time.sleep(0.5) # Pause briefly to be polite to the servers

player_data.sort(key=lambda x: x['ppg'], reverse=True)

with open('players.js', 'w') as f:
    f.write(f"const allPlayers = {json.dumps(player_data)};")

print(f"Success! Generated players.js with {len(player_data)} players.")
