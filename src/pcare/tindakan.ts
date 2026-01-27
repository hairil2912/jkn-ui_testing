import { PCareBaseApi } from './base.js';

export class Tindakan extends PCareBaseApi {
	/**
	 * Get Tindakan by Kunjungan
	 * GET /tindakan/kunjungan/{nomorKunjungan}
	 * Parameter 1: Nomor Kunjungan
	 */
	async kunjungan(params: {
		/** Nomor Kunjungan */
		nomorKunjungan: string;
	}) {
		return this.send<{
			count: number;
			list: {
				kdTindakanSK: number;
				noKunjungan: string;
				kdTindakan: string;
				nmTindakan: string;
				biaya: number;
				keterangan: string | null;
				hasil: number;
			}[];
		}>({
			name: this.name + 'Kunjungan',
			path: ['/tindakan/kunjungan/:nomorKunjungan', params],
			method: 'GET'
		});
	}

	/**
	 * Get Referensi Tindakan
	 * GET /tindakan/kdTkp/{kdTkp}/{start}/{limit}
	 * Parameter 1: kdTkp => 10 : RJTP, 20 : RITP, 50 : Promotif
	 * Parameter 2: Row data awal yang akan ditampilkan
	 * Parameter 3: Limit jumlah data yang akan ditampilkan
	 */
	async kdTkp(params: {
		/** kdTkp => 10 : RJTP, 20 : RITP, 50 : Promotif */
		kdTkp: string;
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				kdTindakan: string;
				nmTindakan: string;
				maxTarif: number;
				withValue: boolean;
			}[];
		}>({
			name: this.name + 'KdTkp',
			path: ['/tindakan/kdTkp/:kdTkp/:start/:limit', params],
			method: 'GET'
		});
	}

	/**
	 * Add Data Tindakan
	 * POST /tindakan
	 * Content-Type: text/plain
	 */
	async add(params: { request?: string } | Record<string, unknown>) {
		let data: Record<string, unknown>;
		if (typeof (params as { request?: string }).request === 'string') {
			try {
				data = JSON.parse((params as { request: string }).request) as Record<string, unknown>;
			} catch {
				throw new Error('Request Body (JSON) harus berupa JSON valid');
			}
		} else {
			data = params as Record<string, unknown>;
		}
		return this.send<unknown>({
			name: this.name + 'Add',
			path: '/tindakan',
			method: 'POST',
			data
		});
	}

	/**
	 * Edit Data Tindakan
	 * PUT /tindakan
	 * Content-Type: text/plain
	 */
	async edit(params: { request?: string } | Record<string, unknown>) {
		let data: Record<string, unknown>;
		if (typeof (params as { request?: string }).request === 'string') {
			try {
				data = JSON.parse((params as { request: string }).request) as Record<string, unknown>;
			} catch {
				throw new Error('Request Body (JSON) harus berupa JSON valid');
			}
		} else {
			data = params as Record<string, unknown>;
		}
		return this.send<unknown>({
			name: this.name + 'Edit',
			path: '/tindakan',
			method: 'PUT',
			data
		});
	}

	/**
	 * Delete Data Tindakan
	 * DELETE /tindakan/{kdTindakanSK}/kunjungan/{nomorKunjungan}
	 * Parameter 1: kdTindakanSK
	 * Parameter 2: Nomor Kunjungan
	 */
	async delete(params: {
		/** kdTindakanSK */
		kdTindakanSK: number | string;
		/** Nomor Kunjungan */
		nomorKunjungan: string;
	}) {
		return this.send<null>({
			name: this.name + 'Delete',
			path: ['/tindakan/:kdTindakanSK/kunjungan/:nomorKunjungan', { kdTindakanSK: Number(params.kdTindakanSK), nomorKunjungan: params.nomorKunjungan }],
			method: 'DELETE'
		});
	}
}
