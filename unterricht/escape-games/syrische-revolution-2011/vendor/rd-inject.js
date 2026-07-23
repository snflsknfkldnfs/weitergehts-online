// rd-inject.js — legt die additiven Redesign-Wrapper nach dem Engine-Render an.
(function(){
  var TYP_LABEL = {'multiple-choice':'Multiple-Choice','zuordnung':'Zuordnung',
    'lueckentext':'Lückentext','reihenfolge':'Reihenfolge','freitext-code':'Freitext','freitext':'Freitext'};
  function aufgabeTyp(a){
    var cls = a.className.split(/\s+/);
    for (var i=0;i<cls.length;i++){ var m = cls[i].match(/^aufgabe--(.+)$/);
      if (m && m[1] !== 'solved') return m[1]; }
    return null;
  }
  function injectMappe(root){
    // Leitfrage-Strip + Stempelfeld (Zelle je Aufgabe)
    var lf = root.querySelector('.einstieg__problemstellung');
    var aufg = root.querySelectorAll('.aufgabe');
    if (lf && !root.querySelector('.rd-leitfrage-strip')){
      var strip = document.createElement('div'); strip.className='rd-leitfrage-strip';
      strip.innerHTML = '<span class="rd-leitfrage-strip__label">Leitfrage</span>'
        + '<span class="rd-leitfrage-strip__text">'+lf.textContent+'</span>';
      var stf = document.createElement('div'); stf.className='rd-stempelfeld';
      stf.setAttribute('aria-label','Fortschritt');
      for (var i=0;i<aufg.length;i++){ var c=document.createElement('span');
        c.className='rd-stempelfeld__cell'; c.textContent=String(i+1); stf.appendChild(c); }
      strip.appendChild(stf);
      var main = root.querySelector('.mappe') || root; main.parentNode.insertBefore(strip, main);
    }
    // Stempelfeld live an den solved-State koppeln (füllt sich beim Lösen; gelöst = Stempel statt Nummer)
    var cells = root.querySelectorAll('.rd-stempelfeld__cell');
    for (var j=0;j<cells.length && j<aufg.length;j++){
      var solved = aufg[j].classList.contains('aufgabe--solved');
      cells[j].classList.toggle('rd-stempelfeld__cell--solved', solved);
      var want = solved ? '' : String(j+1);
      if (cells[j].textContent !== want) cells[j].textContent = want;
    }
    // Typ-Badge je Aufgabe (die Engine erzeugt es nicht; redesign.css styled .aufgabe__typ-badge)
    for (var k=0;k<aufg.length;k++){ var a=aufg[k];
      if (!a.querySelector('.aufgabe__typ-badge')){
        var hdr = a.querySelector('.aufgabe__header'), typ = aufgabeTyp(a);
        if (hdr && typ){ var badge=document.createElement('span'); badge.className='aufgabe__typ-badge';
          badge.textContent = TYP_LABEL[typ] || typ; hdr.appendChild(badge); }
      }
    }
    root.querySelectorAll('.material--karte img').forEach(function(img){
      if(!img.closest('.rd-karte-frame')){ var f=document.createElement('span'); f.className='rd-karte-frame';
        img.parentNode.insertBefore(f, img); f.appendChild(img); }});
    root.querySelectorAll('.material--bild img').forEach(function(img){
      if(!img.closest('.rd-foto-mount')){ var m=document.createElement('span'); m.className='rd-foto-mount';
        var s=document.createElement('span'); s.className='rd-foto-stage';
        img.parentNode.insertBefore(m, img); s.appendChild(img); m.appendChild(s); }});
  }
  var mo = new MutationObserver(function(){ injectMappe(document); });
  mo.observe(document.body, {childList:true, subtree:true});
  document.addEventListener('DOMContentLoaded', function(){ injectMappe(document); });
})();
