import json
import re
from collections import OrderedDict

def clean_location_name(address):
    """Extract clean city, state from various address formats"""
    
    # Remove extra whitespace, newlines, and special characters
    address = ' '.join(address.split())
    address = address.replace('\n', ' '). replace('\r', '')
    
    # Pattern 1: "City, County, State" format
    match = re.search(r',\s*([A-Za-z\s]+),\s*[A-Za-z\s]+,\s*([A-Za-z]+)', address)
    if match:
        city = match.group(1).strip(). title()
        state = match. group(2).strip()
        # Convert state name to abbreviation if needed
        if len(state) > 2:
            state_map = {
                'Nevada': 'NV', 'California': 'CA', 'Arizona': 'AZ',
                'Texas': 'TX', 'Florida': 'FL', 'New York': 'NY'
            }
            state = state_map.get(state, state[:2]. upper())
        return f"{city}, {state}"
    
    # Pattern 2: "LAS VEGAS, NV" format
    match = re.search(r'([A-Z][A-Za-z\s]+),\s*([A-Z]{2})(? :,|\s|$)', address)
    if match:
        city = match.group(1).strip().title()
        state = match.group(2).strip(). upper()
        return f"{city}, {state}"
    
    # Pattern 3: Contains "Las Vegas"
    if 'las vegas' in address.lower():
        return "Las Vegas, NV"
    
    return None

def extract_locations_from_json(json_file_path):
    """Extract and consolidate unique locations"""
    
    try:
        # Read file with different encodings
        try:
            with open(json_file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except UnicodeDecodeError:
            with open(json_file_path, 'r', encoding='utf-8-sig') as f:
                content = f.read()
        
        # Remove any BOM or special characters
        content = content.replace('\ufeff', '')
        
        # Parse JSON
        data = json.loads(content)
        
    except json.JSONDecodeError as e:
        raise Exception(f"JSON decode error: {e}")
    
    locations = OrderedDict()
    
    # Get results
    results = data.get('results', []) if isinstance(data, dict) else data
    
    for result in results:
        pickup = result.get('pickup')
        
        if not pickup or not pickup.get('address'):
            continue
        
        address = pickup['address']
        latitude = pickup. get('latitude', 0)
        longitude = pickup.get('longitude', 0)
        
        # Skip if missing coordinates
        if not latitude or not longitude:
            continue
        
        # Clean location name
        location_name = clean_location_name(address)
        
        if not location_name:
            continue
        
        # Use location name as key
        key = location_name.lower()
        
        if key not in locations:
            locations[key] = {
                "name": location_name,
                "full_address": address. replace('"', '\\"').replace('\n', ' '),
                "latitude": latitude,
                "longitude": longitude
            }
    
    return sorted(locations.values(), key=lambda x: x['name'])

def generate_typescript_file(locations):
    """Generate TypeScript file"""
    
    lines = [
        "export interface Location {",
        "  name: string;",
        "  full_address: string;",
        "  latitude: number;",
        "  longitude: number;",
        "}",
        "",
        "export const LOCATIONS: Location[] = ["
    ]
    
    for loc in locations:
        name = loc['name']. replace('"', '\\"')
        address = loc['full_address'].replace('"', '\\"')
        
        lines.append("  {")
        lines.append(f'    name: "{name}",')
        lines.append(f'    full_address: "{address}",')
        lines.append(f'    latitude: {loc["latitude"]},')
        lines.append(f'    longitude: {loc["longitude"]}')
        lines.append("  },")
    
    lines. append("];")
    
    return "\n".join(lines)

if __name__ == "__main__":
    import sys
    
    json_file = sys. argv[1] if len(sys.argv) > 1 else 'car-results.json'
    
    try:
        locations = extract_locations_from_json(json_file)
        
        if not locations:
            print("export const LOCATIONS: Location[] = [];")
        else:
            print(generate_typescript_file(locations))
            print(f"\n// Extracted {len(locations)} unique locations", file=sys.stderr)
        
    except Exception as e:
        import traceback
        print(f"// Error: {str(e)}", file=sys. stderr)
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)