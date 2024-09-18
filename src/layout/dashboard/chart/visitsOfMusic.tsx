import { Chart, ChartItem, registerables } from 'chart.js';
import { useEffect } from 'react';
Chart.register(...registerables);
function VisitsChart() {
	useEffect(() => {
		const ctx = document.getElementById('visitsOfMusic') as ChartItem;
		if (ctx) {
			if (!Chart.getChart('visitsOfMusic')) {
				new Chart(ctx, {
					type: 'line',
					data: {
						labels: ['Album', 'Playlist', 'Collection'],
						datasets: [
							{
								label: '# of Votes',
								data: [12, 19, 3, 5, 2, 3],
								borderWidth: 1,
								fill: false,
								borderColor: 'white',
								tension: 0.5,
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
						scales: {
							y: {
								min: 0,
								max: 50,
								border: {
									color: 'white',
								},
								ticks: {
									color: 'white',
								},
							},
							x: {
								border: {
									color: 'white',
								},
								ticks: {
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
		<div className='bg-white/10 rounded-xl p-6 w-2/3 animate-translateRight'>
			<h3>Visits Of Music</h3>
			<div>
				<canvas id='visitsOfMusic' />
			</div>
		</div>
	);
}

export default VisitsChart;
