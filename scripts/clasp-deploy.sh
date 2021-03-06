set -e

# Current Directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

# Set environment vars
source "$DIR/Helpers/exporter.sh" APPS_SCRIPT_ID

# Deploy command
OUTPUT=$(clasp deploy -i $APPS_SCRIPT_ID)
echo "${OUTPUT}"
