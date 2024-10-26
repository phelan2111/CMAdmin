/** @format */

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Suspense } from 'react';
import LoaderScreen from './components/ui/loader/screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastProvider from './contexts/toast';
import ModalProvider from './contexts/modal';

function App() {
	const queryClient = new QueryClient();
	return (
		<Provider store={store}>
			<ModalProvider>
				<ToastProvider>
					<QueryClientProvider client={queryClient}>
						<Suspense fallback={<LoaderScreen />}>
							<RouterProvider router={router} fallbackElement={<>Not Founds 404</>} />
						</Suspense>
					</QueryClientProvider>
				</ToastProvider>
			</ModalProvider>
		</Provider>
	);
}

export default App;
