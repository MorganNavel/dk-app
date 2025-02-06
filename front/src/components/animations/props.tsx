export default interface Animation {
  children: React.ReactNode;
  duration?: number;
  once?: boolean;
  props?: any;
  className?: string;
}
