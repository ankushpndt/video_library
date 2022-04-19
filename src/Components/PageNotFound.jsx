import "./PageNotFound.css";
import ghost from "../assets/ghost.png";
export const PageNotFound = () => {
	return (
		<div className="page__not__found">
			<h1 className="page__not__found__heading">
				4
				<span>
					<img src={ghost} alt="ghost.png" className="ghost__img" />
				</span>
				4
			</h1>
			<h2 className="page__not__found__heading__two">
				Error: 404 page not found
			</h2>
			<p className="page__not__found__content">
				Sorry, the page you're looking for cannot be accessed
			</p>
		</div>
	);
};
