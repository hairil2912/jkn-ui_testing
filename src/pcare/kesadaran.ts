import { PCareBaseApi } from './base.js';

export class Kesadaran extends PCareBaseApi {
	/**
	 * Get Data Kesadaran
	 * GET /kesadaran
	 * Content-Type: application/json; charset=utf-8
	 */
	async index() {
		return this.send<{
			count: number;
			list: {
				kdSadar: string;
				nmSadar: string;
			}[];
		}>({
			name: this.name + 'Index',
			path: '/kesadaran',
			method: 'GET'
		});
	}
}
