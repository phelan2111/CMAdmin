/** @format */

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Suspense } from 'react';
import LoaderScreen from './components/ui/loader/screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
	const queryClient = new QueryClient();
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<LoaderScreen />}>
					<RouterProvider router={router} fallbackElement={<>Not Founds 404</>} />
				</Suspense>
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
