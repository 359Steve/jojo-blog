interface FindPictureRequest {
	pageNumber: number;
	pageSize: number;
	random?: boolean;
}

type HomePicResponse<T> = T & {
	group_id: number;
};

interface WeatherRequest {
	key: string;
	city: string;
	extensions?: 'base' | 'all';
	output?: 'JSON' | 'XML';
}

interface WeatherResponse {
	status: '0' | '1';
	count: string;
	info: string;
	infocode: string;
	forecasts: Forecast[];
}

interface Forecast {
	city: string;
	adcode: string;
	province: string;
	reporttime: string;
	casts: Cast[];
}

interface Cast {
	date: string;
	week: string;
	dayweather: string;
	nightweather: string;
	daytemp: string;
	nighttemp: string;
	daywind: string;
	nightwind: string;
	daypower: string;
	nightpower: string;
}

interface AMapRegeoRequest {
	key: string;
	location: string;
	radius?: number;
	extensions?: 'base' | 'all';
	batch?: boolean | 'true' | 'false';
	roadlevel?: number;
	poitype?: string;
	output?: 'XML' | 'JSON';
}

interface AMapRegeoResponse {
	status: '0' | '1';
	info: string;
	infocode: string;

	regeocode?: {
		formatted_address: string;

		addressComponent: {
			country: string;
			province: string;
			city: string | [] | null;
			district: string;
			township: string;
			towncode: string;
			citycode: string;
			adcode: string;
			streetNumber?: {
				street: string;
				number: string;
				location: string;
				direction: string;
				distance: string;
			};
			neighborhood?: {
				name: string;
				type: string;
			};
			building?: {
				name: string;
				type: string;
			};
			businessAreas?: Array<{
				location: string;
				name: string;
				id: string;
			}>;
		};

		roads?: Array<{
			id: string;
			name: string;
			direction: string;
			distance: string;
			location: string;
		}>;

		pois?: Array<{
			id: string;
			name: string;
			type: string;
			tel: string;
			distance: string;
			postcode: string;
			direction: string;
			address: string;
			location: string;
			businessarea: string;
		}>;
	};
}
