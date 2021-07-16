import React from 'react';
import { render } from 'react-dom';
import './assets/index.scss';
import Circle from './assets/images/circle';
import Diamond from './assets/images/diamond';
import Triangle from './assets/images/triangle';
import Square from './assets/images/square';

const Application = () => {
	window.addEventListener('DOMContentLoaded', (e) => {
		var presentation = document.querySelector('hp-presentation');

		presentation.onclick = handlePresentationClick;
		presentation.addEventListener('animationend', handleAnimationEnd, false);
	})

	function handlePresentationClick(e) {
		var current = document.querySelector('hp-slide.active');
		var next = current?.nextElementSibling;

		// while(next && next.tagName != 'HP-SLIDE') {
		// 	next = next.nextElementSibling;
		// }

		if(next) {
			current?.classList.remove('active');
			next.classList.add('active');

			var aa = parseInt(next.getAttribute('data-autoadvance'));

			if(!isNaN(aa)) {
				setTimeout((e) => {
					handlePresentationClick(e);
				}, aa);
			}
		}
	}

	function handleAnimationEnd(e) {
		var slide = e.target.closest('hp-slide');
		var aa = slide.getAttribute('data-autoadvance');

		if(aa == 'animationend' && slide.classList.contains('active')) {
			handlePresentationClick(e);
		}
	}
	return(
		<hp-content>
			<hp-presentation>
				<hp-slide class="active">
					<hp-title>Which shape</hp-title>
					<hp-chooser>
						<Triangle className=""/>
						<Circle className=""/>
						<Diamond className=""/>
						<Square className=""/>
					</hp-chooser>
					<hp-title>doesn't belong?</hp-title>
				</hp-slide>
				<hp-slide data-autoadvance="3500">
					<hp-title>Which shape</hp-title>
					<hp-chooser class="chosen animate">
						<Triangle className=""/>
						<Circle className="chosen"/>
						<Diamond className=""/>
						<Square className=""/>
					</hp-chooser>
					<hp-title>doesn't belong?</hp-title>
				</hp-slide>
				<hp-slide data-autoadvance="animationend">
					<hp-title>How did</hp-title>
					<hp-chooser class="fixed">
						<Triangle className=""/>
						<Circle className="chosen"/>
						<Diamond className=""/>
						<Square className=""/>
					</hp-chooser>
					<hp-title>you know?</hp-title>
				</hp-slide>
				<hp-slide data-autoadvance="3500">
					<hp-title>How did</hp-title>
					<hp-learn class="match">
						<hp-learn-no>no</hp-learn-no>
							<Circle className=""/>
						<hp-learn-yes>yes</hp-learn-yes>
					</hp-learn>
					<hp-title>you know?</hp-title>
				</hp-slide>
			</hp-presentation>
		</hp-content>
	)
};

render(<Application />, document.getElementById('root'));