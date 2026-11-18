// texterkennung.swift — Textzeilen eines Bilds mit Lage (Anteile 0..1, y von oben), macOS Vision, für die Markierung im Quiz
// des Klassenbereichs (tools/kurse/klassenbereich.py, stelle_finden). Aufruf: swift texterkennung.swift <bild>

import Foundation
import Vision
import AppKit
let pfad = CommandLine.arguments[1]
guard let bild = NSImage(contentsOfFile: pfad), let cg = bild.cgImage(forProposedRect: nil, context: nil, hints: nil) else { exit(1) }
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.recognitionLanguages = ["de-DE"]
req.usesLanguageCorrection = false
let h = VNImageRequestHandler(cgImage: cg, options: [:])
try h.perform([req])
var aus: [[String: Any]] = []
for o in req.results ?? [] {
  guard let t = o.topCandidates(1).first else { continue }
  let b = o.boundingBox
  aus.append(["t": t.string, "x": b.minX, "y": 1 - b.maxY, "w": b.width, "h": b.height])
}
let d = try JSONSerialization.data(withJSONObject: aus)
print(String(data: d, encoding: .utf8)!)
