import { PCareBaseApi } from './base.js';

export class Prognosa extends PCareBaseApi {
	/**
	 * Get Prognosa New
	 * GET /prognosa
	 */
	async index() {
		return this.send<{
			list: {
				kdPrognosa: string;
				nmPrognosa: string;
			}[];
		}>({
			name: this.name + 'Index',
			path: '/prognosa',
			method: 'GET'
		});
	}
}
