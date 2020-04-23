import React, { useRef, useMemo, useState, useEffect } from 'react';
import { WebView, WebViewProps } from 'react-native-webview';
import { getHtml } from './template';

type Chart = {};

type Props = {
  script: string;
  width?: number | string;
  height?: number | string;
  style?: WebViewProps;
  autoSize?: boolean;
  data: Array<any>;
  onLoad?: (
    canvas: HTMLCanvasElement,
    window: Window,
    data: Array<any>
  ) => Chart;
  onChange?: (chart: Chart, window: Window, data: Array<any>) => void;
};

export default function ChartView({
  script,
  width = '100%',
  height = 150,
  style,
  autoSize = true,
  data,
  onLoad,
  onChange,
  ...props
}: Props) {
  const [isReady, setIsReady] = useState(false);
  const instance = useRef<WebView>(null);

  const html = useMemo(
    () =>
      getHtml({
        script,
        width,
        height,
        autoSize,
      }),
    []
  );

  const handleLoad = () => {
    if (onLoad) {
      const fn = onLoad.toString();
      instance.current?.injectJavaScript(`
      ;data = ${JSON.stringify(data)};
      chart = invoke(${fn}, [canvas, window, data]);
      true;
      `);

      setIsReady(true);
    }
  };

  useEffect(() => {
    if (isReady && onChange) {
      const fn = onChange.toString();
      instance.current?.injectJavaScript(`
      ;data = ${JSON.stringify(data)};
      invoke(${fn}, [chart, window, data]);
      true;
      `);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <WebView
      style={{ width, height, ...style }}
      ref={instance}
      originWhitelist={['*']}
      source={{ html }}
      onLoad={handleLoad}
      {...props}
    />
  );
}

export function createChartView(script: string) {
  return (props: Props) => <ChartView script={script} {...props} />;
}
