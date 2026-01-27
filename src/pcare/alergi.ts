import { PCareBaseApi } from './base.js';

export class Alergi extends PCareBaseApi {
	/**
	 * Get Data Alergi
	 * GET /alergi/jenis/{jenis}
	 * Parameter 1: 01:Makanan, 02:Udara, 03:Obat
	 */
	async jenis(params: {
		/** 01:Makanan, 02:Udara, 03:Obat */
		jenis: string;
	}) {
		return this.send<{
			list: {
				kdAlergi: string;
				nmAlergi: string;
			}[];
		}>({
			name: this.name + 'Jenis',
			path: ['/alergi/jenis/:jenis', params],
			method: 'GET'
		});
	}
}
