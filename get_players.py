import json
import time
import pandas as pd
from nba_api.stats.endpoints import commonallplayers, leaguedashplayerstats

# Realistic browser headers to prevent stats.nba.com from blocking GitHub Actions
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
    """Helper function to retry API calls if stats.nba.com stalls."""
    for attempt in range(max_retries):
        try:
            print(f"Fetching data (Attempt {attempt + 1}/{max_retries})...")
            return endpoint_class(headers=HEADERS, timeout=100, **kwargs)
        except Exception as e:
            print(f"Attempt {attempt + 1} timed out: {e}")
            if attempt < max_retries - 1:
                time.sleep(5)  # Wait 5 seconds before retrying
            else:
                raise e

print("Fetching live WNBA roster and stats for 2026...")

# 1. Get ALL active players
live_players = fetch_with_retry(
    commonallplayers.CommonAllPlayers,
    is_only_current_season=1,
    league_id='10',
    season='2026'
)
df_all = live_players.get_data_frames()[0]

# 2. Get player stats
stats = fetch_with_retry(
    leaguedashplayerstats.LeagueDashPlayerStats,
    league_id_nullable='10',
    season='2026'
)
df_stats = stats.get_data_frames()[0]

player_data = []

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

# Sort by highest PPG
player_data.sort(key=lambda x: x['ppg'], reverse=True)

with open('players.js', 'w') as f:
    f.write(f"const allPlayers = {json.dumps(player_data)};")

print(f"Success! Generated players.js with {len(player_data)} players sorted by PPG.")
