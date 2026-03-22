# Agent guidance – wp-module-patterns

This file gives AI agents a quick orientation to the repo. For full detail, see the **docs/** directory.

## What this project is

- **wp-module-patterns** – WordPress Cloud Patterns. Registers with the Newfold Module Loader; depends on wp-module-data, wp-module-features, wp-module-installer. Maintained by Newfold Labs.

- **Stack:** PHP 7.3+. See docs/dependencies.md.

- **Architecture:** Registers with the loader; provides pattern content and installer integration. See docs/integration.md.

## Key paths

| Purpose | Location |
|---------|----------|
| Bootstrap | `bootstrap.php` |
| Includes | `includes/` |
| Tests | `tests/` |

## Essential commands

```bash
composer install
composer run lint
composer run clean
composer run test
```

## Documentation

- **Full documentation** is in **docs/**. Start with **docs/index.md**.
- **CLAUDE.md** is a symlink to this file (AGENTS.md).

---

## Keeping documentation current

When you change code, features, or workflows, update the docs. Keep **docs/index.md** current: when you add, remove, or rename doc files, update the table of contents (and quick links if present). When adding or changing dependencies, update **docs/dependencies.md**. When cutting a release, update **docs/changelog.md**.
