import { PCareBaseApi } from './base.js';

export class Spesialis extends PCareBaseApi {
	/**
	 * Get Referensi Spesialis
	 * GET /spesialis
	 */
	async index() {
		return this.send<{
			count: number;
			list: {
				kdSpesialis: string;
				nmSpesialis: string;
			}[];
		}>({
			name: this.name + 'Index',
			path: '/spesialis',
			method: 'GET'
		});
	}

	/**
	 * Get Referensi Sub Spesialis
	 * GET /spesialis/{kdSpesialis}/subspesialis
	 * Parameter 1: Kode Spesialis
	 */
	async subSpesialis(params: {
		/** Kode Spesialis */
		kdSpesialis: string;
	}) {
		return this.send<{
			count: number;
			list: {
				kdSubSpesialis: string;
				nmSubSpesialis: string;
				kdPoliRujuk: string;
			}[];
		}>({
			name: this.name + 'SubSpesialis',
			path: ['/spesialis/:kdSpesialis/subspesialis', params],
			method: 'GET'
		});
	}

	/**
	 * Get Referensi Sarana
	 * GET /spesialis/sarana
	 */
	async sarana() {
		return this.send<{
			count: number;
			list: {
				kdSarana: string;
				nmSarana: string;
			}[];
		}>({
			name: this.name + 'Sarana',
			path: '/spesialis/sarana',
			method: 'GET'
		});
	}

	/**
	 * Get Referensi Khusus
	 * GET /spesialis/khusus
	 */
	async khusus() {
		return this.send<{
			count: number;
			list: {
				kdKhusus: string;
				nmKhusus: string;
			}[];
		}>({
			name: this.name + 'Khusus',
			path: '/spesialis/khusus',
			method: 'GET'
		});
	}

	/**
	 * Get Faskes Rujukan Sub Spesialis
	 * GET /spesialis/rujuk/subspesialis/{kdSubSpesialis}/sarana/{kdSarana}/tglEstRujuk/{tglEstRujuk}
	 * Parameter 1: Kode Sub Spesialis
	 * Parameter 2: Kode Sarana
	 * Parameter 3: Tanggal Estimasi Rujuk, format: dd-mm-yyyy
	 */
	async rujukSubSpesialis(params: {
		/** Kode Sub Spesialis */
		kdSubSpesialis: string;
		/** Kode Sarana */
		kdSarana: string;
		/** Tanggal Estimasi Rujuk, format: dd-mm-yyyy */
		tglEstRujuk: string;
	}) {
		return this.send<{
			count: number;
			list: {
				kdppk: string;
				nmppk: string;
				alamatPpk: string;
				telpPpk: string;
				kelas: string;
				nmkc: string;
				distance: number;
				jadwal: string;
				jmlRujuk: number;
				kapasitas: number;
				persentase: number;
			}[];
		}>({
			name: this.name + 'RujukSubSpesialis',
			path: ['/spesialis/rujuk/subspesialis/:kdSubSpesialis/sarana/:kdSarana/tglEstRujuk/:tglEstRujuk', params],
			method: 'GET'
		});
	}

	/**
	 * Get Faskes Rujukan Khusus ALIH RAWAT, HEMODIALISA, JIWA, KUSTA, TB-MDR, SARANA KEMOTERAPI, SARANA RADIOTERAPI, HIV-ODHA
	 * GET /spesialis/rujuk/khusus/{kdKhusus}/noKartu/{noKartu}/tglEstRujuk/{tglEstRujuk}
	 * Parameter 1: Kode Khusus (IGD, HDL, JIW, KLT, PAR, KEM, RAT, HIV)
	 * Parameter 2: Nomor Kartu Peserta
	 * Parameter 3: Tanggal Estimasi Rujuk, format: dd-mm-yyyy
	 */
	async rujukKhusus(params: {
		/** Kode Khusus (IGD, HDL, JIW, KLT, PAR, KEM, RAT, HIV) */
		kdKhusus: string;
		/** Nomor Kartu Peserta */
		noKartu: string;
		/** Tanggal Estimasi Rujuk, format: dd-mm-yyyy */
		tglEstRujuk: string;
	}) {
		return this.send<{
			count: number;
			list: {
				kdppk: string;
				nmppk: string;
				alamatPpk: string;
				telpPpk: string;
				kelas: string;
				nmkc: string;
				distance: number;
				jadwal: string;
				jmlRujuk: number;
				kapasitas: number;
				persentase: number;
			}[];
		}>({
			name: this.name + 'RujukKhusus',
			path: ['/spesialis/rujuk/khusus/:kdKhusus/noKartu/:noKartu/tglEstRujuk/:tglEstRujuk', params],
			method: 'GET'
		});
	}

	/**
	 * Get Faskes Rujukan Khusus THALASEMIA dan HEMOFILI
	 * GET /spesialis/rujuk/khusus/{kdKhusus}/subspesialis/{kdSubSpesialis}/noKartu/{noKartu}/tglEstRujuk/{tglEstRujuk}
	 * Parameter 1: Kode Khusus (THA, HEM)
	 * Parameter 2: Kode Sub Spesialis
	 * Parameter 3: Nomor Kartu Peserta
	 * Parameter 4: Tanggal Estimasi Rujuk, format: dd-mm-yyyy
	 */
	async rujukKhususThaHem(params: {
		/** Kode Khusus (THA, HEM) */
		kdKhusus: string;
		/** Kode Sub Spesialis */
		kdSubSpesialis: string;
		/** Nomor Kartu Peserta */
		noKartu: string;
		/** Tanggal Estimasi Rujuk, format: dd-mm-yyyy */
		tglEstRujuk: string;
	}) {
		return this.send<{
			count: number;
			list: {
				kdppk: string;
				nmppk: string;
				alamatPpk: string;
				telpPpk: string;
				kelas: string;
				nmkc: string;
				distance: number;
				jadwal: string;
				jmlRujuk: number;
				kapasitas: number;
				persentase: number;
			}[];
		}>({
			name: this.name + 'RujukKhususThaHem',
			path: ['/spesialis/rujuk/khusus/:kdKhusus/subspesialis/:kdSubSpesialis/noKartu/:noKartu/tglEstRujuk/:tglEstRujuk', params],
			method: 'GET'
		});
	}
}
