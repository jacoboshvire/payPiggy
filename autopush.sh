# Create the script
nano autopush.sh

# Paste this in:
while true; do
  sleep 30
  git add .
  git commit -m "commit @$(date)"
  git push -u origin main
done

# Make it executable and run it
chmod +x autopush.sh
bash autopush.sh