#!/bin/bash
# optimize-images.sh — Compress images using sips (macOS native) + ffmpeg
# Run from project root: bash scripts/optimize-images.sh

set -e
cd "$(dirname "$0")/.."

ASSETS="public/assets"
BACKUP_DIR=".image-backup"

echo "=== Festival Image Optimization ==="
echo ""

# 1. Large hero/concurso PNGs → JPEG (85% quality, max 1920px wide)
echo "--- Converting large PNGs to JPEG ---"

convert_to_jpg() {
  local src="$1"
  local max_w="$2"
  local quality="${3:-85}"
  local base="${src%.*}"
  local dst="${base}.jpg"

  if [ ! -f "$src" ]; then
    echo "  SKIP (not found): $src"
    return
  fi

  # If src is already .jpg, just resize in place
  if [ "$src" = "$dst" ]; then
    echo "  Resizing: $src (max ${max_w}px, q${quality})"
    sips --resampleWidth "$max_w" -s format jpeg -s formatOptions "$quality" "$src" --out "$src" 2>/dev/null
    return
  fi

  echo "  Converting: $src → $dst (max ${max_w}px, q${quality})"
  sips --resampleWidth "$max_w" -s format jpeg -s formatOptions "$quality" "$src" --out "$dst" 2>/dev/null

  # Remove original PNG only if JPEG was created successfully
  if [ -f "$dst" ]; then
    local old_size=$(du -k "$src" | cut -f1)
    local new_size=$(du -k "$dst" | cut -f1)
    echo "    ${old_size}KB → ${new_size}KB ($(( (old_size - new_size) * 100 / old_size ))% smaller)"
    rm "$src"
  fi
}

# Hero images
convert_to_jpg "$ASSETS/hero-concert.png" 1920 85
convert_to_jpg "$ASSETS/hero-apoie.jpg" 1920 85

# Concurso images
convert_to_jpg "$ASSETS/jovem.png" 1200 85
convert_to_jpg "$ASSETS/rock.png" 1200 85
convert_to_jpg "$ASSETS/raka.png" 1200 85
convert_to_jpg "$ASSETS/concurso-estudantil.png" 1200 85
convert_to_jpg "$ASSETS/hackathon.png" 1200 85

# Location photo
convert_to_jpg "$ASSETS/foto-maringa.png" 1920 85

# Mega concert card
convert_to_jpg "$ASSETS/mega-concert-card.png" 1200 85

echo ""
echo "--- Optimizing carousel images ---"

for img in "$ASSETS/carrossel/"*.{JPG,jpg,jpeg,png,PNG}; do
  [ -f "$img" ] || continue

  # Get current width
  w=$(sips -g pixelWidth "$img" 2>/dev/null | tail -1 | awk '{print $2}')

  if [ "$w" -gt 800 ] 2>/dev/null; then
    old_size=$(du -k "$img" | cut -f1)

    # Convert to jpg if PNG
    ext="${img##*.}"
    if [[ "$ext" == "png" || "$ext" == "PNG" ]]; then
      base="${img%.*}"
      dst="${base}.jpg"
      sips --resampleWidth 800 -s format jpeg -s formatOptions 75 "$img" --out "$dst" 2>/dev/null
      if [ -f "$dst" ]; then
        rm "$img"
        new_size=$(du -k "$dst" | cut -f1)
        echo "  $img → ${old_size}KB → ${new_size}KB"
      fi
    else
      sips --resampleWidth 800 -s format jpeg -s formatOptions 75 "$img" --out "$img" 2>/dev/null
      new_size=$(du -k "$img" | cut -f1)
      echo "  $img: ${old_size}KB → ${new_size}KB"
    fi
  else
    # Just recompress
    old_size=$(du -k "$img" | cut -f1)
    sips -s format jpeg -s formatOptions 75 "$img" --out "$img" 2>/dev/null
    new_size=$(du -k "$img" | cut -f1)
    echo "  $img: ${old_size}KB → ${new_size}KB (recompressed)"
  fi
done

echo ""
echo "--- Extracting video poster frame ---"

if command -v ffmpeg &>/dev/null; then
  # Extract poster frame from catedral parallax video
  if [ -f "$ASSETS/catedral-parallax-web.mp4" ]; then
    ffmpeg -y -i "$ASSETS/catedral-parallax-web.mp4" -vframes 1 -q:v 2 "$ASSETS/catedral-parallax-poster.jpg" 2>/dev/null
    echo "  Created: $ASSETS/catedral-parallax-poster.jpg"
  fi

  # Extract poster frame from festival-2025 video
  if [ -f "$ASSETS/festival-2025.mp4" ]; then
    ffmpeg -y -i "$ASSETS/festival-2025.mp4" -vframes 1 -q:v 2 "$ASSETS/festival-2025-poster.jpg" 2>/dev/null
    echo "  Created: $ASSETS/festival-2025-poster.jpg"
  fi
else
  echo "  SKIP: ffmpeg not found"
fi

echo ""
echo "--- Summary ---"
du -sh "$ASSETS/carrossel/"
du -sh "$ASSETS/"
echo ""
echo "Done! Remember to update .png references to .jpg in code."
