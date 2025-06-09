import { UserController } from '../controllers/UserController';
import { container } from '../core/container';

export default defineEventHandler(async event => {
	const userController = container.get(UserController);

	return await userController.createUser(event);
});
