# Assets Folder

Place your assets here for use in Remotion videos.

## Folder Structure

```
assets/
├── images/    # PNG, JPG, WebP images
├── icons/     # SVG icons
├── videos/    # MP4, WebM video clips
└── fonts/     # Custom fonts (TTF, OTF, WOFF2)
```

## How to Use in Components

### Images
```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("assets/images/my-image.png")} />
```

### Icons (SVG)
```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("assets/icons/my-icon.svg")} />
```

### Videos
```tsx
import { Video, staticFile } from "remotion";

<Video src={staticFile("assets/videos/my-clip.mp4")} />
```

### Fonts
```tsx
// In your component or global CSS
import { staticFile } from "remotion";

const fontUrl = staticFile("assets/fonts/MyFont.woff2");

// Load with @font-face in a style tag or CSS file
```

## Tips

- Use `staticFile()` for all assets in the `public/` folder
- Supported image formats: PNG, JPG, WebP, GIF
- Supported video formats: MP4, WebM
- Keep file names lowercase with hyphens (e.g., `hero-image.png`)
