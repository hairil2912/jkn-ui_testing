import { PCareBaseApi } from './base.js';

export class Diagnosa extends PCareBaseApi {
	/**
	 * Get Data Diagnosa
	 * GET /diagnosa/{keyword}/{start}/{limit}
	 */
	async index(params: {
		/** kode atau nama diagnosa */
		keyword: string;
		/** row data awal yang akan ditampilkan (start/pagination) */
		start: number;
		/** limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				kdDiag: string;
				nmDiag: string;
				nonSpesialis: boolean;
			}[];
		}>({
			name: this.name + 'Diagnosa',
			path: ['/diagnosa/:keyword/:start/:limit', params],
			method: 'GET'
		});
	}
}
