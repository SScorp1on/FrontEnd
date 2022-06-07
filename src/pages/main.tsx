import * as React from 'react';
import logo from '../logo.svg';
import TableFooter from '@mui/material/TableFooter';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	IconButton,
	Typography,
} from '@mui/material';

const ym = function() {
	return (
		`<!-- Yandex.Metrika counter -->
		<script type="text/javascript" >
		   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
		   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
		   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
		
		   ym(89128172, "init", {
				clickmap:true,
				trackLinks:true,
				accurateTrackBounce:true,
				webvisor:true
		   });
		</script>
		<noscript><div><img src="https://mc.yandex.ru/watch/89128172" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
		<!-- /Yandex.Metrika counter -->`
	  );
}

export default function Main() {
	return (
		<>
			<div className='App'>
				<div className='name'>
					<div className='name-one'>J</div>
					<div className='name-two'>O</div>
					<div className='name-three'>U</div>
					<div className='name-four'>R</div>
					<div className='name-five'>L</div>
					<div className='name-six'>0</div>
					<div className='name-seven'>Y</div>
				</div>
			</div>
			<div className='grid'>
				<Grid container spacing={8} justifyContent='center' direction='row'>
					<Grid item xs='auto'>
						<Card sx={{ width: '300px', height: '230px' }}>
							<CardContent>
								<Typography variant='h4' component='div'>
									Reverse Shell
								</Typography>
								<br />
								<Divider />
								<br />
								<Typography variant='body2'>
									Generate common listeners and reverse shells.
								</Typography>
							</CardContent>
							<CardActions>
								<Button sx={{ mt: '10px', width: '280px' }} variant='outlined'>
									Open
								</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs='auto'>
						<Card sx={{ width: '300px', height: '230px' }}>
							<CardContent>
								<Typography variant='h4' component='div'>
									Hide files
								</Typography>
								<br />
								<Divider />
								<br />
								<Typography variant='body2'>
									You can hide any files in other.
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									disabled
									sx={{ mt: '30px', width: '280px' }}
									variant='outlined'
								>
									Locked
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</div>
			<footer className='bottom'>
				<Typography variant='overline' className='nastya'>
					Спасибо большое Насте за ее любовь
				</Typography>
			</footer>
			<div dangerouslySetInnerHTML={{__html: ym()}}/>
		</>
	);
}
