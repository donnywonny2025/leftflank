# Execution Scripts

Deterministic Python scripts that do the actual work.

**Rules:**
- Each script handles one specific task (API calls, data processing, file I/O, etc.)
- Scripts read configuration from `.env` via `python-dotenv` or `os.environ`
- Well-commented and testable
- No probabilistic behavior — these must be reliable and repeatable

**Before creating a new script**, check if one already exists that handles your use case.
