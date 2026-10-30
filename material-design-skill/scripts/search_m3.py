#!/usr/bin/env python3
"""
search_m3.py — Fast CLI search across the Material Design 3 skill corpus.

Usage:
  python3 scripts/search_m3.py "shape morph"
  python3 scripts/search_m3.py "md.comp.button.large" --scope tokens
  python3 scripts/search_m3.py "bottom sheet" --scope references
"""

import argparse
import os
import re
import sys
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parent.parent

SCOPES = {
    "all": ["references", "tokens", "docs/pages", "docs/blog"],
    "references": ["references"],
    "tokens": ["tokens"],
    "pages": ["docs/pages"],
    "blog": ["docs/blog"],
}


def search_corpus(query: str, scope: str = "all", max_hits: int = 40, context: int = 2):
    pat = re.compile(query, re.IGNORECASE)
    dirs = SCOPES.get(scope, SCOPES["all"])
    hits = 0
    for d in dirs:
        base = SKILL_ROOT / d
        if not base.exists():
            continue
        for root, _, files in os.walk(base):
            for fname in sorted(files):
                if not fname.endswith(".md"):
                    continue
                fpath = Path(root) / fname
                rel = fpath.relative_to(SKILL_ROOT)
                lines = fpath.read_text(encoding="utf-8", errors="ignore").splitlines()
                for idx, line in enumerate(lines):
                    if pat.search(line):
                        hits += 1
                        start = max(0, idx - context)
                        end = min(len(lines), idx + context + 1)
                        print(f"\n--- {rel}:{idx + 1} ---")
                        for i in range(start, end):
                            prefix = ">> " if i == idx else "   "
                            print(f"{prefix}{i + 1:4d}: {lines[i]}")
                        if hits >= max_hits:
                            print(f"\n[Reached max_hits={max_hits}. Refine query or pass --max-hits N]")
                            return


def main():
    parser = argparse.ArgumentParser(description="Search Material Design 3 skill corpus")
    parser.add_argument("query", help="Regex or substring to search for")
    parser.add_argument("--scope", choices=list(SCOPES.keys()), default="all")
    parser.add_argument("--max-hits", type=int, default=40)
    parser.add_argument("--context", type=int, default=2)
    args = parser.parse_args()
    search_corpus(args.query, args.scope, args.max_hits, args.context)


if __name__ == "__main__":
    main()
