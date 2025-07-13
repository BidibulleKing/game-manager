import { formatMinutes } from '../../services/timeFormatter';
import Clock from '../icons/Clock';
import Star from '../icons/Star';
import type { TagType } from './TagType';
import styles from './tag.module.css';

export default function Tag({ tag }: { tag: TagType }) {
	return (
		<div className={styles.tag}>
			<span>
				{formatMinutes(tag.minutesSpent)}
				<Clock />
			</span>
			{tag.rating && (
				<span>
					{tag.rating}/5
					<Star />
				</span>
			)}
		</div>
	);
}

