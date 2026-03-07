while true; do
  sleep 30

  git add .

  if ! git diff --cached --quiet; then
    git commit -m "auto commit @$(date)"
    git push origin main
  fi

done