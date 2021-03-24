import React from 'react';
import AppBar from '../../components/appBar/appBar.component';
import { useStyles } from './project.style';
import axios from 'axios';
import { apiUrl } from '../../utils/render.utils';
import ErrorCard from '../../components/errorCard/errorCard.component';
import BackDrop from '../../components/backdrop/backdrop.component';
import useGlobalStyles from '../../common.style';
import './project.style.css';
import DetailsTab from './detailsTab.component';
import { Grid, Box } from '@material-ui/core';
import clsx from 'clsx';
import ViewImage from './viewImage.component';

const ProjectPage = ({
	match: {
		params: { projectId },
	},
}) => {
	const classes = useStyles();
	const globalClasses = useGlobalStyles();
	let cancelToken;

	// States
	const [asyncState, setAsyncState] = React.useState({
		error: null,
		loading: false,
	});
	const [data, setData] = React.useState({
		project: null,
		properties: [],
	});
	const [open, setOpen] = React.useState(false);
	const [src, setSrc] = React.useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onView = (src) => () => {
		setSrc(src);
		handleClickOpen();
	};

	React.useEffect(() => {
		(async () => {
			try {
				setAsyncState({
					error: null,
					loading: true,
				});
				cancelToken = axios.CancelToken.source();
				const res = await axios.get(
					apiUrl(`/projects/get-details-by-slug/${projectId}`),
					{
						cancelToken: cancelToken.token,
					}
				);
				setData(res.data.data);
				setAsyncState({
					error: null,
					loading: false,
				});
			} catch (error) {
				if (error.response) {
					setAsyncState({
						error: error.response.data.message,
						loading: false,
					});
				} else {
					setAsyncState({
						error:
							'We are having some issues, please try again later',
						loading: false,
					});
				}
			}
		})();

		return () => {
			if (typeof cancelToken != typeof undefined) {
				cancelToken.cancel('Operation canceled due to new request');
			}
		};
	}, [projectId]);
	return (
		<div>
			<AppBar />
			<BackDrop open={asyncState.loading} />
			<ViewImage src={src} open={open} handleClose={handleClose} />
			{/* Page Wrapper  */}
			<div className={classes.wrapper}>
				{!!asyncState.error && <ErrorCard message={asyncState.error} />}
				{!!data.project && (
					<div>
						<Box mb="1rem">
							<div className="detailsContainer">
								<div>
									<h1 className="noSpace">BK Projects</h1>
									<span className="grayColor">
										Jaydev Bihar Bhubaneswar
									</span>
								</div>

								<div>
									<h2 className="noSpace">Price 50L - 70L</h2>
									<span className="grayColor">
										By <b>BK Builders</b>{' '}
									</span>
								</div>
							</div>
						</Box>
						<div className="container">
							<div
								data-lightbox="homePortfolio"
								className="horizontal"
							>
								<div className="absolute">
									<button
										className="viewButton"
										onClick={onView(
											'https://source.unsplash.com/600x600/?sig=1'
										)}
									>
										View Image
									</button>
								</div>
								<img src="https://source.unsplash.com/600x600/?sig=1" />
							</div>

							<div data-lightbox="homePortfolio">
								<div className="absolute">
									<button
										className="viewButton"
										onClick={onView(
											'https://source.unsplash.com/600x800/?sig=12'
										)}
									>
										View Image
									</button>
								</div>
								<img src="https://source.unsplash.com/600x800/?sig=12" />
							</div>

							<div
								data-lightbox="homePortfolio"
								className="horizontal"
							>
								<div className="absolute">
									<button
										className="viewButton"
										onClick={onView(
											'https://source.unsplash.com/800x600/?sig=71'
										)}
									>
										View Image
									</button>
								</div>
								<img src="https://source.unsplash.com/800x600/?sig=71" />
							</div>

							<div data-lightbox="homePortfolio">
								<div className="absolute">
									<button
										className="viewButton"
										onClick={onView(
											'https://source.unsplash.com/600x600/?sig=40'
										)}
									>
										View Image
									</button>
								</div>
								<img src="https://source.unsplash.com/600x600/?sig=40" />
							</div>
						</div>
						{/* <DetailsTab /> */}
						<Box mt="2rem">
							<h2 className={globalClasses.flexCenter}>
								About BK Projects
							</h2>
							<span className={clsx(globalClasses.flexCenter)}>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Sequi, maiores temporibus nisi
								cum corporis, laudantium consequatur quas
								nostrum reiciendis aspernatur enim! Placeat
								pariatur ab eos iste animi quod rerum. Nobis
								libero architecto laudantium numquam explicabo
								ipsa saepe nesciunt maxime accusantium ratione,
								voluptatem molestiae autem esse nostrum enim
								maiores accusamus inventore quod consequuntur
								aperiam animi, vero voluptates aut laboriosam!
								Expedita pariatur repudiandae voluptatem laborum
								dolore, quod at ratione dolorum quae provident
								fuga? Itaque excepturi nihil ducimus earum,
								nobis maxime! Maiores est itaque nemo. Maxime
								sequi iure fugiat cumque quos aut est, amet
								facilis odit optio ea perspiciatis nesciunt,
								similique, a neque?
							</span>
						</Box>
						<Box mt="2rem">
							<h2 className={globalClasses.flexCenter}>
								We Provides
							</h2>
							<span className={clsx(globalClasses.flexCenter)}>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Sequi, maiores temporibus nisi
								cum corporis, laudantium consequatur quas
								nostrum reiciendis aspernatur enim! Placeat
								pariatur ab eos iste animi quod rerum. Nobis
								libero architecto laudantium numquam explicabo
								ipsa saepe nesciunt maxime accusantium ratione,
								voluptatem molestiae autem esse nostrum enim
								maiores accusamus inventore quod consequuntur
								aperiam animi, vero voluptates aut laboriosam!
								Expedita pariatur repudiandae voluptatem laborum
								dolore, quod at ratione dolorum quae provident
								fuga? Itaque excepturi nihil ducimus earum,
								nobis maxime! Maiores est itaque nemo. Maxime
								sequi iure fugiat cumque quos aut est, amet
								facilis odit optio ea perspiciatis nesciunt,
								similique, a neque?
							</span>
						</Box>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectPage;
