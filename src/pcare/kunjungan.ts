import { PCareBaseApi } from './base.js';

export class Kunjungan extends PCareBaseApi {
	/**
	 * Get Data Rujukan
	 * GET /kunjungan/rujukan/{nomorKunjungan}
	 * Parameter 1: Nomor Kunjungan
	 */
	async rujukan(params: {
		/** Nomor Kunjungan */
		nomorKunjungan: string;
	}) {
		return this.send<{
			noRujukan: string;
			ppk: {
				kdPPK: string;
				nmPPK: string;
				alamat: string | null;
				kc: {
					kdKC: string;
					nmKC: string;
					alamat: string | null;
					telp: string | null;
					fax: string | null;
					dati: { kdProp: string | null; kdDati: string; nmDati: string };
					kdKR: {
						kdKR: string;
						nmKR: string;
						alamat: string | null;
						telp: string | null;
						fax: string | null;
					};
				};
			};
			tglKunjungan: string;
			poli: { kdPoli: string; nmPoli: string };
			nokaPst: string;
			nmPst: string;
			tglLahir: string;
			pisa: string;
			ketPisa: string;
			sex: string;
			diag1: { kdDiag: string; nmDiag: string };
			diag2: { kdDiag: string; nmDiag: string } | null;
			diag3: { kdDiag: string; nmDiag: string } | null;
			catatan: string;
			dokter: { kdDokter: string; nmDokter: string };
			tacc: { nmTacc: string | null; alasanTacc: string | null };
			infoDenda: string;
		}>({
			name: this.name + 'Rujukan',
			path: ['/kunjungan/rujukan/:nomorKunjungan', params],
			method: 'GET'
		});
	}

	/**
	 * Get Data Riwayat Kunjungan
	 * GET /kunjungan/peserta/{nomorKartu}
	 * Parameter 1: Nomor kartu peserta
	 */
	async peserta(params: {
		/** Nomor kartu peserta */
		nomorKartu: string;
	}) {
		return this.send<{
			count: number;
			list: {
				noKunjungan: string;
				tglKunjungan: string;
				providerPelayanan: { kdProvider: string; nmProvider: string };
				peserta: {
					noKartu: string;
					nama: string | null;
					hubunganKeluarga: string;
					sex: string | null;
					tglLahir: string | null;
					tglMulaiAktif: string | null;
					tglAkhirBerlaku: string | null;
					kdPpkPst: string | null;
					kdPpkGigi: string | null;
					jnsKelas: unknown;
					jnsPeserta: unknown;
					golDarah: string | null;
					noHP: string | null;
					noKTP: string | null;
					asuransi: unknown;
				};
				poli: { kdPoli: string; nmPoli: string; poliSakit: boolean };
				progProlanis: { kdProgram: string; nmProgram: string };
				keluhan: string;
				diagnosa1: { kdDiag: string; nmDiag: string; nonSpesialis: boolean };
				diagnosa2: { kdDiag: string | null; nmDiag: string | null; nonSpesialis: boolean };
				diagnosa3: { kdDiag: string | null; nmDiag: string | null; nonSpesialis: boolean };
				kesadaran: { kdSadar: string; nmSadar: string };
				sistole: number;
				diastole: number;
				beratBadan: number;
				tinggiBadan: number;
				respRate: number;
				heartRate: number;
				catatan: string;
				rujukBalik: number;
				providerAsalRujuk: { kdProvider: string; nmProvider: string | null };
				providerRujukLanjut: { kdProvider: string; nmProvider: string };
				pemFisikLain: string;
				dokter: { kdDokter: string; nmDokter: string };
				statusPulang: { kdStatusPulang: string; nmStatusPulang: string };
				tkp: { kdTkp: string; nmTkp: string };
				poliRujukInternal: { kdPoli: string | null; nmPoli: string | null; poliSakit: boolean };
				poliRujukLanjut: { kdPoli: string; nmPoli: string; poliSakit: boolean };
				tglPulang: string;
			}[];
		}>({
			name: this.name + 'Peserta',
			path: ['/kunjungan/peserta/:nomorKartu', params],
			method: 'GET'
		});
	}

	/**
	 * Add Data Kunjungan
	 * POST /kunjungan
	 * Content-Type: text/plain
	 * Body: JSON object (noKunjungan, noKartu, tglDaftar, kdPoli, keluhan, ... rujukLanjut, etc.)
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
			path: '/kunjungan',
			method: 'POST',
			data
		});
	}

	/**
	 * Edit Data Kunjungan
	 * PUT /kunjungan
	 * Content-Type: text/plain
	 * Body: JSON object (noKunjungan, noKartu, keluhan, ... rujukLanjut, etc.)
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
			path: '/kunjungan',
			method: 'PUT',
			data
		});
	}

	/**
	 * Delete Data Kunjungan
	 * DELETE /kunjungan/{nomorKunjungan}
	 * Parameter 1: Nomor Kunjungan
	 */
	async delete(params: {
		/** Nomor Kunjungan */
		nomorKunjungan: string;
	}) {
		return this.send<null>({
			name: this.name + 'Delete',
			path: ['/kunjungan/:nomorKunjungan', params],
			method: 'DELETE'
		});
	}
}
