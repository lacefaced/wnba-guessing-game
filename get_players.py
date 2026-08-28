import json
import requests

def fetch_wnba_data():
    # Step 1: Extract PPG and Position from the stats endpoint using player IDs
    ppg_map = {}
    position_map = {}
    
    stats_url = "https://site.web.api.espn.com/apis/common/v3/sports/basketball/wnba/statistics/byathlete"
    params = {
        "region": "us",
        "lang": "en",
        "season": "2026",
        "seasontype": "2",
        "limit": "300"
    }
    
    print("Fetching WNBA player stats and positions...")
    try:
        resp = requests.get(stats_url, params=params, timeout=20)
        if resp.status_code == 200:
            stats_data = resp.json()
            for entry in stats_data.get('athletes', []):
                athlete = entry.get('athlete', {})
                pid = athlete.get('id')
                if not pid:
                    continue
                
                # Extract Position (e.g., Center, Guard, Forward)
                pos_obj = athlete.get('position', {})
                position_map[pid] = pos_obj.get('abbreviation', pos_obj.get('displayName', 'Player'))
                
                # Extract PPG from offensive category values[1]
                player_ppg = 0.0
                for cat in entry.get('categories', []):
                    if cat.get('name') == 'offensive':
                        values = cat.get('values', [])
                        if len(values) > 1:
                            try:
                                player_ppg = float(values[1])
                            except (ValueError, TypeError):
                                pass
                        break
                ppg_map[pid] = player_ppg
    except Exception as e:
        print(f"Warning: Could not fetch stats endpoint: {e}")

    # Step 2: Fetch teams and rosters for accurate team names and headshots
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
                                position = position_map.get(pid, 'Player')
                                jersey = player.get('jersey') or player.get('uniformNumber') or ''
                                birth_place = player.get('birthPlace') or {}
                                college = player.get('college') or {}
                                experience = player.get('experience') or {}
                                status = player.get('status') or {}
                                injuries = player.get('injuries') or []
                                injury_status = next((injury.get('status') for injury in injuries if injury.get('status')), '')
                                profile_link = next((link.get('href') for link in player.get('links', []) if 'athlete' in link.get('rel', []) and link.get('href', '').startswith('http')), '')
                                
                                players_list.append({
                                    "id": pid,
                                    "name": name,
                                    "team": team_name,
                                    "position": position,
                                    "jersey": str(jersey),
                                    "age": player.get('age'),
                                    "height": player.get('displayHeight', ''),
                                    "college": college.get('name', ''),
                                    "birthPlace": ', '.join(filter(None, [birth_place.get('city'), birth_place.get('state'), birth_place.get('country')])),
                                    "experience": experience.get('years'),
                                    "status": injury_status or status.get('displayName') or status.get('name', ''),
                                    "profile": profile_link,
                                    "ppg": round(float(ppg), 1),
                                    "headshot": headshot_url
                                })
                except Exception as e:
                    print(f"Error fetching roster for {team_name}: {e}")
                    
    print(f"Successfully processed {len(players_list)} players with stats, positions, and teams.")
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
