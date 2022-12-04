import * as React from 'react';
import iconPaths from './icon-paths';

function Icon({ size = 16, name, type = 'line', className }) {
	return (
		<svg
			style={{ transitionDuration: '0.2s' }}
			className={`${className}`}
			width={size}
			height={size}
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d={iconPaths[type][name]}
				fill="#22272F"
				strokeWidth={2}
			/>
		</svg>
	);
}

export default React.memo(Icon);
