# PRISM Production site versions

This project uses Git tags as return points for visual directions.

## Versions

- `v01-before-motion-prism` - clean prism landing before applying the scroll-motion direction.
- `v02-motion-prism` - big prism direction, animated compact header, scroll progress line, title and block reveals.
- `v03-prism-accent-flow` - Prism Accent color direction, higher hero prism, subtle ray glints, montage frame section, interactive work flow list.
- `v04-prism-intro` - entrance intro with prism mark, animated rays, PRISM PRODUCTION wordmark, then transition into the landing page.
- `v05-logo-lockup-intro` - corrected intro lockup using the real logo PNG composition, scaled down by roughly 30%.

## How to return

Use GitHub tags/releases or run:

```bash
git checkout v01-before-motion-prism
```

To continue editing from an older version, create a branch from that tag:

```bash
git checkout -b codex/version-from-v01 v01-before-motion-prism
```
