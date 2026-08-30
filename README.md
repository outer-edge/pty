# PTY.AI

AI consultancy site for Ben Carter's PTY.AI practice based in Auckland.

## Design System

### Visual Grammar

- **Canvas**: Warm paper `#FAFAF8`
- **Signal color**: Vermilion `#D81C0E` (use sparingly)
- **Hairlines**: `#C8C8C2`
- **Typography**: 
  - Grotesk (Work Sans) for headlines and body
  - Monospace (IBM Plex Mono) for labels and metadata
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

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PUBLIC_WEB3FORMS_KEY` — Optional Web3Forms key for contact form. Without it, contact page shows mailto link.

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