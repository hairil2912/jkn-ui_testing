import { PCareBaseApi } from './base.js';

export class Provider extends PCareBaseApi {
	/**
	 * Get Provider Rayonisasi
	 * GET /provider/{start}/{limit}
	 * Parameter 1: Row data awal yang akan ditampilkan
	 * Parameter 2: Limit jumlah data yang akan ditampilkan
	 */
	async index(params: {
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				kdProvider: string;
				nmProvider: string;
			}[];
		}>({
			name: this.name + 'Index',
			path: ['/provider/:start/:limit', params],
			method: 'GET'
		});
	}
}
