import { Chart, ChartItem, registerables } from 'chart.js';
import { useEffect } from 'react';
Chart.register(...registerables);
function PodcastChart() {
	useEffect(() => {
		const ctx = document.getElementById('visitPodcast') as ChartItem;
		if (ctx) {
			if (!Chart.getChart('visitPodcast')) {
				new Chart(ctx, {
					type: 'doughnut',
					data: {
						datasets: [
							{
								label: '# of Votes',
								data: [20, 32, 12],
								borderWidth: 1,
								borderColor: 'white',
								backgroundColor: ['#D14D72', '#1F4172', '#D95F59'],
							},
						],
					},
					options: {
						color: 'white',
						borderColor: 'white',
						responsive: true,
						plugins: {
							legend: {
								display: true,
								labels: {
									color: 'white',
								},
							},
						},
					},
				});
			}
		}

		return () => {};
	}, []);

	return (
		<div className='bg-white/10 rounded-xl p-6 w-1/3 animate-translateRight'>
			<h3>Visits Of Podcasts</h3>
			<div className='p-8 h-full flex items-center justify-center'>
				<canvas id='visitPodcast' />
			</div>
		</div>
	);
}

export default PodcastChart;
