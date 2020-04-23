function isNumber(n: any) {
  return typeof n === 'number';
}

function isURL(str: any) {
  return String(str).startsWith('http');
}

export const template: string = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no"
    />
    <title>React Native Charts</title>
  </head>
  <body>
    <div id="container" style="width: {{width}}; height: {{height}};">
      <canvas id="canvas" width="0" height="0"></canvas>
    </div>
    {{script}}
    <script>
      var container = document.getElementById('container');
      var canvas = document.getElementById('canvas');
      var autoSize = {{autoSize}};
      var chart = null;
      var data = null;

      function invoke(fn, args) {
        return fn.apply(null, args);
      }

      if (autoSize) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    </script>
  </body>
</html>
`;

type Params = {
  script: string;
  width: number | string;
  height: number | string;
  autoSize: boolean;
};

export function getHtml({
  script = '',
  width = 'auto',
  height = 'auto',
  autoSize = false,
}: Params) {
  return template
    .replace(
      '{{script}}',
      isURL(script)
        ? `<script src="${script}"></script>`
        : `<script>${script}</script>`
    )
    .replace('{{width}}', isNumber(width) ? `${width}px` : String(width))
    .replace('{{height}}', isNumber(height) ? `${height}px` : String(height))
    .replace('{{autoSize}}', String(autoSize));
}
