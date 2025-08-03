import type { ShallowRef } from 'vue';
import type { StackColor } from '~/types/com-types';

declare global {
	declare interface Timeline {
		id: string;
		timestamp: string;
		title: string;
		description: string;
		url: string;
	}

	declare interface StaticImage {
		default: string;
		[key: string]: any;
	}

	declare interface RecordList {
		id: number;
		title: string;
	}

	declare interface RecordButtonList {
		id: number;
		icon: string;
		title: string;
		href: string;
	}

	declare interface Summary {
		id: string;
		icon: string;
		title: string;
		summary: string;
		timeRange: string;
	}

	declare interface RecordSummary {
		id: string;
		timeRange: string;
		title: string;
		role: string;
		summary: string;
		data: Summary[];
	}

	declare interface Error {
		url: string;
		statusCode: number;
		statusMessage: string;
		message: string;
		description: string;
		data: any;
	}

	declare interface Tags {
		name: keyof typeof StackColor;
		icon: string;
	}

	declare interface BlogList {
		id: number;
		title: string;
		tags: Tags[];
		description: string;
		url: string;
	}

	declare interface UseBoundingClientRect {
		top: ShallowRef<number, number>;
		right: ShallowRef<number, number>;
		bottom: ShallowRef<number, number>;
		left: ShallowRef<number, number>;
		width: ShallowRef<number, number>;
		height: ShallowRef<number, number>;
		x: ShallowRef<number, number>;
		y: ShallowRef<number, number>;
		update: () => void;
	}
}

export { };
