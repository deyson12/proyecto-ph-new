import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  cargarScript(url: string, async: boolean, defer: boolean) {
    const existingScript = document.querySelector(`script[src="${url}"]`);

    if (existingScript) {
      this.renderer.removeChild(document.body, existingScript);
      //console.log(`El script con URL ${url} ha sido eliminado.`);
    }

    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = async;
    script.defer = defer;
    this.renderer.appendChild(document.body, script);

    //console.log(`El script con URL ${url} ha sido agregado nuevamente.`);
  }
}
