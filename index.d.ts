import { WebViewProps } from 'react-native-webview';

export type Chart = {};

export type ChartProps = {
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
  width,
  height,
  style,
  autoSize,
  data,
  onLoad,
  onChange,
  ...props
}: ChartProps): JSX.Element;

declare function createChartView(
  script: string
): (props: ChartProps) => JSX.Element;

export { ChartView, createChartView };
