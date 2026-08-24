import json
import requests

def fetch_wnba_players():
    teams_url = "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams"
    print("Fetching WNBA teams...")
    response = requests.get(teams_url, timeout=20)
    response.raise_for_status()
    data = response.json()
    
    players_list = []
    seen_ids = set()
    
    # Navigate sports -> leagues -> teams
    sports = data.get('sports', [])
    if not sports:
        return []
    leagues = sports[0].get('leagues', [])
    if not leagues:
        return []
    teams_data = leagues[0].get('teams', [])
    
    for item in teams_data:
        team_obj = item.get('team', {})
        team_id = team_obj.get('id')
        team_name = team_obj.get('displayName', 'Unknown Team')
        
        if not team_id:
            continue
            
        roster_url = f"https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/teams/{team_id}/roster"
        print(f"Fetching roster for {team_name}...")
        try:
            r = requests.get(roster_url, timeout=10)
            if r.status_code == 200:
                roster_data = r.json()
                athletes = roster_data.get('athletes', [])
                
                # Handle both grouped and flat roster structures from ESPN
                for entry in athletes:
                    player_items = entry.get('items', []) if 'items' in entry else [entry]
                    for player in player_items:
                        pid = player.get('id')
                        name = player.get('displayName') or player.get('fullName')
                        
                        if not pid or not name or pid in seen_ids:
                            continue
                        seen_ids.add(pid)
                        
                        headshot_url = f"https://a.espncdn.com/i/headshots/wnba/players/full/{pid}.png"
                        
                        players_list.append({
                            "id": pid,
                            "name": name,
                            "team": team_name,
                            "ppg": 0.0, # Will display correctly once populated or used in your game logic
                            "headshot": headshot_url
                        })
        except Exception as e:
            print(f"Error fetching roster for {team_name}: {e}")
            
    print(f"Successfully processed {len(players_list)} players across all teams.")
    return players_list

def save_to_js(players, filename="players.js"):
    players_sorted = sorted(players, key=lambda x: x['name'])
    file_content = f"const allPlayers = {json.dumps(players_sorted, indent=2)};\n"
    with open(filename, "w", encoding="utf-8") as f:
        f.write(file_content)
    print(f"Saved player data to {filename}")

if __name__ == "__main__":
    try:
        players = fetch_wnba_players()
        if players:
            save_to_js(players)
        else:
            print("Warning: No players returned.")
            exit(1)
    except Exception as e:
        print(f"Error fetching data: {e}")
        exit(1)
