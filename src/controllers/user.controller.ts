import * as express from 'express';
import { User } from '../models';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
    constructor() {
        super("/user");
    }

	initializeRoutes(): void {
	}

}