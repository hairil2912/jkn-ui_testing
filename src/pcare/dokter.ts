import { PCareBaseApi } from './base.js';

export class Dokter extends PCareBaseApi {
	/**
	 * Get Data Dokter
	 * GET /dokter/{start}/{limit}
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
				kdDokter: string;
				nmDokter: string;
			}[];
		}>({
			name: this.name + 'Index',
			path: ['/dokter/:start/:limit', { start: params.start, limit: params.limit }],
			method: 'GET'
		});
	}
}
