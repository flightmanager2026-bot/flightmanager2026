/* -- LOTNISKO -- */
{
        "type": "text",
        "text": "{\"returncode\":0,\"stdout\":\"/* -- LOTNISKO -- */\\n\\nfunction renderLotnisko(body) {\\n  var ap = G.homeAirport;\\n  if(!ap) { body.innerHTML='<div style=\\\"padding:20px;color:#94a3b8;text-align:center;\\\">Brak bazy</div>'; return; }\\n\\n  // Init airport upgrades if not present\\n  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};\\n  if(!ap.income) ap.income = 0;\\n\\n  var u = ap.upgrades;\\n\\n  function upgradeRow(key, label, icon, desc, cost, level, maxLevel) {\\n    var canUp = level < maxLevel;\\n    var affo\\n\",\"stderr\":\"\"}",
        "uuid": "b6dbdb7c-0cae-4014-98ae-a2636e9fedc2"
      }
    ],
    "is_error": false,
    "structured_content": null,
    "meta": null,
    "message": null,
    "integration_name": null,
    "mcp_server_url": null,
    "integration_icon_url": null,
    "icon_name": "commandLine",
    "display_content": {
      "type": "json_block",
      "json_block": "{\"returncode\":0,\"stdout\":\"/* -- LOTNISKO -- */\\n\\nfunction renderLotnisko(body) {\\n  var ap = G.homeAirport;\\n  if(!ap) { body.innerHTML='<div style=\\\"padding:20px;color:#94a3b8;text-align:center;\\\">Brak bazy</div>'; return; }\\n\\n  // Init airport upgrades if not present\\n  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};\\n  if(!ap.income) ap.income = 0;\\n\\n  var u = ap.upgrades;\\n\\n  function upgradeRow(key, label, icon, desc, cost, level, maxLevel) {\\n    var canUp = level < maxLevel;\\n    var affo\\n\",\"stderr\":\"\"}"
    }
  },
  {
    "start_timestamp": "2026-05-13T10:43:36.345074Z",
    "stop_timestamp": "2026-05-13T10:43:37.069913Z",
    "flags": null,
    "type": "tool_use",
    "id": "toolu_017VjDxG9cjAft16F4RHwxq5",
    "name": "bash_tool",
    "input": {
      "command": "python3 << 'PYEOF'\nwith open('/mnt/user-data/outputs/fm2026v2/js/screens/lotnisko.js') as f:\n    lotnisko = f.read()\n\n# Find upgradeAirport function\nidx = lotnisko.find('function upgradeAirport(')\nprint(lotnisko[idx:idx+300])\nPYEOF",
      "description": "Find upgradeAirport function"
    },
    "message": "Find upgradeAirport function",
    "integration_name": null,
    "integration_icon_url": null,
    "icon_name": "commandLine",
    "context": null,
    "display_content": {
      "type": "json_block",
      "json_block": "{\"language\": \"bash\", \"code\": \"python3 << 'PYEOF'\\nwith open('/mnt/user-data/outputs/fm2026v2/js/screens/lotnisko.js') as f:\\n    lotnisko = f.read()\\n\\n# Find upgradeAirport function\\nidx = lotnisko.find('function upgradeAirport(')\\nprint(lotnisko[idx:idx+300])\\nPYEOF\"}"
    },
    "approval_options": null,
    "approval_key": null,
    "is_mcp_app": null,
    "mcp_server_url": null
  },
  {
    "start_timestamp": null,
    "stop_timestamp": null,
    "flags": null,
    "type": "tool_result",
    "tool_use_id": "toolu_017VjDxG9cjAft16F4RHwxq5",
    "name": "bash_tool",
    "content": [
      {
        "type": "text",
        "text": "{\"returncode\":0,\"stdout\":\"function upgradeAirport(key) {\\n  var ap = G.homeAirport;\\n  if(!ap) return;\\n  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};\\n  if(!ap.income) ap.income = 0;\\n\\n  var costs = {\\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\\n    terminal: [0, 300000, 800000,\\n\",\"stderr\":\"\"}",
        "uuid": "a52ec7ce-0871-40e2-9463-835a243e0c8d"
      }
    ],
    "is_error": false,
    "structured_content": null,
    "meta": null,
    "message": null,
    "integration_name": null,
    "mcp_server_url": null,
    "integration_icon_url": null,
    "icon_name": "commandLine",
    "display_content": {
      "type": "json_block",
      "json_block": "{\"returncode\":0,\"stdout\":\"function upgradeAirport(key) {\\n  var ap = G.homeAirport;\\n  if(!ap) return;\\n  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};\\n  if(!ap.income) ap.income = 0;\\n\\n  var costs = {\\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\\n    terminal: [0, 300000, 800000,\\n\",\"stderr\":\"\"}"
    }
  },
  {
    "start_timestamp": "2026-05-13T10:43:39.816366Z",
    "stop_timestamp": "2026-05-13T10:43:41.860135Z",
    "flags": null,
    "type": "tool_use",
    "id": "toolu_01PufKUNRttsGTFwMMH8xKGJ",
    "name": "bash_tool",
    "input": {
      "command": "python3 << 'PYEOF'\nwith open('/mnt/user-data/outputs/fm2026v2/js/screens/lotnisko.js') as f:\n    lotnisko = f.read()\n\n# Replace terminal upgrade to be unlimited with 300000 per level\nold_costs = \"\"\"  var costs = {\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\n    terminal: [0, 300000, 800000,\"\"\"\n\n# Find full costs block\nidx = lotnisko.find('var costs = {')\nend = lotnisko.find('};', idx) + 2\nold_costs_full = lotnisko[idx:end]\nprint(\"Old costs:\", old_costs_full[:200])\nPYEOF",
      "description": "Find costs block"
    },
    "message": "Find costs block",
    "integration_name": null,
    "integration_icon_url": null,
    "icon_name": "commandLine",
    "context": null,
    "display_content": {
      "type": "json_block",
      "json_block": "{\"language\": \"bash\", \"code\": \"python3 << 'PYEOF'\\nwith open('/mnt/user-data/outputs/fm2026v2/js/screens/lotnisko.js') as f:\\n    lotnisko = f.read()\\n\\n# Replace terminal upgrade to be unlimited with 300000 per level\\nold_costs = \\\"\\\"\\\"  var costs = {\\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\\n    terminal: [0, 300000, 800000,\\\"\\\"\\\"\\n\\n# Find full costs block\\nidx = lotnisko.find('var costs = {')\\nend = lotnisko.find('};', idx) + 2\\nold_costs_full = lotnisko[idx:end]\\nprint(\\\"Old costs:\\\", old_costs_full[:200])\\nPYEOF\"}"
    },
    "approval_options": null,
    "approval_key": null,
    "is_mcp_app": null,
    "mcp_server_url": null
  },
  {
    "start_timestamp": null,
    "stop_timestamp": null,
    "flags": null,
    "type": "tool_result",
    "tool_use_id": "toolu_01PufKUNRttsGTFwMMH8xKGJ",
    "name": "bash_tool",
    "content": [
      {
        "type": "text",
        "text": "{\"returncode\":0,\"stdout\":\"Old costs: var costs = {\\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\\n    terminal: [0, 300000, 800000,  2000000, 5000000],\\n    hangar:   [0, 200000, 600000,  1500000, 4000000],\\n    shops:    [0, 40000\\n\",\"stderr\":\"\"}",
        "uuid": "b3c5f3e2-fbd1-41e5-999f-774126aad4c2"
      }
    ],
    "is_error": false,
    "structured_content": null,
    "meta": null,
    "message": null,
    "integration_name": null,
    "mcp_server_url": null,
    "integration_icon_url": null,
    "icon_name": "commandLine",
    "display_content": {
      "type": "json_block",
      "json_block": "{\"returncode\":0,\"stdout\":\"Old costs: var costs = {\\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\\n    terminal: [0, 300000, 800000,  2000000, 5000000],\\n    hangar:   [0, 200000, 600000,  1500000, 4000000],\\n    shops:    [0, 40000\\n\",\"stderr\":\"\"}"
    }
  },
  {
    "start_timestamp": "2026-05-13T10:43:45.132822Z",
    "stop_timestamp": "2026-05-13T10:43:59.896169Z",
    "flags": null,
    "type": "tool_use",
    "id": "toolu_01SvPc6qAne7vXit4Yf1CTAD",
    "name": "bash_tool",
    "input": {
      "command": "python3 << 'PYEOF'\nwith open('/mnt/user-data/outputs/fm2026v2/js/screens/lotnisko.js') as f:\n    lotnisko = f.read()\n\n# 1. Fix terminal upgrade cost - dynamic per level (unlimited)\nold_upgrade = \"\"\"function upgradeAirport(key) {\n  var ap = G.homeAirport;\n  if(!ap) return;\n  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};\n  if(!ap.income) ap.income = 0;\n\n  var costs = {\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\n    terminal: [0, 300000, 800000,  2000000, 5000000],\n    hangar:   [0, 200000, 600000,  1500000, 4000000],\n    shops:    [0, 40000\"\"\"\n\nnew_upgrade = \"\"\"function getTerminalCost(level) {\n  // Kazdy poziom terminala kosztuje wiecej: 300k * level\n  return 300000 * level;\n}\n\nfunction getTerminalCapacity() {\n  var ap = G.homeAirport;\n  if(!ap || !ap.upgrades) return 1000;\n  return (ap.upgrades.terminal || 1) * 1000;\n}\n\nfunction getPassengersLast2h() {\n  // Zlicz pasazerow ktorzy odlecieli w ostatnich 2h\n  var now = Date.now();\n  var twoHours = 2 * 60 * 60 * 1000;\n  if(!G.departurelog) G.departurelog = [];\n  // Usun stare wpisy\n  G.departurelog = G.departurelog.filter(function(e){ return now - e.time < twoHours; });\n  return G.departurelog.reduce(function(sum, e){ return sum + e.pax; }, 0);\n}\n\nfunction canDepart(paxCount) {\n  var cap = getTerminalCapacity();\n  var used = getPassengersLast2h();\n  return used + paxCount <= cap;\n}\n\nfunction logDeparture(paxCount) {\n  if(!G.departurelog) G.departurelog = [];\n  G.departurelog.push({time: Date.now(), pax: paxCount});\n  save();\n}\n\nfunction upgradeAirport(key) {\n  var ap = G.homeAirport;\n  if(!ap) return;\n  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};\n  if(!ap.income) ap.income = 0;\n\n  var costs = {\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\n    terminal: [0, 300000, 800000,  2000000, 5000000],\n    hangar:   [0, 200000, 600000,  1500000, 4000000],\n    shops:    [0, 40000\"\"\"\n\nlotnisko = lotnisko.replace(old_upgrade, new_upgrade)\n\n# 2. Fix terminal upgrade to be unlimited\nold_terminal_up = \"\"\"  // Calculate cost\n  var level = u[key] || 0;\n  var maxLevel = costs[key] ? costs[key].length - 1 : 5;\n  if(level >= maxLevel && key !== 'runways') { showMsg('Maksymalny poziom!'); return; }\n  var cost = costs[key] ? (costs[key][level+1] || 0) : 0;\"\"\"\n\nnew_terminal_up = \"\"\"  // Calculate cost\n  var level = u[key] || 0;\n  var maxLevel = key === 'terminal' ? 9999 : (costs[key] ? costs[key].length - 1 : 5);\n  if(level >= maxLevel && key !== 'terminal') { showMsg('Maksymalny poziom!'); return; }\n  var cost = key === 'terminal' ? getTerminalCost(level + 1) : (costs[key] ? (costs[key][level+1] || 0) : 0);\"\"\"\n\nlotnisko = lotnisko.replace(old_terminal_up, new_terminal_up)\n\n# 3. Fix renderLotnisko to show terminal capacity info\nold_terminal_row = \"\"\"upgradeRow('terminal', 'Terminal', '\ud83c\udfe2', 'Wieksza przepustowosc pasazerow',\"\"\"\nnew_terminal_row = \"\"\"upgradeRow('terminal', 'Terminal LVL '+(u.terminal||1), '\ud83c\udfe2', 'Przepustowosc: '+((u.terminal||1)*1000)+'/2h | Uzyte: '+getPassengersLast2h()+'/'+getTerminalCapacity(),\"\"\"\n\nlotnisko = lotnisko.replace(old_terminal_row, new_terminal_row)\n\nimport subprocess, tempfile, os\nwith tempfile.NamedTemporaryFile(suffix='.js',mode='w',delete=False) as f:\n    f.write(lotnisko); tmp=f.name\nr=subprocess.run(['node','--check',tmp],capture_output=True,text=True)\nprint(\"JS:\", \"OK\" if r.returncode==0 else r.stderr[:200])\nos.unlink(tmp)\n\nwith open('/mnt/user-data/outputs/fm2026v2/js/screens/lotnisko.js','w') as f:\n    f.write(lotnisko)\nprint(\"Done\")\nPYEOF",
      "description": "Add terminal capacity system to lotnisko.js"
    },
    "message": "Add terminal capacity system to lotnisko.js",
    "integration_name": null,
    "integration_icon_url": null,
    "icon_name": "commandLine",
    "context": null,
    "display_content": {
      "type": "json_block",
      "json_block": "{\"language\": \"bash\", \"code\": \"python3 << 'PYEOF'\\nwith open('/mnt/user-data/outputs/fm2026v2/js/screens/lotnisko.js') as f:\\n    lotnisko = f.read()\\n\\n# 1. Fix terminal upgrade cost - dynamic per level (unlimited)\\nold_upgrade = \\\"\\\"\\\"function upgradeAirport(key) {\\n  var ap = G.homeAirport;\\n  if(!ap) return;\\n  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};\\n  if(!ap.income) ap.income = 0;\\n\\n  var costs = {\\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\\n    terminal: [0, 300000, 800000,  2000000, 5000000],\\n    hangar:   [0, 200000, 600000,  1500000, 4000000],\\n    shops:    [0, 40000\\\"\\\"\\\"\\n\\nnew_upgrade = \\\"\\\"\\\"function getTerminalCost(level) {\\n  // Kazdy poziom terminala kosztuje wiecej: 300k * level\\n  return 300000 * level;\\n}\\n\\nfunction getTerminalCapacity() {\\n  var ap = G.homeAirport;\\n  if(!ap || !ap.upgrades) return 1000;\\n  return (ap.upgrades.terminal || 1) * 1000;\\n}\\n\\nfunction getPassengersLast2h() {\\n  // Zlicz pasazerow ktorzy odlecieli w ostatnich 2h\\n  var now = Date.now();\\n  var twoHours = 2 * 60 * 60 * 1000;\\n  if(!G.departurelog) G.departurelog = [];\\n  // Usun stare wpisy\\n  G.departurelog = G.departurelog.filter(function(e){ return now - e.time < twoHours; });\\n  return G.departurelog.reduce(function(sum, e){ return sum + e.pax; }, 0);\\n}\\n\\nfunction canDepart(paxCount) {\\n  var cap = getTerminalCapacity();\\n  var used = getPassengersLast2h();\\n  return used + paxCount <= cap;\\n}\\n\\nfunction logDeparture(paxCount) {\\n  if(!G.departurelog) G.departurelog = [];\\n  G.departurelog.push({time: Date.now(), pax: paxCount});\\n  save();\\n}\\n\\nfunction upgradeAirport(key) {\\n  var ap = G.homeAirport;\\n  if(!ap) return;\\n  if(!ap.upgrades) ap.upgrades = {runways:1, terminal:1, hangar:1, shops:0, parking:0};\\n  if(!ap.income) ap.income = 0;\\n\\n  var costs = {\\n    runways:  [0, 500000, 1500000, 4000000, 10000000],\\n    terminal: [0, 300000, 800000,  2000000, 5000000],\\n    hangar:   [0, 200000, 600000,  1500000, 4000000],\\n    shops:    [0, 40000\\\"\\\"\\\"\\n\\nlotnisko = lotnisko.replace(old_upgrade, new_upgrade)\\n\\n# 2. Fix terminal upgrade to be unlimited\\nold_terminal_up = \\\"\\\"\\\"  // Calculate cost\\n  var level = u[key] || 0;\\n  var maxLevel = costs[key] ? costs[key].length - 1 : 5;\\n  if(level >= maxLevel && key !== 'runways') { showMsg('Maksymalny poziom!'); return; }\\n  var cost = costs[key] ? (costs[key][level+1] || 0) : 0;\\\"\\\"\\\"\\n\\nnew_terminal_up = \\\"\\\"\\\"  // Calculate cost\\n  var level = u[key] || 0;\\n  var maxLevel = key === 'terminal' ? 9999 : (costs[key] ? costs[key].length - 1 : 5);\\n  if(level >= maxLevel && key !== 'terminal') { showMsg('Maksymalny poziom!'); return; }\\n  var cost = key === 'terminal' ? getTerminalCost(level + 1) : (costs[key] ? (costs[key][level+1] || 0) : 0);\\\"\\\"\\\"\\n\\nlotnisko = lotnisko.replace(old_terminal_up, new_terminal_up)\\n\\n# 3. Fix renderLotnisko to show terminal capacity info\\nold_terminal_row = \\\"\\\"\\\"upgradeRow('terminal', 'Terminal', '\\ud83c\\udfe2', 'Wieksza przepustowosc pasazerow',\\\"\\\"\\\"\\nnew_terminal_row = \\\"\\\"\\\"upgradeRow('terminal', 'Terminal LVL '+(u.terminal||1), '\\ud83c\\udfe2', 'Przepustowosc: '+((u.terminal||1)*1000)+'/2h | Uzyte: '+getPassengersLast2h()+'/'+getTerminalCapacity(),\\\"\\\"\\\"\\n\\nlotnisko = lotnisko.replace(old_terminal_row, new_terminal_row)\\n\\nimport subprocess, tempfile, os\\nwith tempfile.NamedTemporaryFile(suffix='.js',mode='w',delete=False) as f:\\n    f.write(lotnisko); tmp=f.name\\nr=subprocess.run(['node','--check',tmp],capture_output=True,text=True)