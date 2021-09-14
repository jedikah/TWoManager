// const printCss = require('./print.css');
function addStyles(win: any, styles: any) {
  styles.forEach((style: any) => {
    const link = win.document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', style);
    win.document.getElementsByTagName('head')[0].appendChild(link);
  });
}
console.log(window.location.href);

interface Options {
  name?: string;
  specs?: Array<string>;
  replace?: boolean;
  styles?: Array<string>;
}

const VueHtmlToPaper = {
  install(app: any, options: Options = {}) {
    app.config.globalProperties.$htmlToPaper = (
      el: any,
      localOptions: Options,
      cb = () => true
    ) => {
      const defaultName = '_blank',
        defaultSpecs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
        defaultReplace = true,
        defaultStyles = [
          'https://cdn.jsdelivr.net/npm/quasar@1.15.4/dist/quasar.min.css',
        ];
      let {
        name = defaultName,
        specs = defaultSpecs,
        replace = defaultReplace,
        styles = defaultStyles,
      } = options;

      // If has localOptions
      // TODO: improve logic
      if (!!localOptions) {
        if (localOptions.name) name = localOptions.name;
        if (localOptions.specs) specs = localOptions.specs;
        if (localOptions.replace) replace = localOptions.replace;
        if (localOptions.styles) styles = localOptions.styles;
      }

      specs = !!specs.length ? specs.join(',') : ('' as any);

      const element = window.document.getElementById(el);

      if (!element) {
        alert(`Element to print #${el} not found!`);
        return;
      }

      const url = '';
      const win = window.open(url, name, specs as any, replace);
      // const styles = () => import('./')

      let styleHtml = '';
      for (const node of [
        ...(document.querySelectorAll('link[rel="stylesheet"], style') as any),
      ]) {
        styleHtml += node.outerHTML;
      }

      win.document.write(`
      <html>
        <head>
        ${styleHtml}
        </head>
        <body>
          ${element.innerHTML}
        </body>
        <style>
        </style>
      </html>
    `);

      addStyles(win, styles);

      setTimeout(() => {
        win.document.close();
        win.focus();
        win.print();
        win.close();
        cb();
      }, 1000);

      return true;
    };
  },
};

export default VueHtmlToPaper;
