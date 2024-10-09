/** @format */

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Suspense } from 'react';
import LoaderScreen from './components/ui/loader/screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Suspense fallback={<LoaderScreen />}>
					<RouterProvider router={router} fallbackElement={<>Not Founds 404</>} />
				</Suspense>
			</Provider>
		</QueryClientProvider>
	);
}

export default App;
