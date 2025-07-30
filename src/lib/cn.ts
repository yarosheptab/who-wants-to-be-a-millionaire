import classNames from 'classnames';

export default function cn(...inputs: Parameters<typeof classNames>): string {
  return classNames(inputs);
}
