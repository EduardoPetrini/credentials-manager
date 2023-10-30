import { IconSpinner } from './icons';

export default function Loading() {
  return (
    <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 m-0 m-auto bg-gray-700 bg-opacity-50" style={{ padding: '50%' }}>
     <IconSpinner />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
