# Makefile fuer weitergehts-online — Lernraum-Build-Targets
#
# Aufruf:
#   make glossare    # nur die 3 Glossar-JSONs
#   make lernraum    # alle Lernraum-Build-Steps
#   make help

.PHONY: help glossare themen-mp ke-stats lernraum clean-data \
        check smoke smoke-setup bump install-hooks site clean-site

help:
	@echo "Website-Pflege-Targets (siehe docs/website/RUNBUCH.md):"
	@echo "  make check         BLOCKING+ADVISORY-Validierung (DER Gate-Einstiegspunkt)"
	@echo "  make smoke         Headless-Render-Smoke aller Live-Seiten (Playwright)"
	@echo "  make smoke-setup   Einmalig: .venv/ mit Playwright+Chromium anlegen (PEP-668-sicher)"
	@echo "  make bump A=engine Cache-Bust: Asset bumpen + alle HTML angleichen (A=engine|core|base|theme|all)"
	@echo "  make install-hooks Pre-commit-Hook nach .git/hooks/ verlinken"
	@echo "  make site          Baut _site/ (genau das, was deployt wird)"
	@echo ""
	@echo "Lernraum-Build-Targets:"
	@echo "  make glossare    Erzeugt assets/data/glossar-{norm,lp,prinzip}.json"
	@echo "  make themen-mp   Erzeugt assets/data/themen-mp.json"
	@echo "  make ke-stats    Erzeugt assets/data/ke-stats-{sk,mathe}.json"
	@echo "  make lernraum    Alle drei Build-Steps"
	@echo "  make clean-data  Loescht alle generierten JSONs"

# ── Website-Pflege-Schicht (separat vom Generator/PM-Apparat) ──

check:
	./tools/website/check.sh

smoke:
	./tools/smoke/run.sh

# Einmalige lokale Smoke-Umgebung: Homebrew-Python ist PEP-668-managed (kein
# `pip install` ins System); run.sh bevorzugt .venv/bin/python3, wenn vorhanden.
smoke-setup:
	python3 -m venv .venv
	.venv/bin/pip install --quiet playwright
	.venv/bin/python3 -m playwright install chromium

# Cache-Bust: `make bump A=engine` (Default: nur synchronisieren)
bump:
	@if [ -n "$(A)" ]; then python3 tools/website/bump-assets.py --bump $(A); \
	else python3 tools/website/bump-assets.py --sync; fi

install-hooks:
	ln -sf ../../tools/hooks/pre-commit .git/hooks/pre-commit
	@echo "pre-commit-Hook installiert (.git/hooks/pre-commit -> tools/hooks/pre-commit)"

# Baut den Publish-Baum _site/ als ALLOWLIST (default-deny): nur oeffentliche Inhalte,
# nie docs/, tools/, bridge/, _archiv*, .claude/, README, *.skill etc.
site: clean-site
	mkdir -p _site
	cp index.html _site/
	cp CNAME _site/ 2>/dev/null || true
	[ -f favicon.ico ] && cp favicon.ico _site/ || true
	rsync -a --exclude='_*/' --exclude='.DS_Store' escape-games _site/
	rsync -a --exclude='_*/' --exclude='.DS_Store' assets _site/
	[ -d sections ] && rsync -a --exclude='_*/' --exclude='.DS_Store' sections _site/ || true
	touch _site/.nojekyll
	@echo "_site/ gebaut (Allowlist: index.html, CNAME, escape-games/, assets/, sections/)."

clean-site:
	rm -rf _site

glossare:
	python3 tools/lernraum/build_glossare.py

themen-mp:
	python3 tools/lernraum/build_themen_mp.py

ke-stats:
	python3 tools/lernraum/build_ke_stats.py

lernraum: glossare themen-mp ke-stats
	@echo "Lernraum-Build OK"

clean-data:
	rm -f assets/data/glossar-*.json
	rm -f assets/data/themen-mp.json
	rm -f assets/data/ke-stats-*.json
