---
name: wp-module-patterns
title: Integration
description: How the module registers and integrates.
updated: 2025-03-18
---

# Integration

The module registers with the Newfold Module Loader via bootstrap.php. Other modules (e.g. onboarding, onboarding-data) depend on it for pattern content. The host plugin may use it via the installer. See [dependencies.md](dependencies.md).
