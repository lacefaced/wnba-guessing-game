import json
import requests

def fetch_wnba_data():
    ppg_map = {}
    stats_url = "https://site.web.api.espn.com/apis/common/v3/sports/basketball/wnba/statistics/byathlete"
    params = {
        "region": "us",
        "lang": "en",
        "season": "2026",
        "seasontype": "2",
        "category": "offensive",
        "limit": "300"
    }
    
    print("Fetching WNBA player stats...")
    try:
        resp = requests.get(stats_url, params=params, timeout=20)
        if resp.status_code == 200:
            stats_data = resp.json()
            for entry in stats_data.get('athletes', []):
                athlete = entry.get('athlete', {})
                pid = athlete.get('id')
                if not pid:
                    continue
                
                player_ppg = 0.0
                
                # Check flat stats list
                for stat in entry.get('stats', []):
                    name = str(stat.get('name', '')).lower()
                    display = str(stat.get('displayName', '')).lower()
                    if name in ['points', 'avgpoints', 'pts', 'ppg', 'pointspergame'] or 'point' in display:
                        try:
                            player_ppg = float(stat.get('value', stat.get('displayValue', 0.0)))
                            break
                        except (ValueError, TypeError):
                            pass
                
                # Check category-nested stats if flat list missed it
                if player_ppg == 0.0:
                    for cat in entry.get('categories', []):
                        for stat in cat.get('stats', []):
                            name = str(stat.get('name', '')).lower()
                            display = str(stat.get('displayName', '')).lower()
                            if name in ['points', 'avgpoints', 'pts', 'ppg', 'pointspergame'] or 'point' in display:
                                try:
                                    player_ppg = float(stat.get('value', stat.get('displayValue', 0.0)))
                                    break
                                except (ValueError, TypeError):
                                    pass
                        if player_ppg > 0.0:
                            break
                            
                ppg_map[pid] = player_ppg
    except Exception as e:
        print(f"Warning: Could not fetch stats endpoint: {e}")

    # Fetch teams and rosters for accurate team names and headshots
    teams_url = "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams"
    print("Fetching WNBA teams and rosters...")
    response = requests.get(teams_url, timeout=20)
    response.raise_for_status()
    teams_data = response.json()
    
    players_list = []
    seen_ids = set()
    
    sports = teams_data.get('sports', [])
    if sports:
        leagues = sports[0].get('leagues', [])
        if leagues:
            teams_array = leagues[0].get('teams', [])
            for item in teams_array:
                team_obj = item.get('team', {})
                team_id = team_obj.get('id')
                team_name = team_obj.get('displayName', 'Unknown Team')
                
                if not team_id:
                    continue
                    
                roster_url = f"https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams/{team_id}/roster"
                try:
                    r = requests.get(roster_url, timeout=10)
                    if r.status_code == 200:
                        roster_data = r.json()
                        athletes = roster_data.get('athletes', [])
                        
                        for entry in athletes:
                            player_items = entry.get('items', []) if 'items' in entry else [entry]
                            for player in player_items:
                                pid = player.get('id')
                                name = player.get('displayName') or player.get('fullName')
                                
                                if not pid or not name or pid in seen_ids:
                                    continue
                                seen_ids.add(pid)
                                
                                headshot_url = f"https://a.espncdn.com/i/headshots/wnba/players/full/{pid}.png"
                                ppg = ppg_map.get(pid, 0.0)
                                
                                players_list.append({
                                    "id": pid,
                                    "name": name,
                                    "team": team_name,
                                    "ppg": round(float(ppg), 1),
                                    "headshot": headshot_url
                                })
                except Exception as e:
                    print(f"Error fetching roster for {team_name}: {e}")
                    
    print(f"Successfully processed {len(players_list)} players with stats and teams.")
    return players_list

def save_to_js(players, filename="players.js"):
    players_sorted = sorted(players, key=lambda x: x['ppg'], reverse=True)
    file_content = f"const allPlayers = {json.dumps(players_sorted, indent=2)};\n"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(file_content)
    print(f"Saved player data to {filename}")

if __name__ == "__main__":
    try:
        players = fetch_wnba_data()
        if players:
            save_to_js(players)
        else:
            print("Warning: No players returned.")
            exit(1)
    except Exception as e:
        print(f"Error fetching data: {e}")
        exit(1)
