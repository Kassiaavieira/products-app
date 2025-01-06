import { PrimeReactProvider } from 'primereact/api';
import './globals.css';
import QueryClientProviderWrapper from '../components/QueryClientProviderWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PrimeReactProvider>
          <QueryClientProviderWrapper>
            {children}
          </QueryClientProviderWrapper>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
