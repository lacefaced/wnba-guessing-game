import json
import pandas as pd
from nba_api.stats.endpoints import commonallplayers, leaguedashplayerstats

print("Fetching live WNBA roster and stats for 2026...")

# 1. Get ALL active players (keeps our rookies who might have 0 games played)
live_players = commonallplayers.CommonAllPlayers(is_only_current_season=1, league_id='10', season='2026')
df_all = live_players.get_data_frames()[0]

# 2. Get player stats to calculate PPG
stats = leaguedashplayerstats.LeagueDashPlayerStats(league_id_nullable='10', season='2026')
df_stats = stats.get_data_frames()[0]

player_data = []

for _, row in df_all.iterrows():
    name = row['DISPLAY_FIRST_LAST']
    
    team_name = str(row['TEAM_NAME'])
    team = f"{row['TEAM_CITY']} {team_name}".strip() if team_name.lower() not in ["nan", "none"] else "Free Agent"
        
    # Find this player's stats using their unique ID
    player_id = row['PERSON_ID']
    stat_row = df_stats[df_stats['PLAYER_ID'] == player_id]
    
    ppg = 0.0
    # If they have played, calculate PTS divided by GP (Games Played)
    if not stat_row.empty:
        games = int(stat_row['GP'].iloc[0])
        points = float(stat_row['PTS'].iloc[0])
        if games > 0:
            ppg = round(points / games, 1)


    # NEW: We are now saving the "id" into the javascript file!
    player_data.append({"name": name, "team": team, "ppg": ppg, "id": player_id})

# 3. Sort the final list by PPG (highest to lowest)
player_data.sort(key=lambda x: x['ppg'], reverse=True)

with open('players.js', 'w') as f:
    f.write(f"const allPlayers = {json.dumps(player_data)};")

print(f"Success! Generated {len(player_data)} players sorted by PPG.")