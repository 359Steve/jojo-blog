// core/decorators.ts
import { container } from './container';

export function controller<T extends { new(...args: any[]): object }>(target: T) {
	if (!container.isBound(target)) {
		container.bind(target).toSelf();
	}
}
