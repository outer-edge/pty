# PTY.AI

AI consultancy site for Ben Carter's PTY.AI practice based in Auckland.

## Design System

### Visual Grammar

- **Canvas**: Warm paper `#FAFAF8`
- **Signal color**: Vermilion `#D81C0E` (used sparingly - contact tick only)
- **Hairlines**: `#C8C8C2`
- **Typography**: 
  - Grotesk: **Space Grotesk** (Google Fonts) for headlines and body. Fragment was preferred but is a commercial font from Pangram Pangram. Space Grotesk is a quality proportional grotesk with character, better than generic options like Work Sans or Inter.
  - Monospace: **IBM Plex Mono** for labels and metadata
- **Principles**: Lots of air, no shadows, no gradients, no CRT aesthetics

### What NOT to do

- ❌ No Kolega lime
- ❌ No CRT/scanline effects
- ❌ No Matrix or phosphor aesthetics
- ❌ No fake terminal or CLI-as-portfolio
- ❌ No green accents
- ❌ No Berkeley Mono (not licensed)

### Design References

- [Present Studio](https://present.studio/) — primary visual cousin
- [Aino Agency](https://aino.agency/) — paper aesthetic reference
- Berkeley Mono specimen — datasheet voice (look, don't use font)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contact Form

The contact page uses a simple mailto link to `hello@pty.ai`. This is honest and functional without requiring API keys or form services.

## Stack

- Astro 5 (static site generation)
- TypeScript
- No framework dependencies
- Fonts: Google Fonts (Work Sans, IBM Plex Mono)

## Pages

- `/` — Homepage with hero headline
- `/method` — Approach and methodology
- `/work` — Selected projects (ghosted placeholders)
- `/contact` — Brief submission form or mailto
- `/404` — Branded error page

## License

Proprietary. All rights reserved.