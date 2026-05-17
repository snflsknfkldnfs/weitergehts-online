# Makefile fuer weitergehts-online — Lernraum-Build-Targets
#
# Aufruf:
#   make glossare    # nur die 3 Glossar-JSONs
#   make lernraum    # alle Lernraum-Build-Steps
#   make help

.PHONY: help glossare themen-mp ke-stats lernraum clean-data

help:
	@echo "Lernraum-Build-Targets:"
	@echo "  make glossare    Erzeugt assets/data/glossar-{norm,lp,prinzip}.json"
	@echo "  make themen-mp   Erzeugt assets/data/themen-mp.json"
	@echo "  make ke-stats    Erzeugt assets/data/ke-stats-{sk,mathe}.json"
	@echo "  make lernraum    Alle drei Build-Steps"
	@echo "  make clean-data  Loescht alle generierten JSONs"

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
