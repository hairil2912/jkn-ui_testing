import { PCareBaseApi } from './base.js';

export class Poli extends PCareBaseApi {
	/**
	 * Get Data Poli FKTP
	 * GET /poli/fktp/{start}/{limit}
	 * Parameter 1: Row data awal yang akan ditampilkan
	 * Parameter 2: Limit jumlah data yang akan ditampilkan
	 */
	async fktp(params: {
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				kdPoli: string;
				nmPoli: string;
				poliSakit: boolean;
			}[];
		}>({
			name: this.name + 'FKTP',
			path: ['/poli/fktp/:start/:limit', params],
			method: 'GET'
		});
	}
}
