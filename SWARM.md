### Swarm Strategy

- **Communication:** All agents commit changes to the main `portal-imobiliario` repository.
- **Coordination:** Use `tasks/` subdirectory for task tracking. Agents will check for new tasks and update their status.
- **Rules:**
  - One task per agent specialization.
  - Pull latest changes before working.
  - Document all design decisions in `docs/architecture.md`.
