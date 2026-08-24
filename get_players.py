import json
import requests

def fetch_wnba_players():
    url = "https://site.web.api.espn.com/apis/common/v3/sports/basketball/wnba/statistics/byathlete"
    params = {
        "region": "us",
        "lang": "en",
        "season": "2026",
        "seasontype": "2",
        "limit": "300"
    }
    
    print("Fetching WNBA players and stats from ESPN API...")
    response = requests.get(url, params=params, timeout=20)
    response.raise_for_status()
    data = response.json()
    
    players_list = []
    athletes = data.get('athletes', [])
    
    for entry in athletes:
        athlete = entry.get('athlete', {})
        player_id = athlete.get('id')
        name = athlete.get('displayName')
        
        if not player_id or not name:
            continue
        
        team_name = "Free Agent"
        team_obj = athlete.get('team')
        if team_obj:
            team_name = team_obj.get('displayName', team_obj.get('name', 'Unknown'))
            
        ppg = 0.0
        stats = entry.get('stats', [])
        for stat in stats:
            if stat.get('name') == 'points' or 'points' in stat.get('displayName', '').lower():
                try:
                    ppg = float(stat.get('value', 0.0))
                except (ValueError, TypeError):
                    pass
                    
        # Construct the reliable ESPN headshot URL directly using the player ID
        headshot_url = f"https://a.espncdn.com/i/headshots/wnba/players/full/{player_id}.png"
                    
        players_list.append({
            "id": player_id,
            "name": name,
            "team": team_name,
            "ppg": round(ppg, 1),
            "headshot": headshot_url
        })
        
    print(f"Successfully processed {len(players_list)} players.")
    return players_list

def save_to_js(players, filename="players.js"):
    players_sorted = sorted(players, key=lambda x: x['ppg'], reverse=True)
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
